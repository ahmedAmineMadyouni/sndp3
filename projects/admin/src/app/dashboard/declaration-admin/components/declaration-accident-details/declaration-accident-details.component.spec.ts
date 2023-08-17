import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationAccidentDetailsComponent } from './declaration-accident-details.component';

describe('DeclarationAccidentDetailsComponent', () => {
  let component: DeclarationAccidentDetailsComponent;
  let fixture: ComponentFixture<DeclarationAccidentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationAccidentDetailsComponent]
    });
    fixture = TestBed.createComponent(DeclarationAccidentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
