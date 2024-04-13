import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHostAccountComponent } from './create-host-account.component';

describe('CreateHostAccountComponent', () => {
  let component: CreateHostAccountComponent;
  let fixture: ComponentFixture<CreateHostAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHostAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHostAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
