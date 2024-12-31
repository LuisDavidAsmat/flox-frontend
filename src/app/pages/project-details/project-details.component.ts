import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Project } from '../../types/project/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project2, Task2 } from '../../types/project2/project2.model';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent 
{
  project: Project2 | null = null;

  selectedTaskId: number | null = null;

  task: Task2 = 
  {
    id: 0,
    title: '',
    description: '',
    taskStatus: '',
    dueDate: '',

    projectId: 0,
    projectName: '',
    assigneeId: 0,
    assigneeName: '',
  }

  constructor(private route: ActivatedRoute, private projectService: ProjectService
    , private taskService: TaskService
  ){}

  ngOnInit()
  {
    this.route.params.subscribe(
      params =>
      {
        const id = +params['id'];

        this.loadProject(id);
      }
    )
  }

  loadProject(id: number)
  {
    this.projectService.viewProject2(id).subscribe( 
    {
      next: (project) => 
      {
        this.project = project;
      },
      error: (error) => 
      {
        console.error('Error fetching project: ', error)
      }
    })
  }

  onSubmit(form: NgForm)
  {
    
    if(form.valid && this.task.id)
    {
      console.log("\n\n\n\n\n", 'Submitting task:', this.task, "\n\n\n\n\n");

      this.taskService.updateTask(this.task.id, this.task).subscribe(
      {
        next: (response) => 
        {
          console.log('Task updated successfully: ', response);
          this.cancelUpdate(); // Reset form and selected task
          this.loadProject(this.project?.id || 0);
        },
        error: (error) => 
        {
          console.log("Error updating the project", error);
          
        }
      })
    }    
  }

  onSubmitCreateTask(form: NgForm)
  {
   
    console.log("\n\n\n\n\n", 'Sub', this.task);
    if(form.valid)
      {
        console.log("\n\n\n\n\n", 'Submitting task for CREATION:', this.task, "\n\n\n\n\n");
  
        this.taskService.createTask(this.task).subscribe(
        {
          next: (response) => 
          {
            console.log('Task created successfully: ', response);
          },
          error: (error) => 
          {
            console.log("Error updating the project", error);
            
          }
        });
      };
  }

  selectTaskForUpdate(task: Task2)
  {
    this.selectedTaskId = task.id || null;
    this.task = { ... task};     
    //this.task = JSON.parse(JSON.stringify(task));
  }

  cancelUpdate() {
    this.selectedTaskId = null;
    this.task = {
      title: '',
      description: '',
      taskStatus: '',
      dueDate: '',
      projectId: 0,
      projectName: '',
      assigneeId: 0,
      assigneeName: '',
    };
  }

  loadTask(taskId: number)
  {
    this.taskService.viewTask(taskId).subscribe(
    {
      next: (task) => 
      {
        this.task = task;
      },
      error: (error) => 
      {
        console.error('Error fetching task: ', error);
      }
    });
  }

  deleteTask(taskId: number)
  {
    if( confirm('Are you sure you want to delete this task?'))
    {
      this.taskService.deleteTask(taskId).subscribe(
      {
        next: () => 
        {
          console.log("Task deleted successfully");
          this.loadProject(this.project?.id || 0);
          
        },
        error: (error) => 
        {
          console.error("Error deleting task", error);
        }
      });
    }
  }

}
