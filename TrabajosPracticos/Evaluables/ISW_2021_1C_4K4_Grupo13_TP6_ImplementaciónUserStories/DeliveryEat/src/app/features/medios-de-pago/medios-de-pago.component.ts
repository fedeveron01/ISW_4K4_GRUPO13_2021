import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { splitAtColon } from '@angular/compiler/src/util'
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MedioPago } from 'src/app/core/models/medio-pago'

@Component({
  selector: 'app-medios-de-pago',
  templateUrl: './medios-de-pago.component.html',
  styleUrls: ['./medios-de-pago.component.scss']
})
export class MediosDePagoComponent implements OnInit {
  @Output() nuevaPagina = new EventEmitter<number>()
  @Output() nuevoMedio = new EventEmitter<MedioPago>()

  boton:boolean = true
  boton2:boolean = true

  numeroTarjetaCredito:string;
  tarjetaValidada:boolean;
  cvc:string;

  constructor () {
  }

  ngOnInit () {
  }

  ngAfterViewInit () {
    this.validarPagina(1)
  }

  validarPagina (opcion) {
    if (opcion == 1) {
      const medioEfectivo = new MedioPago();
      let monto = (<HTMLInputElement>document.getElementById('monto')).value
      medioEfectivo.monto = monto
      medioEfectivo.tipo = 'Efectivo';
      
      const { 0: entero, 1: decimal } = monto.split('.')
      console.log(decimal)

      if (parseFloat(monto) >= 100 && parseFloat(monto) <= 999999.99 && monto.length <=9 && (parseInt(decimal, 10) <= 99 || decimal==undefined))  {
        this.boton = false
        this.nuevoMedio.emit(medioEfectivo)

      } else {
        this.boton = true

      }
    }
    if (opcion == 2) {
      this.validarMedioTarjeta()
    }

  }

  validarVencimiento () {
    const vencimiento = (<HTMLInputElement>document.getElementById('vencimiento')).value
    const alerta = (<HTMLElement>document.getElementById('alerta'))
    console.log(vencimiento)
    alerta.innerText = ''

    if (vencimiento.length === 2) {
      (<HTMLInputElement>document.getElementById('vencimiento')).value = vencimiento + '/'
      console.log(vencimiento)
    }
    if (vencimiento.length > 6) {
      const { 0: month, 1: year } = vencimiento.split('/')
      if (parseInt(month, 10) === 0 || parseInt(month, 10) > 12) {
        alerta.innerText = ('Fecha Inválida')
        this.tarjetaValidada = false
        return;
      }
      if (year.length === 4 && parseInt(year, 10) < 2021) {
        alerta.innerText = ('Tarjeta Vencida')
        this.tarjetaValidada = false
      } else {
        if (!this.validarFecha(vencimiento)) {
          alerta.innerText = ('Tarjeta Vencida')
          this.tarjetaValidada = false
        }
      }
    }
  }

  validarMedioTarjeta () {
    const medioTarjeta = new MedioPago();
    medioTarjeta.tipo = 'Tarjeta VISA';

    const cvc = (<HTMLInputElement>document.getElementById("cvc")).value;
    const titular = (<HTMLInputElement>document.getElementById("titular")).value;
    this.tarjetaValidada = true
    this.validarVencimiento()
    this.validarVISA()
    console.log(cvc)
    console.log(this.tarjetaValidada)
    if (cvc.length == 3 && titular.length > 0 && this.tarjetaValidada) {
      medioTarjeta.titular = titular
      this.nuevoMedio.emit(medioTarjeta)
      this.boton2 = false
    }
  }

  validarFecha (fecha) {
    // Validamos que cumpla el formato de fecha MM/YYYY
    if (fecha.match(/^(0\d|1[0-2])\/\d{4}$/)) {
      const { 0: mes, 1: anio } = fecha.split('/')
      const vencimiento = new Date(anio, mes)
      const hoy = new Date()
      return vencimiento.getTime() >= hoy.getTime()
    } else {
      return false
    }
  }

  validarVISA () {
    let tarjetaCredito = this.numeroTarjetaCredito
    tarjetaCredito = tarjetaCredito.replace(/[ -]/g, '')
    const expRegularVISA = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    let esVISA = false

    if (expRegularVISA.test(tarjetaCredito)) {
      esVISA = true
    }
    if (esVISA) {
      document.getElementById('alertaTarjetaCredito').innerHTML = ''
      this.algoritmoLuhn(tarjetaCredito)
    } else {
      document.getElementById('alertaTarjetaCredito').innerHTML = 'Sólo aceptamos VISA!'
      this.tarjetaValidada = false
    }
  }

  algoritmoLuhn (nroTarjetaCredito) {
    const digitos = nroTarjetaCredito.split('');
    for (let i = 0; i < digitos.length; i++) {
      digitos[i] = parseInt(digitos[i], 10)
    }
    let suma = 0
    let alt = false
    for (let i = digitos.length - 1; i >= 0; i--) {
      if (alt) {
        digitos[i] *= 2
        if (digitos[i] > 9) {
          digitos[i] -= 9
        }
      }
      suma += digitos[i]
      alt = !alt
    }

    if (suma % 10 === 0) {
      document.getElementById('alertaTarjetaCredito').innerHTML += ''
    } else {
      document.getElementById('alertaTarjetaCredito').innerHTML += 'Nro De Tarjeta No Válido'
    }
  }

  formatoTarjetaCredito (value: string) {
    const valor = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = valor.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length > 0) {
      this.numeroTarjetaCredito = parts.join(' ')
    } else {
      this.numeroTarjetaCredito = value
    }
  }

  soloNumeros (event: any) {
    const patronSoloNumeros = /[0-9]/
    let entrada = String.fromCharCode(event.charCode)

    if (!patronSoloNumeros.test(entrada)) {
      event.preventDefault()
    }
  }

  keyPressPermitirDecimal (event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 &&
      (charCode < 48 || charCode > 57)) {
      event.preventDefault()
      return false
    }
    return true
  }

  validarFechaExpiracion (input) {
    if (input.match(/^(0\d|1[0-2])\/\d{4}$/)) {
      const { 0: mes, 1: anio } = input.split('/');

      const vencimiento = new Date(anio, mes)
      const fechaActual = new Date()

      return vencimiento.getTime() > fechaActual.getTime()

    } else return false
  }

  cambiarPagina () {
    this.nuevaPagina.emit(5)
  }
}
