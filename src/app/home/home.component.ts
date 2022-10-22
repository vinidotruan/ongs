import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentUser: User;
  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {}
}
