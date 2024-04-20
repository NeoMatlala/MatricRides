import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostCarsCardComponent } from './host-cars-card.component';

describe('HostCarsCardComponent', () => {
  let component: HostCarsCardComponent;
  let fixture: ComponentFixture<HostCarsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostCarsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostCarsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
