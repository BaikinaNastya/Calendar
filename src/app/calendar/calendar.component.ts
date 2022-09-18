import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../shared/date.service';
import { TasksService } from '../shared/tasks.service';

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
  countOfTasks: number
}

moment.updateLocale('ru', {
  week: {
    dow : 1, // Начало недели с понедельника
  }
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Day[];
  ifTasks:boolean = true;
  user_id = 1;
  
  constructor(private dateService: DateService, private tasksService: TasksService) {
  }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    this.tasksService.load(this.user_id).subscribe(user => {
      const calendar = []
    
      const startDay = now.clone().startOf('month').startOf('week')
      const date = startDay.clone().subtract(1, 'day')

      const totalDays = 42; 
      
      for(var i = 0; i<totalDays;i++) {
        const value = date.add(1, 'day').clone()
        const active = moment().isSame(value, 'date')
        const disabled = !now.isSame(value, 'month')
        const selected = now.isSame(value, 'date')
        let countOfTasks = user.tasks.filter(task => task.date == value.format('DD-MM-YYYY')).length;

        calendar.push({
          value:value, active:active, disabled:disabled, selected:selected, countOfTasks:countOfTasks
        });
      }
      this.calendar = calendar
      
    }, err => {
      alert("Невозможно получить данные пользователя.");
    })
  }
  
  select(day: moment.Moment) {
    this.dateService.changeDate(day)
  }

}
