import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoBackend } from './go-backend';

describe('GoBackend', () => {
  let component: GoBackend;
  let fixture: ComponentFixture<GoBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoBackend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
