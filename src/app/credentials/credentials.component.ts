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

  public showRegisterForm: boolean = false;

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

  public registerForm = new FormGroup({
    registerEmailControl:new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(6),
        Validators.pattern(this.emailRegexpPatern)],
      //updateOn: 'blur'
    }),

    registerPwdControl: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegexpPatter)],
      //updateOn: 'blur'
    }),
    registerPwdConfirmControl: new FormControl(''),
  });

  public showRegisterPassword: boolean = false;


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

  public onRegisterSubmit():void {
    console.log('submitting');
    console.log(this.registerForm.get('registerEmailControl').errors);
  }

  public showHideLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  public showHideRegisterPassword(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  public getCredentialsFieldType(loginOrRegister: string): string {
    return this['show' + loginOrRegister.charAt(0).toUpperCase() + loginOrRegister.slice(1)+'Password']
      ? 'text' : 'password' ;
  }

  public getFormControlErrors(formControlName: string): Array<string> {
    let errors: ValidationErrors = this.showRegisterForm ?
      this.registerForm.get(formControlName).errors : this.loginForm.get(formControlName).errors;
    if (!errors){
      return [];
    }
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
          errorMessage = formControlName.endsWith('EmailControl')
            ? 'An email address has the following format: name@domain.com'
            : "You need numbers, uppercase, lowercase and special characters";
          break;
        case 'required':
          errorMessage = 'This field is required';
      }
      return errorMessage;
    })
  }

  public getNotice(): Array<string> {
    return this.showRegisterForm
      ? ["Already have an account? ", "Login here"]
      : ["Don't have an account? ", "Register here"];
  }

  public switchBetweenLoginAndRegister(): void {
    this.showRegisterForm = !this.showRegisterForm;
  }
}
