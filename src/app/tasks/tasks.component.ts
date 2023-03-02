import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';
import { Task } from '../shared/task.module';
import { TasksService } from '../shared/tasks.service';
import {switchMap} from 'rxjs/operators';
import { User } from '../shared/user.module';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {

  submitButtonTitle = "Добавить";
  // редактируемая задача
  editableTaskValue  = "";
  // обновленная задача
  newTaskValue = '';
  
  user_id:number = 1
  tasks:Task[] = []

  date = moment().clone().add(4, 'day').clone()

  constructor(public dateService: DateService, private tasksService: TasksService) {
  }
  
  // получение задач определенного юзера
  private getTasks(user:User, date:string) {
    var tasks:Task[] = []
    for (var i=0; i<user.tasks.length; i++) {
      if (user.tasks[i].date === date) {
        tasks.push(user.tasks[i])
      }
    }
    return tasks;
  }

  ngOnInit() {
    // this.newTaskValue = '';
    this.dateService.date.subscribe(res => {
      this.submitButtonTitle = "Добавить";
      this.editableTaskValue  = "";
      this.newTaskValue = '';
    });

    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(this.user_id))
      ).subscribe(user => {
      this.tasks = this.getTasks(user, this.dateService.date.getValue().format('DD-MM-YYYY'));
    }, err => {
      alert("Невозможно вывести список заметок.");
    });
  }

  // очистка полей
  clearFields() {
    this.submitButtonTitle = "Добавить";
    this.editableTaskValue  = "";
    this.newTaskValue = '';
  }

  // удаление задачи
  deleteTask(task:string) {
    this.tasksService.load(this.user_id).subscribe(user => {
      this.tasksService.deleteTask(user, task, this.dateService.date.getValue().format('DD-MM-YYYY')).subscribe(res => {
          this.ngOnInit()
          this.dateService.changeMonth(0);
          this.newTaskValue = '';
        }, err => {
          alert("Невозможно удалить заметку.");
        })
    }, err => {
      alert("Невозможно получить данные пользователя.");
    })
  }

  // обработка нажатия кнопки подтверждения (обновление или добавление задачи)
  submitForm()
  {
    if (this.newTaskValue)
    {
      if (this.editableTaskValue) {
        this.updateTask();
      }
      else {
        this.addTask();
      }
    }
  }

  // добавление задачи
  private addTask() {
    const task = new Task(this.dateService.date.getValue().format('DD-MM-YYYY'), "note", this.newTaskValue);
    this.newTaskValue = "";
    this.tasksService.load(this.user_id).subscribe(user => {
      this.tasksService.addTask(user, task).subscribe(res => {
          this.ngOnInit()
          this.dateService.changeMonth(0);
          this.newTaskValue = '';
        }, err => {
          alert("Невозможно добавить заметку.");
        })
    }, err => {
      alert("Невозможно получить данные пользователя.");
    })
  }

  // редактирование задачи (нажатие кнопки редактирования)
  editTask(task:string) {
    this.editableTaskValue = task;
    this.newTaskValue = task;
    this.submitButtonTitle = "Сохранить";
  }

  // обновление задачи 
  private updateTask() {
    this.tasksService.load(this.user_id).subscribe(user => {
      this.tasksService.editTask(user, this.editableTaskValue, this.newTaskValue, this.dateService.date.getValue().format('DD-MM-YYYY')).subscribe(res => {
          this.ngOnInit(); 
          this.clearFields();
        }, err => {
          alert("Невозможно обновить заметку.");
          this.clearFields();
        })
    }, err => {
      alert("Невозможно получить данные пользователя.");
      this.clearFields();
    });
  }

}
