import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCarAddressComponent } from './search-car-address.component';

describe('SearchCarAddressComponent', () => {
  let component: SearchCarAddressComponent;
  let fixture: ComponentFixture<SearchCarAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCarAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCarAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
