import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntretienUserComponent } from './list-entretien-user.component';

describe('ListEntretienUserComponent', () => {
  let component: ListEntretienUserComponent;
  let fixture: ComponentFixture<ListEntretienUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEntretienUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEntretienUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
