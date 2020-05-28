import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate, CanLoad {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canLoad() {

    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

  }

  canActivate() {

    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

  }

}
