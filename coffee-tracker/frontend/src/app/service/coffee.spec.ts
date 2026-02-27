import { TestBed } from '@angular/core/testing';

import { Coffee } from './coffee';

describe('Coffee', () => {
  let service: Coffee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coffee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
