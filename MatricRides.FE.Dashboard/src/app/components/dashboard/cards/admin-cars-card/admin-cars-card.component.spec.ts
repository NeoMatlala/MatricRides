import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarsCardComponent } from './admin-cars-card.component';

describe('AdminCarsCardComponent', () => {
  let component: AdminCarsCardComponent;
  let fixture: ComponentFixture<AdminCarsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCarsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
