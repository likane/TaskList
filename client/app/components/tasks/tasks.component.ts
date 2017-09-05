import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';

@Component({
	moduleId: module.id,
	selector: 'tasks',
	templateUrl: 'tasks.component.html'
})

export class tasksComponent { 
	tasks: Task[];
	title: string,

	constructor(private taskService:TaskService){
		this.taskService.getTask()
			.subscribe(tasks => {
				this.tasks = tasks;
			});
	}

	addTask(event){
		event.preventDefault();
		console.log(this.title);
	}
}