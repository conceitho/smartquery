import { TestBed } from '@angular/core/testing';

import { BasicProtheusServicesService } from './basic-protheus-services.service';

describe('BasicProtheusServicesService', () => {
  let service: BasicProtheusServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicProtheusServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
