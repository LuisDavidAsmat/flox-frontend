import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { UpdateProjectComponent } from './pages/update-project/update-project.component';

export const routes: Routes = 
[
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'user/dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user/new-project',
        component:CreateProjectComponent,
        canActivate: [authGuard]
    },
    {
        path: 'project/:id',
        component: ProjectDetailsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'project/update/:id',
        component: UpdateProjectComponent,
        canActivate: [authGuard]
    },
    {
        path: "**",
        pathMatch: "full",
        component: PagenotfoundComponent
    }
    

];
