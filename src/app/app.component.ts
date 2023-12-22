import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  front = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.refreshToken();

    const fourMinutes = 4 * 60 * 1000;

    interval(fourMinutes).subscribe(() => {
      this.authService.refreshToken();
    });
  }
}
