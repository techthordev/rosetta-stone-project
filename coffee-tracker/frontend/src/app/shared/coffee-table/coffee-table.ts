import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Coffee } from '../../service/coffee';

@Component({
  selector: 'app-coffee-table',
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './coffee-table.html',
  styleUrl: './coffee-table.scss',
})
export class CoffeeTable {

  @Input({ required: true }) data: Coffee[] = [];
  displayedColumns: string[] = ['id', 'type', 'price'];

}
