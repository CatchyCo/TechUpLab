import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PinState } from './pin.state';

const pinSelector = createFeatureSelector<PinState>('pins');

export const getPins = createSelector(pinSelector, (state) => {
  return state.pins;
});
