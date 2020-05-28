import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems, addOneItem, removeOneItem } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';


export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
  ingresosEgresos: State
}

// Inicializamos el state
export const initialState: State = {
  items: [],
}
 
const _ingresoEgresoReducer = createReducer(initialState,

  on( setItems,   (state, { items }) => ({ ...state, items: [...items ] })),
  on( addOneItem,   (state, { item }) => {
    return {
      ...state,
      items: [...state.items, item]
    };
  }),
  on( removeOneItem,   (state, { id }) => {
    return {
      ...state,
      items: state.items.filter(item => item.id !== id)
    };
  }),
  on( unSetItems, state => ({ ...state, items: [] }))

);
 
export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
