import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccidentComponent } from './list-accident.component';

describe('ListAccidentComponent', () => {
  let component: ListAccidentComponent;
  let fixture: ComponentFixture<ListAccidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAccidentComponent]
    });
    fixture = TestBed.createComponent(ListAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
