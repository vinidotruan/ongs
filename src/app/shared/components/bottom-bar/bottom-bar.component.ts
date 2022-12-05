import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { NavigationService } from '@shared/services/navigation.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent implements OnInit {
  public denyListUrls = ['desktop', 'login'];
  public navigationItems = [
    { path: '/mobile/pets', icon: 'cruelty_free' },
    { path: '/mobile/home', icon: 'home', active: ['/home', '/appointments/'] },
    { path: '/mobile/appointments', icon: 'calendar_month' },
    { path: '/mobile/logout', icon: 'settings' },
  ];

  constructor(
    public authService: AuthService,
    public navigationService: NavigationService,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {}

  public show = (): boolean =>
    this.authService.isLogged() &&
    this.navigationService.currentUrl !== undefined &&
    this.deviceService.isMobile() &&
    !this.denyListUrls.some((url) =>
      this.navigationService.currentUrl.includes(url)
    );
}
