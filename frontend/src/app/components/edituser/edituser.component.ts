import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService, User } from '../services/crud.service';

@Component({
  selector: 'app-edit-user',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userId!: string; 

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editUserForm = this.formBuilder.group({
      userId: [{ value: '', disabled: true }], 
      username: ['', Validators.required],
      userphone: ['', Validators.required], 
      userplace: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadUserDetails();
  }

  private loadUserDetails(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.editUserForm.patchValue({
          userId: user.userId,
          username: user.username,
          userphone: user.userphone,
          userplace: user.userplace
        });
      },
      error: (err) => {
        console.error('Error loading user details:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const updatedUserData: Partial<User> = {
        username: this.editUserForm.get('username')?.value,
        userphone: this.editUserForm.get('userphone')?.value,
        userplace: this.editUserForm.get('userplace')?.value
      };

      this.userService.updateUser(this.userId, updatedUserData).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    }
  }

  onReset(): void {
    this.loadUserDetails(); 
  }
}
