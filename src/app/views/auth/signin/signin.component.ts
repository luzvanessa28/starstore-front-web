import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { REGEX } from 'src/app/shared/constants/regex';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});
  messageError: string = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.validators();
  }

  ngOnInit(): void {
  }

  login() {

    this.authService.login(this.myForm.value)
      .subscribe(
        (response: any) => {
          localStorage.setItem("accessToken", response.access_token);
          this.route.navigate(["admin"]);//Esto se utiliza para navegar a la ruta admin
        },
        () => {
          this.messageError = "Sus credenciales son incorrectas";
        }
      );
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email

      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(REGEX.password)
      ]]
    });
  }
}

