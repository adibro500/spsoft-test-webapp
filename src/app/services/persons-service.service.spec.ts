import { TestBed, inject } from '@angular/core/testing';

import { PersonsServiceService } from './persons-service.service';

describe('PersonsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonsServiceService]
    });
  });

  it('should be created', inject([PersonsServiceService], (service: PersonsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
