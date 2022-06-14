import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  checkValidity(fieldName: string) {
    return (
      !this.loginForm.get(fieldName).valid &&
      this.loginForm.get(fieldName).touched
    );
  }

  handleHelperTexts(fieldName: string) {
    let helperText = 'Form is invalid';
    const formattedFieldName = fieldName[0].toUpperCase() + fieldName.slice(1);
    let error: string = null;
    for (const key in this.loginForm.get(fieldName).errors) {
      error = key;
      break;
    }

    switch (error) {
      case 'required':
        helperText = formattedFieldName + ' cannot be empty';
        break;
      case 'email':
        helperText = formattedFieldName + ' is not in the right format';
        break;
      case 'minlength':
        helperText = formattedFieldName + ' must be at least 4 chars long';
        break;
    }

    return helperText;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
