import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-selected-month',
  templateUrl: './selected-month.component.html',
  styleUrls: ['./selected-month.component.scss']
})


export class SelectedMonthComponent implements OnInit {

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
  }
  
  changeMonth(step: number) {
    this.dateService.changeMonth(step)
  }

  today() {
    this.dateService.changeDate(moment())
  }

}
