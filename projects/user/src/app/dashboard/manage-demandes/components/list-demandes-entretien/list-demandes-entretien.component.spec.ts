import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandesEntretienComponent } from './list-demandes-entretien.component';

describe('ListDemandesEntretienComponent', () => {
  let component: ListDemandesEntretienComponent;
  let fixture: ComponentFixture<ListDemandesEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandesEntretienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDemandesEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
