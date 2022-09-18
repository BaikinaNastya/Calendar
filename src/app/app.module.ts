import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MomentPipe } from './shared/moment.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectedMonthComponent } from './selected-month/selected-month.component';
import { TasksComponent } from './tasks/tasks.component';
import { DateService } from './shared/date.service';
import { TasksService } from './shared/tasks.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MomentPipe,
    SelectedMonthComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DateService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
