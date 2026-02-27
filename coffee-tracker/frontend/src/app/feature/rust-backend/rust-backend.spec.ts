import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RustBackend } from './rust-backend';

describe('RustBackend', () => {
  let component: RustBackend;
  let fixture: ComponentFixture<RustBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RustBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RustBackend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
