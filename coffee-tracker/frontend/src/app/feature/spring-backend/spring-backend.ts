import { Component, inject, OnInit, signal } from '@angular/core';
import { CoffeeTable } from "../../shared/coffee-table/coffee-table";
import { CommonModule } from '@angular/common';
import { Coffee, CoffeeService } from '../../service/coffee';

@Component({
  selector: 'app-spring-backend',
  imports: [
    CommonModule,
    CoffeeTable,
  ],
  templateUrl: './spring-backend.html',
  styleUrl: './spring-backend.scss',
})
export class SpringBackend implements OnInit {

  private coffeeService = inject(CoffeeService);
  dataSource = signal<Coffee[]>([]);

  ngOnInit() {

    this.coffeeService.getCoffees("Spring").subscribe(data => {
      this.dataSource.set(data);
    });
  }

}
