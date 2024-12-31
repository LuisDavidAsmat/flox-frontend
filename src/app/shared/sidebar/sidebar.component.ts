import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent 
{
  constructor(private authService: AuthService, private router: Router) {} 
  
  logout() 
  { 
    this.authService.logout().subscribe(
      { 
        next: () => 
        { 
          this.authService.clearAuthData(); 
          this.router.navigate(['/login']); 
        }, 
        error: (error) => 
        { 
          this.authService.clearAuthData();
          console.error('Logout error', error); 
        } 
      });
  }
}
