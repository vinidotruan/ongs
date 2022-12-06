import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      path: '/desktop/home',
      icon: 'home',
      active: ['/home', '/appointments/'],
      text: 'Agendamentos',
    },
    {
      path: '/desktop/management',
      icon: 'calendar_month',
      text: 'Agendas',
    },
    {
      path: '/desktop/specialist/register',
      icon: 'calendar_month',
      text: 'Registrar Médico',
    },
  ];
  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearLocalStorage();
        this.router.navigate(['/login']);
      },
      error: (error) => console.log(error),
    });
  }
}
