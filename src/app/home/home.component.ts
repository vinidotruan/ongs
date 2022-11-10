import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { PetsService } from '@shared/services/pets.service';
import { User } from '@shared/services/user';
import { Pet } from '@models/pet';
import { SchedulesService } from '@shared/services/schedules.service';
import { Scheduling } from '@models/scheduling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public date = new Date().toLocaleDateString();
  public pets: Pet[];
  public dogUrl = '/assets/images/dog.png';
  public schedulings: Scheduling[];

  constructor(
    private authService: AuthService,
    private petService: PetsService,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit(): void {
    this.getPetList();
    this.getNextSchedulings();
  }

  get user(): User {
    return this.authService.currentUser;
  }

  private getPetList = () => {
    this.petService.getPetsByUser(this.authService.currentUser.id).subscribe({
      next: ({ data }: { data: Pet[] }) => (this.pets = data),
      error: (error) => alert(error),
    });
  };

  private getNextSchedulings = () => {
    this.schedulesService.getNextScheduling().subscribe({
      next: ({ data }: { data: Scheduling[] }) => (this.schedulings = data),
      error: (error) => console.log(error),
    });
  };
}
