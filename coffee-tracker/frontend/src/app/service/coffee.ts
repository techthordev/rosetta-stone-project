import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Coffee {
  id: number;
  type: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {

  private http = inject(HttpClient);

  private urls = {
    Spring: 'http://localhost:8080/api/coffees',
    Rust: 'http://localhost:8081/api/coffees',
    Go: 'http://localhost:8082/api/coffees',
  };

  getCoffees(backend: 'Rust' | 'Go' | 'Spring'): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(this.urls[backend]);
  }
  
}
