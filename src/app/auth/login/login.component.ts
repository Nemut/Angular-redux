import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string;
  recuerdame: boolean = false;
  cargando: boolean = false;

  // Guardamos la subscripcion
  uiSubscription: Subscription;


  constructor(
    public router: Router,    
    public _usuarioService: UsuarioService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
      console.log('cargando subs');
    });

  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    this.store.dispatch( ui.isLoading() );

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => {
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/dashboard'])
      });

  }

  ngOnDestroy(): void {    
    this.uiSubscription.unsubscribe();    
  }

}
