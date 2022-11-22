import { Component, OnInit } from '@angular/core';
import { Ong } from '@models/ong';
import { AuthService } from '@shared/services/auth.service';
import { OngService } from '@shared/services/ong.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit {
  constructor(
    private ongService: OngService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const ongId = this.authService.currentUser.ongs[0].id;
    this.ongService.getOng(ongId).subscribe({
      next: ({ data }: { data: Ong }) => {
        this.ongService.setOng(data);
      },
      error: (error) => console.log(error),
    });
  }
}
