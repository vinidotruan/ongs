import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.scss'],
})
export class AlertSuccessComponent implements OnInit {
  @Input() message: string = 'Parabéns deu tudo certo!';

  constructor() {}

  ngOnInit(): void {}

  public close = () => {};
}
