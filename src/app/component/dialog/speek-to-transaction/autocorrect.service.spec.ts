import { TestBed } from '@angular/core/testing';

import { AutocorrectService } from './autocorrect.service';

describe('AutocorrectService', () => {
  let service: AutocorrectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocorrectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
