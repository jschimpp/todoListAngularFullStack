import { Component, EventEmitter, Output } from '@angular/core';
import { DataSharingService } from 'src/app/rxjs/DataService';

// interface LocalTask {
//   taskName: String,
//   completed: boolean,
// }

@Component({
  selector: 'app-task-form',
  templateUrl: './form.component.html',
})

export class TaskFormComponent {

  newTask: string;
  // @Output() onFormSubmitted = new EventEmitter<LocalTask>()

  constructor(private dataService: DataSharingService) {
    this.newTask = ""
  }

  addTask() {
    const task = { taskName: this.newTask, completed: false };
    this.dataService.addTask(task);
    // this.onFormSubmitted.emit(task)
    this.newTask = "";
  }
}

