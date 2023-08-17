import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeclarationAccidentComponent } from './add-declaration-accident.component';

describe('AddDeclarationAccidentComponent', () => {
  let component: AddDeclarationAccidentComponent;
  let fixture: ComponentFixture<AddDeclarationAccidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeclarationAccidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeclarationAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
