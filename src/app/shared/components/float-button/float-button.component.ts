import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss'],
})
export class FloatButtonComponent implements OnInit {
  @Input() customClasses: string;

  constructor() {}

  ngOnInit(): void {}
}
