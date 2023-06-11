import { Component, OnInit } from '@angular/core';
import { TaskItem } from 'src/app/models/taskItem';
import { DataSharingService } from 'src/app/rxjs/DataService';

@Component({
  selector: 'app-task-list',
  // template: `
  //   <ul>
  //     <li *ngFor="let task of tasks">
  //       <span [class.completed]="task.completed">{{ task.taskName }}</span>
  //     </li>
  //   </ul>
  // `,
  templateUrl: './list.component.html',
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `]
})
export class TaskListComponent {
  tasks: TaskItem[]=[];

  constructor(private dataService: DataSharingService) {
    this.dataService.getTasks();
  }

  ngOnInit() {
    this.dataService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  toggleComplete(_id: string) {
    this.dataService.toggleComplete(_id)
  }

  delete(_id: string) {
    // const task = this.tasks.find(item => item._id === _id)
    this.dataService.delete(_id)
    this.tasks = this.tasks.filter((item) => item._id !== _id)
  }
}
