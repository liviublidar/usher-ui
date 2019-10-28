import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidationErrors,
} from "@angular/forms";

@Component({
  selector: 'credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  private emailRegexpPatern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private passwordRegexpPatter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  public loginForm = new FormGroup({
    loginEmailControl:new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(6),
      Validators.pattern(this.emailRegexpPatern)],
      //updateOn: 'blur'
    }),

    loginPwdControl: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegexpPatter)],
      //updateOn: 'blur'
    }),

    loginPwdConfirmControl: new FormControl(''),
  });

  public showLoginPassword: boolean = false;

  public clearLogin():void {
    console.log(this.loginForm.value);
    this.loginForm.setValue({
      loginEmailControl: 'sdasdasdasdas',
      loginPwdControl: 'asdadas'
    });
    //this.loginForm.setValue('');
  }

  public onLoginSubmit():void {
    console.log('submitting');
    console.log(this.loginForm.get('loginEmailControl').errors);
  }

  public showHideLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  public getCredentialsFieldType(loginOrRegister: string): string {
    return this['show' + loginOrRegister.charAt(0).toUpperCase() + loginOrRegister.slice(1)+'Password']
      ? 'text' : 'password' ;
  }

  public getFormControlErrors(formControlName: string): Array<string> {
    let errors: ValidationErrors = this.loginForm.get(formControlName).errors;
    if (!errors){
      return [];
    }
    console.log(errors);
    return Object.keys(errors).map((iterableItem) => {
      let errorMessage: string;
      switch (iterableItem) {
        case 'email':
          errorMessage = 'You need a valid email address';
          break;
        case 'minlength':
          errorMessage = `You need at least ${errors.minlength.requiredLength} characters`;
          break;
        case 'pattern':
          errorMessage = formControlName === 'loginEmailControl'
            ? 'You didn\'t match the required format'
            : "You need numbers, uppercase, lowercase and special characters";
          break;
        case 'required':
          errorMessage = 'This field is required'
      }
      return errorMessage;
    })
  }
}
