import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CoffeeTable } from '../../shared/coffee-table/coffee-table';
import { Coffee, CoffeeService } from '../../service/coffee';

@Component({
  selector: 'app-go-backend',
  imports: [
    CommonModule,
    CoffeeTable
  ],
  templateUrl: './go-backend.html',
  styleUrl: './go-backend.scss',
})
export class GoBackend implements OnInit {

  private coffeeService = inject(CoffeeService);
  dataSource = signal<Coffee[]>([]);
  
  ngOnInit() {

    this.coffeeService.getCoffees("Go").subscribe(data => {
      this.dataSource.set(data);
    });
    
  }
}
