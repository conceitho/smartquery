import { TestBed } from '@angular/core/testing';

import { OthersComponent } from './others.component';

describe('OthersService', () => {
  let service: OthersComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OthersComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
