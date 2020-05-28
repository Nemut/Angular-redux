import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

// Definimos el tipo de dato como un objeto que contendr'a un booleano
// tambien podr'ia ser un primitivo
export interface State {
  isLoading: boolean;
}

// Inicializamos el state
export const initialState: State = {
  isLoading: false,
}
 
const _uiReducer = createReducer(initialState,

  on(isLoading,   state => ({ ...state, isLoading: true})),
  on(stopLoading, state => ({ ...state, isLoading: false}))

);
 
export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
