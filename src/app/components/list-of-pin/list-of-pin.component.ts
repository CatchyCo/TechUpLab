import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/service/country-service.service';

@Component({
  selector: 'app-list-of-pin',
  templateUrl: './list-of-pin.component.html',
  styleUrls: ['./list-of-pin.component.scss'],
})
export class ListOfPinComponent implements OnInit {
  constructor(public countryService: CountryService) {}

  public pinList: any;
  public showModal: boolean = false;
  public showCustomerModal: boolean = false;
  public showPinModal: boolean = false;
  ngOnInit(): void {
    this.countryService.getPinData().subscribe((pins) => {
      this.pinList = pins.map((e) => {
        const pins: any = e.payload.doc.data();
        pins.id = e.payload.doc.id;
        return pins;
      });
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
