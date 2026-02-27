import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeTable } from './coffee-table';

describe('CoffeeTable', () => {
  let component: CoffeeTable;
  let fixture: ComponentFixture<CoffeeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
