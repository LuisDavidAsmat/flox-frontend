import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TicketsSummaryComponent } from '../../shared/tickets-summary/tickets-summary.component';
import { FloxuserService } from '../../services/floxuser.service';
import { CommonModule, DatePipe} from '@angular/common';
import { Project } from '../../types/project/project.model';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-dashboard',
  imports: [
    FooterComponent, 
    HeaderComponent, 
    SidebarComponent, 
    TicketsSummaryComponent,
    CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit
{
  projects: any[] = [];
  hasProjects: boolean = false;

  constructor(private floxUserService: FloxuserService, private datePipe: DatePipe
    , private projectService: ProjectService
  ){}

  ngOnInit(): void 
  {
    this.floxUserService.getUserProjects().subscribe(
    {
      next: (data) => 
      {
        console.log('great');
        this.projects = data;
        this.hasProjects = this.projects.length > 0;
        this.formatDates();
      },
      error: (error) =>
      {
        if (error.status === 401) {
          console.error('Unauthorized access - perhaps the token is invalid');
        } else {
          console.error('Error fetching projects', error);
        }
      }
    });
  };

  formatDates()
  {
    this.projects.forEach( project => 
    {
      project.startDate = this.datePipe.transform(project.startDate, 'MMMM d, y');
      project.endDate = this.datePipe.transform(project.endDate, 'MMMM d, y');
    })
  }

  deleteProject(id: number): void
  {
    this.projectService.deleteProject(id).subscribe(
    {
      next: () => 
      {
        this.projects = this.projects.filter(project => project.id !== id);
        this.hasProjects = this.projects.length > 0;
        console.log(`Project with id ${id} deleted successfully`);
      },
      error: (error) => 
      {
        console.error('Error deleting project', error);
      }
    });
  };

}
