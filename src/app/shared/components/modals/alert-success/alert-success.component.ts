import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.scss'],
})
export class AlertSuccessComponent implements OnInit {
  @Input() message: string = 'Parabéns deu tudo certo!';

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  public close = () => this.activeModal.close();
}
