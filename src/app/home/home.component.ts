import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { PetsService } from '@shared/services/pets.service';
import { User } from '@shared/services/user';
import { Pet } from '@models/pet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public date = new Date().toLocaleDateString();
  public pets: Pet[];
  public dogUrl = '/assets/images/dog.png';

  constructor(
    private authService: AuthService,
    private petService: PetsService
  ) {}

  ngOnInit(): void {
    this.getPetList();
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
}
