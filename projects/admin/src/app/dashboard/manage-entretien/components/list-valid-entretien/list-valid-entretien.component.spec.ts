import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListValidEntretienComponent } from './list-valid-entretien.component';

describe('ListValidEntretienComponent', () => {
  let component: ListValidEntretienComponent;
  let fixture: ComponentFixture<ListValidEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListValidEntretienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListValidEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
