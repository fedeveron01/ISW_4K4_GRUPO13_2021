import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Ubicacion } from 'src/app/core/models/ubicacion'
import { GeoService } from 'src/app/core/services/geo.service'

@Component({
  selector: 'app-direccion-pedido',
  templateUrl: './direccion-pedido.component.html',
  styleUrls: ['./direccion-pedido.component.scss']
})
export class DireccionPedidoComponent implements OnInit {
  @Input() ubicacion

  @Output() nuevaPagina = new EventEmitter<number>()
  @Output() nuevaUbicacion = new EventEmitter<Ubicacion>()

  markerOptions: google.maps.MarkerOptions = { draggable: false }
  markerPositions={ lat: -31.417, lng: -64.183 }
  pinValidado=false
  posicion={ lat: -31.417, lng: -64.183 }
  boton=true

  constructor (private readonly geoService: GeoService) {

  }

  ngOnInit () {
    navigator.geolocation.getCurrentPosition(posicion => {
      let lat = posicion.coords.latitude
      let lng = posicion.coords.longitude
      let marcador = { lat: lat, lng: lng }
      this.posicion = marcador
    }, this.gestionarErrores, { enableHighAccuracy: true })
  }

  ngAfterViewInit(){
    window.scrollTo(0,0)

  }

  gestionarErrores () {

  }

  validarDireccion () {
    this.boton = true // desactilet boton antes de validar
    const ubicacion = new Ubicacion()
    const calle = (<HTMLInputElement>document.getElementById('calle')).value
    const nro = (<HTMLInputElement>document.getElementById('numero')).value
    const ciudad = (<HTMLSelectElement>document.getElementById('ciudad')).value
    const referencias = (<HTMLInputElement>document.getElementById('referencias')).value
    if ((calle.length > 0 && ciudad!= undefined)) {
      ubicacion.direccion = calle
      if (nro === '') {
        ubicacion.numero = 'S/N'
      } else {
        ubicacion.numero = nro
      }
      ubicacion.referencias=referencias;
      ubicacion.ciudad = ciudad
      console.log(ubicacion.direccion)
      console.log(ubicacion.ciudad)

      this.boton = false
      this.nuevaUbicacion.emit(ubicacion)
    }
    if (this.pinValidado) {
      ubicacion.latitudPin = this.markerPositions.lat
      ubicacion.longitudPin = this.markerPositions.lng

      this.boton = false
      this.nuevaUbicacion.emit(ubicacion)
    }
  }

  cambiarPagina () {
    this.nuevaPagina.emit(3)
    window.scroll(0,0)
  }

  cambiarMarcador (marcador) {
    this.markerPositions = marcador
  }

  agregarMarcador (event: google.maps.MapMouseEvent) {
    let marcador = this.markerPositions
    this.geoService.getUbicacion(marcador.lat, marcador.lng).subscribe(x => {
      this.markerPositions = (event.latLng.toJSON())
      this.validarPin()
    })
  }

  soloLetras (event: any) {
    const patronSoloTexto = /[A-z 0-9]/
    const entrada = String.fromCharCode(event.charCode)

    if (!patronSoloTexto.test(entrada)) {
    // invalid character, prevent input
      event.preventDefault()
    }
  }

  soloNumeros (event: any) {
    const patronSoloNumeros = /[0-9]/
    const entrada = String.fromCharCode(event.charCode)

    if (!patronSoloNumeros.test(entrada)) {
    // invalid character, prevent input
      event.preventDefault()
    }
  }

  validarPin () {
    this.geoService.getUbicacion(this.markerPositions.lat, this.markerPositions.lng).subscribe(x => {
      console.log(x.features[0].properties.city)
      if (x.features[0].properties.city == 'Cordoba' || x.features[0].properties.city == 'Río Ceballos' || x.features[0].properties.city == 'Unquillo') {
        this.pinValidado = true
      } else {
        this.pinValidado = false
      }
      this.validarDireccion()
    }
    )
  }
}
