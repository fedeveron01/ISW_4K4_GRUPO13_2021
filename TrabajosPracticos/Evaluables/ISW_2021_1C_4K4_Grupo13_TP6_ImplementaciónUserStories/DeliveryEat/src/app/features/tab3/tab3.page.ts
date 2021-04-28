import { Component } from '@angular/core'
import { Address } from 'ngx-google-places-autocomplete/objects/address'
import { MedioPago } from 'src/app/core/models/medio-pago'
import { Ubicacion } from 'src/app/core/models/ubicacion'
import { GeoService } from 'src/app/core/services/geo.service'
import { HorarioEntrega } from 'src/app/core/models/horario-entrega'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor (private readonly geoService: GeoService) {
  }

  opcion: number

  pagina = 1
  porcentaje = (this.pagina - 1) / 6

  seleccionarHora = true

  creditCardNumber: string

  ubicacionComercio: Ubicacion
  ubicacionPedido: Ubicacion
  medioPago: MedioPago
  detalle = ''
  urls=[]
  horario: HorarioEntrega

  ngOnInit () {
  }

  cambiarPagina (pagina) {

    this.pagina = pagina
    this.porcentaje = (pagina - 1) / 5
  }

  salir(){
    window.location.href='#'
    

  }
}

