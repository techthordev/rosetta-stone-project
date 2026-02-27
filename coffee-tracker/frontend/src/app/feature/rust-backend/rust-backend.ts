import { Component, inject, OnInit, signal } from '@angular/core';
import { Coffee, CoffeeService } from '../../service/coffee';
import { CommonModule } from '@angular/common';
import { CoffeeTable } from '../../shared/coffee-table/coffee-table';

@Component({
  selector: 'app-rust-backend',
  imports: [
    CommonModule,
    CoffeeTable
  ],
  templateUrl: './rust-backend.html',
  styleUrl: './rust-backend.scss',
})
export class RustBackend implements OnInit {

  private coffeeService = inject(CoffeeService);
  dataSource = signal<Coffee[]>([]);

  ngOnInit() {

    this.coffeeService.getCoffees("Rust").subscribe(data => {
      this.dataSource.set(data);
    });
  }

}
