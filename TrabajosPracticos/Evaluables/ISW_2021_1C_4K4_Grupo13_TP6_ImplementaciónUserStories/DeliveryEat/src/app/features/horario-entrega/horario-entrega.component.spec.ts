import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { HorarioEntregaComponent } from './horario-entrega.component'

describe('HorarioEntregaComponent', () => {
  let component: HorarioEntregaComponent
  let fixture: ComponentFixture<HorarioEntregaComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioEntregaComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents()

    fixture = TestBed.createComponent(HorarioEntregaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
