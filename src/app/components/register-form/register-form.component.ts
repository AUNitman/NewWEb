import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IRegisterForm } from '../../services/interfaces';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  myForm: FormGroup;
  password: string = '';
  username: string = '';
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.myForm = this.formBuilder.group({
      username: [
        this.username,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      password: [this.password, [Validators.required, Validators.minLength(8)]],
      email: [this.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.myForm);
    const form: IRegisterForm = {
      email: this.myForm.controls['email'].value,
      username: this.username,
      password: this.password,
    };

    this.authService.register(form);
  }

  enterPassword(event: any) {
    const inputValue = event.target.value;
    const pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (pattern.test(inputValue)) {
      this.myForm.patchValue({
        password: inputValue,
      });
      this.password = inputValue;
      return;
    }

    this.myForm.patchValue({ password: this.password });
  }

  enterUsername(event: any) {
    const inputValue: string = event.target.value;
    const pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (pattern.test(inputValue) && inputValue.length <= 32) {
      this.myForm.patchValue({
        username: inputValue,
      });
      this.username = inputValue;
      return;
    }

    this.myForm.patchValue({ username: this.username });
  }
}
