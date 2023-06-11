import { Component } from '@angular/core';
import { TaskItem } from './models/taskItem';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'client';
  tasks: TaskItem[]=[];

}
