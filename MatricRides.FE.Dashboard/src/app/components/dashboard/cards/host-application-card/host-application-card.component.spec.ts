import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostApplicationCardComponent } from './host-application-card.component';

describe('HostApplicationCardComponent', () => {
  let component: HostApplicationCardComponent;
  let fixture: ComponentFixture<HostApplicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostApplicationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostApplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
