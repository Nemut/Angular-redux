import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setItems = createAction(
  '[IngresoEgreso] Set Items',
  props<{ items: IngresoEgreso[] }>()
);

export const addOneItem = createAction(
  '[IngresoEgreso] Add One Item',
  props<{ item: IngresoEgreso }>()
);

export const removeOneItem = createAction(
  '[IngresoEgreso] Remove One Item',
  props<{ id: string }>()
);

export const unSetItems = createAction('[IngresoEgreso] Unset Items');
