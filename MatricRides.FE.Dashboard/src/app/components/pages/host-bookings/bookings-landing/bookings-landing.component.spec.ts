import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsLandingComponent } from './bookings-landing.component';

describe('BookingsLandingComponent', () => {
  let component: BookingsLandingComponent;
  let fixture: ComponentFixture<BookingsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
