import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBackend } from './spring-backend';

describe('SpringBackend', () => {
  let component: SpringBackend;
  let fixture: ComponentFixture<SpringBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpringBackend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
