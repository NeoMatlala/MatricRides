import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingApplicationComponent } from './view-booking-application.component';

describe('ViewBookingApplicationComponent', () => {
  let component: ViewBookingApplicationComponent;
  let fixture: ComponentFixture<ViewBookingApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBookingApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBookingApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
