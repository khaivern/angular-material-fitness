import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  maxDate: null | Date;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();

    this.maxDate = new Date();
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
  }

  private initForm() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      birthdate: new FormControl(null, Validators.required),
      terms: new FormControl(false),
    });
  }

  onSubmit() {
    this.authService.registerUser(this.signupForm.value);
  }
}
