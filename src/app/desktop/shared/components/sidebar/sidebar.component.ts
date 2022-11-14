import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/services/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public currentUser: User;
  public navigationItems = [
    {
      path: '/home',
      icon: 'home',
      active: ['/home', '/appointments/'],
      text: 'Agendamentos',
    },
    { path: '/appointments', icon: 'calendar_month', text: 'Editar Agendas' },
  ];
  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {}
}
