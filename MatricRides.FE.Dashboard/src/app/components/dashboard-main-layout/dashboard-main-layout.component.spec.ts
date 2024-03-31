import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainLayoutComponent } from './dashboard-main-layout.component';

describe('DashboardMainLayoutComponent', () => {
  let component: DashboardMainLayoutComponent;
  let fixture: ComponentFixture<DashboardMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMainLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
