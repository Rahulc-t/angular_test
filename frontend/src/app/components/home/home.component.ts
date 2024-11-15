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
  templateUrl:'./home.component.html',
  styles: []
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