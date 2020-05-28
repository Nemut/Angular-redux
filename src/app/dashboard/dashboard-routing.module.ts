import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
// import { AdminGuard } from '../services/guards/admin.guard';
// import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

// Paginas
import { DashboardComponent } from './dashboard.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';


export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'estadisticas', component: EstadisticaComponent},
      {path: 'ingreso-egreso', component: IngresoEgresoComponent},
      {path: 'detalle', component: DetalleComponent},
      { path: '', redirectTo: '/estadisticas', pathMatch: 'full' },
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
