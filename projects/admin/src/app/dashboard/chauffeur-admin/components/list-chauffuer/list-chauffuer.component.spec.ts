import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChauffuerComponent } from './list-chauffuer.component';

describe('ListChauffuerComponent', () => {
  let component: ListChauffuerComponent;
  let fixture: ComponentFixture<ListChauffuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChauffuerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChauffuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
