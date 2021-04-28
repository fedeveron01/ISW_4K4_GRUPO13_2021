import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { DireccionPedidoComponent } from './direccion-pedido.component'

describe('DireccionPedidoComponent', () => {
  let component: DireccionPedidoComponent
  let fixture: ComponentFixture<DireccionPedidoComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DireccionPedidoComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents()

    fixture = TestBed.createComponent(DireccionPedidoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
