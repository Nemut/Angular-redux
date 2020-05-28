import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario/usuario.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  totalRegistros: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    private store: Store<AppState>,
  ) { }

  cargarIngresosEgresos() {

    let url = URL_SERVICIOS + '/ingreso-egreso';

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };

    return this.http.get( url, httpOptions ).pipe(
      map( (resp: any) => {        
        this.totalRegistros = resp.ingresoEgreso[1];        
        return resp.ingresoEgreso[0];
      })
    );

  }

  obtenerIngresoEgreso(id: string) {

    let url = URL_SERVICIOS + '/ingreso-egreso/' +  id;

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        console.log(resp);
        return resp.ingresoEgreso;
      })
    );

  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    
    const url = URL_SERVICIOS + '/ingreso-egreso';

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };

    // Retorna un observable    
    return this.http.post(url, ingresoEgreso, httpOptions)
      .pipe(
        map((resp: any) => {

          Swal.fire(
            'Ingreso Egreso creado',
            ingresoEgreso.tipo,
            'success'
          );

          let ingresoEgresoApi = IngresoEgreso.fromApi(resp.ingresoEgreso);
          this.store.dispatch( ingresoEgresoActions.addOneItem({ item: ingresoEgresoApi }) );

          return resp.ingresoEgreso;
        })
      );
  }

  actualizarIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const url = URL_SERVICIOS + '/ingreso-egreso/' + ingresoEgreso.id;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };
    
    return this.http.patch(url, ingresoEgreso, httpOptions)
      .pipe(
        map(
          (resp: any) => {            

            Swal.fire(
              'Usuario actualizado',
              ingresoEgreso.tipo,
              'success'
            );

            return true;

          }
        )
      );

  }

  borrarIngresoEgreso(id: string) {

    const url = URL_SERVICIOS + '/ingreso-egreso/' + id;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };
    
    return this.http.delete(url, httpOptions)
                .pipe(
                  map(resp => {
                    
                    Swal.fire('Borrado!', `El registro fue borrado`, 'success');
                    this.store.dispatch( ingresoEgresoActions.removeOneItem({id}) );

                    return true;
                  })
                );

  }

}
