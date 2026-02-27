import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GoBackend } from "./feature/go-backend/go-backend";
import { RustBackend } from "./feature/rust-backend/rust-backend";
import { SpringBackend } from "./feature/spring-backend/spring-backend";

@Component({
  selector: 'app-root',
  imports: [
    MatTabsModule,
    GoBackend,
    RustBackend,
    SpringBackend
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
