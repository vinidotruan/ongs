import { Component, OnInit } from '@angular/core';
import { Pet } from '@models/pet';
import { AuthService } from '@shared/services/auth.service';
import { PetsService } from '@shared/services/pets.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
})
export class PetsListComponent implements OnInit {
  public pets: Pet[];

  constructor(
    private petService: PetsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPetList();
  }

  private getPetList = () => {
    this.petService.getPetsByUser(this.authService.currentUser.id).subscribe({
      next: ({ data }: { data: Pet[] }) => (this.pets = data),
      error: (error) => alert(error),
    });
  };
}
