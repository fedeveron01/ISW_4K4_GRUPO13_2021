import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { HorarioEntrega } from 'src/app/core/models/horario-entrega'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-horario-entrega',
  templateUrl: './horario-entrega.component.html',
  styleUrls: ['./horario-entrega.component.scss']
})

export class HorarioEntregaComponent implements OnInit {
  @Output() nuevaPagina = new EventEmitter<number>();
  @Output() nuevoHorario = new EventEmitter<HorarioEntrega>();
  esEntregaProgramada = true;
  minDate:string;
  fechaHoraEntrega:string;

  constructor (public alertController: AlertController) { }

  ngOnInit () {
    this.actualizarHoraMinima()
  }

  actualizarHoraMinima () {
    const hora = new Date(Date.now())
    hora.setMinutes(hora.getMinutes()-150)
    this.minDate = hora.toISOString()
  }

  validarPagina () {
    this.esEntregaProgramada = (<HTMLIonCheckboxElement>document.getElementById('entregaRapida')).checked
  }

  async cambiarPagina () {
    const fechaEntregaEnMilisegundos = Date.parse(this.fechaHoraEntrega)
    if (this.esEntregaProgramada && (this.fechaHoraEntrega == null || fechaEntregaEnMilisegundos < Date.now())) {
      const alerta = await this.alertController.create({
        cssClass: 'basic-alert',
        header: 'Alerta',
        message: 'Seleccione Fecha y Hora de Entrega',
        buttons: ['OK']
      })
      alerta.present()
      return
    }
    if (this.esEntregaProgramada) {
      if (fechaEntregaEnMilisegundos >= Date.now()) {
        const horarioEntrega = new HorarioEntrega()
        horarioEntrega.tipo = 'Programada'
        const fecha = this.fechaHoraEntrega.substring(0, 10).split('-').reverse().join('/')
        const hora = this.fechaHoraEntrega.substring(11, 16)
        horarioEntrega.horario = fecha + ' ' + hora
        this.nuevoHorario.emit(horarioEntrega)
      }
    } else {
      const horarioEntrega = new HorarioEntrega()
      horarioEntrega.tipo = 'Ahora'
      horarioEntrega.horario = 'Lo antes posible'
      this.nuevoHorario.emit(horarioEntrega)
    }
    this.nuevaPagina.emit(6)
  }
}
