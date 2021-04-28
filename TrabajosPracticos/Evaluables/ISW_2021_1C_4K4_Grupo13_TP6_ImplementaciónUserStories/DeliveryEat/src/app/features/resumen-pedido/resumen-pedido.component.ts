import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.scss']
})
export class ResumenPedidoComponent implements OnInit {
  @Input() detalle:string
  @Input() ubicacionComercio
  @Input() ubicacionPedido
  @Input() horario
  @Input() urls
  @Input() medioPago
  @Output() nuevaPagina= new EventEmitter()

  markerOptions: google.maps.MarkerOptions = { draggable: false }
  markerPositions = { lat: -31.417, lng: -64.183 }
  markerPositions2 = { lat: -31.417, lng: -64.183 }
  constructor (private readonly alertController: AlertController) { }

  ngOnInit () {}

  async cambiarPagina () {
    const alerta = await this.alertController.create({
      cssClass: 'basic-alert',
      header: 'Alerta',
      message: '¿Desea confirmar el pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah')
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.nuevaPagina.emit(7)
          }
        }
      ]
    })
    alerta.present()
  }
}
