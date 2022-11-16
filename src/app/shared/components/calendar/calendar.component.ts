import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  NgbDate,
  NgbDatepicker,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  @ViewChild(NgbDatepicker, { static: true }) datepicker: NgbDatepicker;
  @Input() availableDates: any;
  @Input() classes?: string;
  @Output() dateSelected = new EventEmitter();

  public isDisabled: (date: NgbDate, current: { month: number }) => boolean;

  public firstDayOfWeek = 0;

  constructor(public i18n: NgbDatepickerI18n) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isDisabled = (date: NgbDate, current: { month: number }) =>
      !this.availableDates[current.month].includes(date.day);
  }

  public onDateSelect = (event: any) => {
    this.dateSelected.emit(event);
  };
}
