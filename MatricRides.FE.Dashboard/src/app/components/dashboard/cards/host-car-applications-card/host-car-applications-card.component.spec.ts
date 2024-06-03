import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostCarApplicationsCardComponent } from './host-car-applications-card.component';

describe('HostCarApplicationsCardComponent', () => {
  let component: HostCarApplicationsCardComponent;
  let fixture: ComponentFixture<HostCarApplicationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostCarApplicationsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostCarApplicationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
