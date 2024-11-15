import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { UserService, User } from '../services/crud.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AddUserComponent {
  addUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addUserForm = this.formBuilder.group({
      userId: ['', Validators.required],
      username: ['', Validators.required],
      userphone: ['', Validators.required],
      userplace: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const newUser: User = this.addUserForm.value;
      this.userService.addUser(newUser).subscribe({
        next: () => {
          console.log('User added successfully');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error adding user:', error);
        }
      });
    }
  }
}