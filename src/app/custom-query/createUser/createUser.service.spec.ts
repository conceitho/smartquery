/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateUserService } from './createUser.service';

describe('Service: CreateUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUserService]
    });
  });

  it('should ...', inject([CreateUserService], (service: CreateUserService) => {
    expect(service).toBeTruthy();
  }));
});
