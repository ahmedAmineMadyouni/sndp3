import { TestBed } from '@angular/core/testing';

import { DeclarationDetailsService } from './declaration-details.service';

describe('DeclarationDetailsService', () => {
  let service: DeclarationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
