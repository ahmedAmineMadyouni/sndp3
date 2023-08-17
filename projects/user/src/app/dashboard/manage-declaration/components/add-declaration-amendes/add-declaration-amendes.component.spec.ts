import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeclarationAmendesComponent } from './add-declaration-amendes.component';

describe('AddDeclarationAmendesComponent', () => {
  let component: AddDeclarationAmendesComponent;
  let fixture: ComponentFixture<AddDeclarationAmendesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeclarationAmendesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeclarationAmendesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
