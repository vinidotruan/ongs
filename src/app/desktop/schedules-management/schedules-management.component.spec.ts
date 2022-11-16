import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesManagementComponent } from './schedules-management.component';

describe('SchedulesManagementComponent', () => {
  let component: SchedulesManagementComponent;
  let fixture: ComponentFixture<SchedulesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
