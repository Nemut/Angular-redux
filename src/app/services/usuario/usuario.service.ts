import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo.service';
import { throwError } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as authActions from 'src/app/auth/auth.actions';
import * as ingresoEgresoActions from 'src/app/ingreso-egreso/ingreso-egreso.actions';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;


  constructor(
    private http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    private store: Store<AppState>
  ) {
    this.cargarStorage();
  }

  estaLogueado() {

    return (this.token.length > 5) ? true : false;

  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      const userApi = Usuario.fromApi(JSON.parse(localStorage.getItem('usuario')));
      this.store.dispatch( authActions.setUser({ user: userApi }) );

    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.store.dispatch( authActions.unSetUser() );
    this.store.dispatch( ingresoEgresoActions.unSetItems() );

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/auth/google';

    return this.http.post(url, { token })
      .pipe(
        map((resp: any) => {

          this.guardarStorage(resp.usuario.id, resp.token, resp.usuario);          

          return true;
        })
      );

  }

  login(usuario: Usuario, recuerdame: boolean = false) {

    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/auth/login';

    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          this.guardarStorage(resp.usuario.id, resp.token, resp.usuario);

          const userApi = Usuario.fromApi(resp.usuario);
          
          this.store.dispatch( authActions.setUser({ user: userApi }) );

          return true;
        }),
        catchError(err => {

          // console.log(err.status);
          // console.log(err.error);

          Swal.fire(
            'Error',
            err.error.message,
            'error'
          );
  
          return throwError(err.message);
  
        })
      );

  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/user';

    // Retorna un observable    
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {

          Swal.fire(
            'Usuario creado',
            usuario.email,
            'success'
          );

          return resp.usuario;
        }),
        catchError(err => {

          Swal.fire(
            'Error',
            err.error.error.message,
            'error'
          );
  
          return throwError(err.message);
  
        })
      );

  }

  actualizarUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/user/' + usuario.id;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this.token }),

    };
    
    return this.http.patch(url, usuario, httpOptions)
      .pipe(
        map(
          (resp: any) => {

            if ( usuario.id === this.usuario.id ) {
              this.guardarStorage(resp.usuario.id, this.token, resp.usuario);
            }

            Swal.fire(
              'Usuario actualizado',
              usuario.username,
              'success'
            );

            return true;

          }
        )
      );

  }

  cambiarImagen(archivo: File, id: any) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id, this.token)
      .then((resp: any) => {
        
        this.usuario.img = resp.usuario.img;

        Swal.fire('Imagen actualizada', this.usuario.username, 'success');

        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      });

  }

  cargarusuarios( page: number = 0 ) {

    let url = URL_SERVICIOS + '/user?page=' + page;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this.token }),

    };

    return this.http.get( url, httpOptions );

  }

  buscarUsuarios( termino: string) {

    let url = URL_SERVICIOS + '/user/busqueda?q=' + termino;
    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.usuarios)
      );

  }

  borrarUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/user/' + usuario.id;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this.token }),

    };
    
    return this.http.delete(url, httpOptions)
                .pipe(
                  map(resp => {
                    Swal.fire(
                      'Borrado!',
                      `El usuario ${ usuario.username } fue borrado`,
                      'success'
                    );
                    return true;
                  })
                );

  }

  renuevaToken() {
    const url = URL_SERVICIOS + '/auth/renew-token';

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this.token }),

    };

    return this.http.get(url, httpOptions)
                .pipe(
                  map((resp: any) => {

                    this.token = resp.token;
                    localStorage.setItem('token', this.token);
                    console.log('token renovado');

                    return true;

                  }),
                  catchError(err => {

                    this.router.navigate(['/login']);

                    Swal.fire(
                      'No se pudo renovar token',
                      'no fue posible renovar token',
                      'error'
                    );
            
                    return throwError(err.message);
            
                  })
                );
  }

}
