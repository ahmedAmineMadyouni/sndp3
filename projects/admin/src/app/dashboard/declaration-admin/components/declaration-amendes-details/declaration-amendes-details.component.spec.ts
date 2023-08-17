import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationAmendesDetailsComponent } from './declaration-amendes-details.component';

describe('DeclarationAmendesDetailsComponent', () => {
  let component: DeclarationAmendesDetailsComponent;
  let fixture: ComponentFixture<DeclarationAmendesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationAmendesDetailsComponent]
    });
    fixture = TestBed.createComponent(DeclarationAmendesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
