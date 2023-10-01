import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CountryService } from 'src/app/service/country-service.service';
import { PinService } from 'src/app/shared/pin.service';
import { getPinData } from 'src/app/state/Country/PinData/pin.actions';
import { Pin } from 'src/app/state/Country/PinData/pin.state';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-list-of-pin',
  templateUrl: './list-of-pin.component.html',
  styleUrls: ['./list-of-pin.component.scss'],
})
export class ListOfPinComponent implements OnInit {
  constructor(
    public countryService: CountryService,
    public pinService: PinService,
    public store: Store<AppState>
  ) {}

  public pinList: any;
  public showModal: boolean = false;
  public showCustomerModal: boolean = false;
  public showPinModal: boolean = false;

  ngOnInit(): void {
    this.fetchPins();
  }

  public fetchPins() {
    this.store.dispatch(getPinData());
    this.store.select('pins').subscribe((data) => {
      const pinList: Pin[] | null = data.pins;
      if (pinList) {
        this.pinList = pinList;
      }
    });
  }

  public openModal(modalName: string) {
    this.showModal = true;
    if (modalName === 'customerModal') {
      this.showCustomerModal = true;
    } else {
      this.showPinModal = true;
    }
  }

  public closeModal() {
    this.showModal = false;
    this.showCustomerModal = false;
    this.showPinModal = false;
  }
}
