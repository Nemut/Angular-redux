import { NgModule } from '@angular/core';

// Rutas
import { DashboardRoutingModule } from './dashboard-routing.module';

// Módulos
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Componentes
import { DashboardComponent } from './dashboard.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

// Custom Pipes
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from '../ingreso-egreso/ingreso-egreso.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresoPipe
  ],
  exports: [
      
  ],
  imports: [
      CommonModule,
      StoreModule.forFeature( 'ingresosEgresos', ingresoEgresoReducer ),
      SharedModule,
      DashboardRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      ChartsModule
  ]
})
export class DashboardModule { }