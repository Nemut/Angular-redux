import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  authSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit(): void {
    
    this.authSubs = this.store.select('auth')
        .pipe(
          filter( auth => auth.user != null)
        )
        .subscribe( (auth) => {
          console.log(auth);
          this.ingresoEgresoService.cargarIngresosEgresos()
              .subscribe( ingresosEgresos => {
                console.log(ingresosEgresos);
                this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresos }) )
              });

        });
    
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

}
