import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from './user.module';
import { Task } from './task.module';


@Injectable()
export class TasksService {
  static url = 'http://localhost:3000/users/'
  user_id:number = 1
  tasks:Task[] = []

  constructor(private http: HttpClient) {
  }

  load(user_id): Observable<User> {
    return this.http.get<User>(TasksService.url + user_id)
  }

  addTask(user:User, task:Task){
    let id = 1;
    for (var i=0; i<user.tasks.length; i++) {
      if (user.tasks[i].id >= id){
        id = user.tasks[i].id + 1;
        continue;
      }
    }
    task.id = id;
    user.tasks.push(task);
    return this.http.put(`${TasksService.url}/${user.id}/`, user);
  }

  deleteTask(user:User, value:string, date:string) {
    let flag:boolean = false;
    user.tasks.forEach( (task, index) => {
      if (task.title == value && task.date == date){
        flag = true;
        user.tasks.splice(index, 1);
      }
    })
    if (flag) {
      return this.http.put(`${TasksService.url}/${user.id}/`, user);
    }
    else {
      return this.http.put(`${TasksService.url}/${user.id}/ggg`, user);
    }
  }

  editTask(user:User, editableTaskValue:string, newTaskValue:string, date:string) {
    let flag:boolean = false;
    user.tasks.forEach( (task, index) => {
      if (task.title == editableTaskValue && task.date == date){
        flag = true;
        user.tasks[index].title = newTaskValue;
      }
    })
    if (flag) {
      return this.http.put(`${TasksService.url}/${user.id}/`, user);
    }
    else {
      return this.http.put(`${TasksService.url}/${user.id}/ggg`, user);
    }
  }

}