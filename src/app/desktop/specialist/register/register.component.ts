import { Component, OnInit } from '@angular/core';
import { Ong } from '@models/ong';
import { AuthService } from '@shared/services/auth.service';
import { OngService } from '@shared/services/ong.service';
import { SchedulesService } from '@shared/services/schedules.service';
import { SpecialitiesService } from '@shared/services/specialities.service';
import { User } from '@shared/services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public specialists: User[];
  public ong: Ong;

  constructor(
    private specialistsService: SpecialitiesService,
    private authService: AuthService,
    private ongService: OngService
  ) {
    this.ongService.currentOng.subscribe({
      next: (response) => (this.ong = response),
      error: (error) => console.log(error),
    });
  }

  ngOnInit(): void {
    this.getSpecialists();
  }

  public attachSpecialist = (
    specialist: User,
    action: 'attach' | 'dettach'
  ) => {
    const ongId = this.authService.currentUser.ongs[0].id;

    const request =
      action === 'dettach'
        ? this.ongService.dettachSpecialist(ongId, specialist)
        : this.ongService.attachSpecialist(ongId, specialist);

    request.subscribe({
      next: ({ data }) => this.ongService.setOng(data),
      error: (error) => console.log(error.message),
    });
  };

  public hasRelation = (specialist): boolean =>
    this.ong?.hasSpecialist(specialist.id);

  private getSpecialists = () => {
    this.specialistsService.getAllSpecialists().subscribe({
      next: ({ data }: { data: User[] }) => (this.specialists = data),
      error: (error) => console.log(error),
    });
  };
}
