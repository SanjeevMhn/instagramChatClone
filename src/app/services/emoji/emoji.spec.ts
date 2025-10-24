import { TestBed } from '@angular/core/testing';

import { Emoji } from './emoji';

describe('Emoji', () => {
  let service: Emoji;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emoji);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
