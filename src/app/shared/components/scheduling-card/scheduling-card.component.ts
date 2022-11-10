import { Component, Input, OnInit } from '@angular/core';
import { Scheduling } from '@models/scheduling';

@Component({
  selector: 'app-scheduling-card',
  templateUrl: './scheduling-card.component.html',
  styleUrls: ['./scheduling-card.component.scss'],
})
export class SchedulingCardComponent implements OnInit {
  @Input() scheduling: Scheduling;

  constructor() {}

  ngOnInit(): void {}
}
