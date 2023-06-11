import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskItem } from '../models/taskItem';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private tasksArraySubject = new BehaviorSubject<any[]>([]);

  tasks$ = this.tasksArraySubject.asObservable();

  getTasks() {
    axios.get('http://localhost:8080/tasks')
    .then((response) => {
      const data = response.data;
      this.tasksArraySubject.next(data);
    })
    .catch(() => {
      alert('Data Not Received')
    })
  }

  addTask(task: any) {
    const payload = {
      taskName: task.taskName,
      completed: false
    }
    axios({
      url: 'http://localhost:8080/tasks/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Saved')
      this.getTasks()
    })
    .catch(() => {
      console.log('Failed to Save')
    })
    const currentTasks = this.tasksArraySubject.value;
    const updatedTasks = [...currentTasks, task];
    this.tasksArraySubject.next(updatedTasks);
  }
  
  toggleComplete(_id: string) {
    this.tasks$.subscribe((tasks) => {
      const task: TaskItem = tasks.find((item: TaskItem) => item._id === _id);
      if (task) {
        axios.put(`http://localhost:8080/tasks/${_id}`, { completed: !task.completed })
        .then(() => {
          console.log('Successfully Updated')
        })
        .catch(() => {
          console.log('Failed to Update')
        })
      }
    });
  }

  delete(_id: string) {
    axios.delete(`http://localhost:8080/tasks/${_id}`)
    .then(() => {
      console.log('Successfully Deleted')
    })
    .catch(() => {
      console.log('Failed to Delete')
    })
  }
}
