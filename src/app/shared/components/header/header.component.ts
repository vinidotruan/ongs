import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/services/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public showBack = false;
  public currentUser: User;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {}
}
