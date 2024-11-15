import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService, User } from '../services/crud.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand">User Management</a>
      <button class="btn btn-outline-danger" (click)="logout()">Logout</button>
    </div>
  </nav>

  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <div class="input-group mb-3" style="max-width: 600px;">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Search user by ID" 
          [(ngModel)]="searchTerm"
          aria-label="Search user" 
          aria-describedby="button-search">
        <div class="input-group-append">
          <button 
            class="btn btn-primary" 
            type="button" 
            (click)="searchUser()"
            id="button-search">Search</button>
        </div>
        <button 
          class="btn btn-success ml-2" 
          type="button" 
          (click)="addNewUser()"
          id="button-add-user">Add New User</button>
        <button 
          class="btn btn-secondary ml-2" 
          type="button" 
          (click)="clearSearch()"
          *ngIf="isSearchActive"
          id="button-clear">Clear Search</button>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div *ngIf="isLoading" class="text-center mt-3">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- Error Message -->
    <div *ngIf="errorMessage" class="alert alert-danger mt-3" role="alert">
      {{ errorMessage }}
    </div>

    <!-- Users Table -->
    <div class="table-responsive mt-4" *ngIf="users.length > 0">
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Place</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{user.userId}}</td>
            <td>{{user.username}}</td>
            <td>{{user.userphone}}</td>
            <td>{{user.userplace}}</td>
            <td>
              <button class="btn btn-sm btn-warning mr-2" (click)="editUser(user.userId)">
                Edit
              </button>
              <button class="btn btn-sm btn-danger" (click)="deleteUser(user.userId)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Users Message -->
    <div *ngIf="!isLoading && users.length === 0" class="text-center mt-4">
      <p class="text-muted">No users found</p>
    </div>
  </div>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    
    .input-group .btn {
      margin-left: 5px;
    }
    
    .table-responsive {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
    }

    .btn-sm {
      padding: 0.25rem 0.5rem;
    }
    
    @media (max-width: 768px) {
      .input-group {
        flex-direction: column;
      }
      
      .input-group > * {
        margin: 5px 0;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  users: User[] = [];
  isSearchActive: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to load users';
      }
    });
  }

  searchUser() {
    if (!this.searchTerm.trim()) {
      this.loadAllUsers();
      return;
    }

    this.isLoading = true;
    this.isSearchActive = true;
    this.userService.getUserById(this.searchTerm).subscribe({
      next: (user) => {
        this.users = [user];
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'User not found';
        this.users = [];
      }
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.isSearchActive = false;
    this.loadAllUsers();
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isLoading = true;
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadAllUsers();
          this.errorMessage = '';
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to delete user';
        }
      });
    }
  }

  editUser(userId: string) {
    this.router.navigate(['/edit-user', userId]);
  }

  addNewUser() {
    this.router.navigate(['/add-user']);
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  
  
  }
}