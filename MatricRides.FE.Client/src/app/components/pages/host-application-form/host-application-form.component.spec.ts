import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostApplicationFormComponent } from './host-application-form.component';

describe('HostApplicationFormComponent', () => {
  let component: HostApplicationFormComponent;
  let fixture: ComponentFixture<HostApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostApplicationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
