import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Tab3Page } from './tab3.page'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'
import { GoogleMapsModule } from '@angular/google-maps'
import { Tab3PageRoutingModule } from './tab3-routing.module'
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete'
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component'
import { DireccionPedidoComponent } from '../direccion-pedido/direccion-pedido.component'
import { MediosDePagoComponent } from '../medios-de-pago/medios-de-pago.component'
import { HorarioEntregaComponent } from '../horario-entrega/horario-entrega.component'
import { ResumenPedidoComponent } from '../resumen-pedido/resumen-pedido.component'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    GoogleMapsModule,
    GeoapifyGeocoderAutocompleteModule.withConfig('fde083915656465fa1d6b32396bf2abb')
  ],
  declarations: [Tab3Page, DetallePedidoComponent, DireccionPedidoComponent, MediosDePagoComponent, HorarioEntregaComponent, ResumenPedidoComponent]
})
export class Tab3PageModule {}
