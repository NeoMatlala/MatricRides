import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPageSearchComponent } from './results-page-search.component';

describe('ResultsPageSearchComponent', () => {
  let component: ResultsPageSearchComponent;
  let fixture: ComponentFixture<ResultsPageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsPageSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsPageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
