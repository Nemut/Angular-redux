import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';
import { Usuario } from '../models/usuario.model';

// Definimos el tipo de dato como un objeto que contendr'a un booleano
// tambien podr'ia ser un primitivo
export interface State {
  user: Usuario;
}

// Inicializamos el state
export const initialState: State = {
  user: null,
}
 
const _authReducer = createReducer(initialState,

  on( setUser,   (state, { user }) => ({ ...state, user: { ...user } })),
  on( unSetUser, state => ({ ...state, user: null }))

);
 
export function authReducer(state, action) {
  return _authReducer(state, action);
}
