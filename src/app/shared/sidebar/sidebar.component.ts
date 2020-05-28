import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  authSubs: Subscription;

  constructor(
    public _usuarioService: UsuarioService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.authSubs = this.store.select('auth')
        .subscribe(({user}) => {
          this.nombre = user.username;
        });
    
  }

  ngOnDestroy(): void {
    
    this.authSubs.unsubscribe();
    
  }

}
