import { Component } from '@angular/core';
import { Project, Task, User } from '../../types/project/project.model';
import { ProjectService } from '../../services/project.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Project2, Task2, User2 } from '../../types/project2/project2.model';

@Component({
  selector: 'app-create-project',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  project: Project = 
  { 
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
    completionPercentage: 0,
    creator: { 
      userId: 0, 
      username: '', 
      // email: '', 
      // userRole: '' 
    },
    tasks: [],
    members: []
  };

  newTask: Task = 
  {
    title: '',
    description: '',
    taskStatus: '',
    dueDate: '',
    assignee: 
    {
      userId: 0,
    }

  };

  newMember: User = 
  {
    userId: 0
  };

  constructor( private projectService: ProjectService){}

  onSubmit (form: NgForm)
  {
    this.project.tasks.push(this.newTask);
    this.project.members.push(this.newMember);

    this.projectService.createProject(this.project).subscribe(
    {
      next: (response) => 
      {
        console.log('Project updated successfully: ', response);
      },
      error: (error) => 
      {
        console.error('Error updating project: ', error);
      }
    });
  };

}
