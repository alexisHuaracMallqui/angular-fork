import { TestBed } from '@angular/core/testing';

import { MallaCurricularService } from './malla-curricular.service';

describe('MallaCurricularService', () => {
  let service: MallaCurricularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MallaCurricularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
