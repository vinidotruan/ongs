import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent implements OnInit {
  public navigationItems = [
    { path: '/pets', icon: 'cruelty_free' },
    { path: '/home', icon: 'home', active: ['/home', '/appointments/'] },
    { path: '/appointments', icon: 'calendar_month' },
    { path: '/logout', icon: 'settings' },
  ];

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {}

  public show = (): boolean =>
    this.authService.isLogged() &&
    !this.navigationService.currentUrl?.includes('desktop');
}
