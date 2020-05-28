import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  cargando: boolean = false;

  // Guardamos la subscripcion
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public _usuarioService: UsuarioService,
    public router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: [''],
      condiciones: [false]
    }, {validators: this.sonIguales });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;      
    });
    
  }

  sonIguales( group: FormGroup ) {

    const pass1 = group.get('password').value;
    const pass2 = group.get('password2').value;

    return pass1 === pass2 ? null : {sonIguales: true};

  }

  crearUsuario() {

    if ( this.registroForm.invalid ) {
      console.log('formulario no valido');
      return;
    }

    if ( !this.registroForm.value.condiciones ) {

      Swal.fire(
        'Importante!',
        'Debe aceptar las condiciones',
        'warning'
      );

      return;
    }

    this.store.dispatch( ui.isLoading() );

    const usuario = new Usuario(
      this.registroForm.value.nombre,
      this.registroForm.value.email,
      this.registroForm.value.password,
    );

    usuario.role = 'editor';

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => {
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/login']);
      });
    
  }

  ngOnDestroy(): void {    
    this.uiSubscription.unsubscribe();    
  }

}
