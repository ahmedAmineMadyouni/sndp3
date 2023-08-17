import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandesEntretienComponent } from './add-demandes-entretien.component';

describe('AddDemandesEntretienComponent', () => {
  let component: AddDemandesEntretienComponent;
  let fixture: ComponentFixture<AddDemandesEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemandesEntretienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDemandesEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
