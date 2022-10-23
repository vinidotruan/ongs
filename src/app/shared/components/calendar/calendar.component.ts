import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDatepicker, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild(NgbDatepicker, { static: true }) datepicker: NgbDatepicker;
  public firstDayOfWeek = 0;

  constructor(public i18n: NgbDatepickerI18n) {}

  ngOnInit(): void {}
}
