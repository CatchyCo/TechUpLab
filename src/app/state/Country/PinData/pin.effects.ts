import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { getPinData, getPinDataSuccess } from './pin.actions';
import { PinService } from 'src/app/shared/pin.service';

@Injectable({
  providedIn: 'root',
})
export class PinEffect {
  constructor(public action$: Actions, public pinService: PinService) {}

  fetchPin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getPinData),
      mergeMap(() => {
        return this.pinService.getPinData().pipe(
          map((pinData) => {
            const pinList = pinData.map((e) => {
              const pin: any = e.payload.doc.data();
              pin.id = e.payload.doc.id;
              return pin;
            });
            return getPinDataSuccess({ pins: pinList });
          })
        );
      })
    );
  });
}
