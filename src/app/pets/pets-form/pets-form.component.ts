import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breed } from '@models/breed';
import { NewPetForm } from '@models/forms/new-pet';
import { Pet } from '@models/pet';
import { IndexResponse } from '@models/responses/index-response';
import { ShowResponse } from '@models/responses/show-response';
import { Size } from '@models/size';
import { PetsService } from '@shared/services/pets.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pets-form',
  templateUrl: './pets-form.component.html',
  styleUrls: ['./pets-form.component.scss'],
})
export class PetsFormComponent implements OnInit {
  public form = new NewPetForm().form(false);
  public breeds: Breed[];
  public sizes: Breed[];
  public petId: string;

  constructor(private petService: PetsService, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.petId = routeParams.get('petId');
  }

  ngOnInit(): void {
    this.getPetsInfos();
    if (this.petId) {
      this.getPetDetails();
    }
  }

  public clicou = () => console.log('asdokjad');

  public submit = () => {
    this.form.get('id').value ? this.updatePet() : this.createPet();
  };

  public updatePet = (): void => {
    this.petService.updatePet(this.form.getRawValue()).subscribe({
      next: (response) => console.log(response),
      error: (error) => alert(error),
    });
  };

  public createPet = () => {
    this.petService.store(this.form.getRawValue()).subscribe({
      next: (response) => console.log(response),
      error: (error) => alert(error),
    });
  };

  private getPetsInfos = (): void => {
    forkJoin([
      this.petService.getAllBreeds(),
      this.petService.getAllBreedsSizes(),
    ]).subscribe({
      next: (value: [IndexResponse<Breed>, IndexResponse<Size>]) => {
        this.breeds = value[0].data;
        this.sizes = value[1].data;
      },
      error: (error) => alert(error),
    });
  };

  private getPetDetails = () => {
    this.petService.getPet(this.petId).subscribe({
      next: ({ data }) => this.form.patchValue(data),
      error: (error) => alert(error),
    });
  };
}
