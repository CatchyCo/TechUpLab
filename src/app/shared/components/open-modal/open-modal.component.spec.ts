import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenModalComponent } from './open-modal.component';

describe('OpenModalComponent', () => {
  let component: OpenModalComponent;
  let fixture: ComponentFixture<OpenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenModalComponent]
    });
    fixture = TestBed.createComponent(OpenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
