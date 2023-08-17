import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmendesComponent } from './add-amendes.component';

describe('AddAmendesComponent', () => {
  let component: AddAmendesComponent;
  let fixture: ComponentFixture<AddAmendesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAmendesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAmendesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
