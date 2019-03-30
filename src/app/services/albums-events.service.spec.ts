import { TestBed } from '@angular/core/testing';

import { AlbumsEventsService } from './albums-events.service';

describe('AlbumsEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumsEventsService = TestBed.get(AlbumsEventsService);
    expect(service).toBeTruthy();
  });
});
