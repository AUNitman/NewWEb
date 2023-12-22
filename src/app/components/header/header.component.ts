import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public login: boolean = true;

  constructor(public authService: AuthService){
    
  }

  logout(){
    this.authService.logout()
  }
}
