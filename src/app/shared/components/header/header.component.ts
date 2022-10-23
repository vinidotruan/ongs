import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { NavigationHistoryService } from '@shared/services/navigation-history.service';
import { User } from '@shared/services/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public currentUser: User;

  constructor(
    public navigation: NavigationHistoryService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {}

  public showBack = () => this.navigation.getPreviousUrl() !== undefined;
}
