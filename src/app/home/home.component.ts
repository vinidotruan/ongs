import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public date = new Date().toLocaleDateString();
  public dogUrl = '/assets/images/dog.png';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get user(): User {
    return this.authService.currentUser;
  }
}
