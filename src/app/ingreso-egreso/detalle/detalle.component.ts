import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {    
    this.ingresosSubs = this.store.select('ingresosEgresos')
        .subscribe( ({ items }) => {
          this.ingresosEgresos = items;
        });
  }

  borrar(id: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(id)
        .subscribe( resp => {
          console.log(resp);
        });
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();    
  }

}
