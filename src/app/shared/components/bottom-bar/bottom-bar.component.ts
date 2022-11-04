import { Component, OnInit } from '@angular/core';

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
    { path: '/settings', icon: 'settings' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
