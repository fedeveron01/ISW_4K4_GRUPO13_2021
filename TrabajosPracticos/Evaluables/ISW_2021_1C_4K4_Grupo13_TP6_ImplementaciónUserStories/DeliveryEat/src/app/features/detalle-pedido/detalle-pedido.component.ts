import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {
  @Input() detalle
  @Input() urls=[]

  @Output() nuevaPagina = new EventEmitter<number>()
  @Output() nuevoDetalle = new EventEmitter<string>()
  @Output() nuevaImagen = new EventEmitter<string[]>()
  boton = true

  constructor (public alertController: AlertController) {
  }

  async ngOnInit () {
    await window.scrollTo(0,0)

  }

   ngAfterViewInit  () {
    this.validarPagina()
  }

  validarPagina () {
    let text = (<HTMLInputElement>document.getElementById('textArea')).value
    if (text.length > 0) {
      this.detalle = text
      this.nuevoDetalle.emit(text)
      this.boton = false
    } else {
      this.boton = true
    }
  }

  // Cargar Imagen
  async cargarImagen (event) {
    this.urls = []
    const file = event.target.files[0]
    // Validación Imagen -JPG
    if (file.type.split('/')[0] !== 'image' &&
      (file.type.split('/')[1] !== 'jpeg' || file.type.split('/')[1] !== 'jpg')) {
      console.log('Tipo de Imagen NO soportado.')
      const alerta = await this.alertController.create({
        cssClass: 'basic-alert',
        header: 'Alerta',
        message: 'Tipo de Imagen NO soportado',
        buttons: ['OK']
      })
      alerta.present()
      return
    }
    // Validación Imagen -Tamaño
    if (file.size > 5000000) {
      console.log('El tamaño de la imagen es superior a 5Mb.')
      const alerta = await this.alertController.create({
        cssClass: 'basic-alert',
        header: 'Alerta',
        message: 'El tamaño de la imagen es superior a 5Mb',
        buttons: ['OK']
      })
      alerta.present()
      return
    }

    if (event.target.files && event.target.files[0]) {
      const cantidadArchivos = event.target.files.length
      for (let i = 0; i < cantidadArchivos; i++) {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          this.urls.push(event.target.result)
        }
        reader.readAsDataURL(event.target.files[i])
      }
      this.nuevaImagen.emit(this.urls)

    }
  }

  cambiarPagina () {
    this.nuevaPagina.emit(2)
  }
}
