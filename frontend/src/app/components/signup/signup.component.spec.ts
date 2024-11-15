import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    // Initialize the signup form with form controls and validators
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Method to check if passwords match
  passwordsMatch(): boolean {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.signupForm.valid && this.passwordsMatch()) {
      console.log('Form Data:', this.signupForm.value);
      // Logic for actual sign-up functionality (e.g., API call)
    } else {
      console.log('Form is invalid or passwords do not match.');
    }
  }
}
