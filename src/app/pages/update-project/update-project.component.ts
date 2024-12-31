import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
// import { Project, Task, User } from '../../types/project/project.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Project2, Task2, User2 } from '../../types/project2/project2.model';

@Component({
  selector: 'app-update-project',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent 
{
  projectId: number = 0;

  project: Project2 = 
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
      email: '', 
      userRole: '' 
    },
    tasks: [
      {
        title: '',
        description: '',
        taskStatus: '',
        dueDate: '',
      }
    ],
    members: [{
      userId: 0, 
      username: '', 
      email: '', 
      userRole: '' 
    }],
  };

  user2: User2 = 
  {
    userId: 0,
    username: '',
    email: '',
    userRole: '',
  }

  tasks2: Task2 =
  {
    title: '',
    description: '',
    taskStatus: '',
    dueDate: '',
    
  }


  constructor( private route: ActivatedRoute, private projectService: ProjectService){}

  ngOnInit()
  {
    this.route.params.subscribe(
    params =>
    {
      this.projectId = +params['id'];

      this.projectService.viewProject2(this.projectId).subscribe(
      {
        next: (project) => 
        {
          this.project = project;
          console.log(project);
          
        },
        error: (error) => 
        {
          console.error('Error fetching project: ', error)
        }
      })
    });
  };

  onSubmit(form: NgForm)
  {
    this.projectService.updateProject(this.projectId, this.project).subscribe(
    {
      next: (response) => 
      {
        console.log('Project updated successfully: ', response);
      },
      error: (error) => 
      {
        console.log("Error updating the project", error);
        
      }
    })
  }
}




  // project: Project = {
  //   name: '',
  //   description: '',
  //   startDate: '',
  //   endDate: '',
  //   budget: 0,
  //   completionPercentage: 0,
  //   creatorId: 0,
  //   creatorName: '',
  //   creator: { userId: 0, username: '' },
  //   tasks: [],
  //   members: []
  // };

  // // Keep these for adding new tasks/members if needed
  // newTask: Task = {
  //   title: '',
  //   description: '',
  //   taskStatus: '',
  //   dueDate: '',
  //   assignee: {
  //     userId: 0,
  //   }
  // };

  // newMember: User = {
  //   userId: 0
  // };