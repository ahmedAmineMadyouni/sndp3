import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmendesComponent } from './list-amendes.component';

describe('ListAmendesComponent', () => {
  let component: ListAmendesComponent;
  let fixture: ComponentFixture<ListAmendesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAmendesComponent]
    });
    fixture = TestBed.createComponent(ListAmendesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
