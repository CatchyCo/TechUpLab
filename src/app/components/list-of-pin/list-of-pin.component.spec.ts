import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPinComponent } from './list-of-pin.component';

describe('ListOfPinComponent', () => {
  let component: ListOfPinComponent;
  let fixture: ComponentFixture<ListOfPinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfPinComponent]
    });
    fixture = TestBed.createComponent(ListOfPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
