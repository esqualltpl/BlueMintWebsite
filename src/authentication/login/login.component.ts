import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http-service';
import { CommonService } from '../../shared/services/common-service';
import { ApiResponse } from '../../shared/interfaces/response';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from "../../environments/environment.prod";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSuccess = false;
  isSubmit = false;

  isError = false;
  errorMessage = "";
  urlredirect=environment.redirectUrl
  successMessage: string="";

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loader: NgxSpinnerService,
    private httpService: HttpService,
    public commonService: CommonService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
      if (this.isMobileDevice()) {
    this.isError = true;
    this.errorMessage = "Login is only allowed from desktop devices.";
    return;
  }
    this.loader.show();
    //window.open(this.urlredirect + '/Account/Login/', '_blank');
    this.isSubmit=true;

    this.httpService.post<ApiResponse<any>>(this.commonService.apiEndPoints.Login, this.loginForm.value)
      .subscribe(
        (response) => {
          console.log(response)
          this.loader.hide();
          if (response.token!=null && response.token != '' ) {

            if(response.twoFactorEnabled==true)
            {
              this.router.navigate(['/twofactorauthentication', this.loginForm.value.email]);
             return;
            }
            this.isSuccess = true;
            this.isError = false;
            //localStorage.setItem('userToken', response.data.token);
           // this.router.navigate(['/dashboard']);
            window.location.href =this.urlredirect+ '/Account/Login/' + response.id+"/"+ response.token;
            this.isSubmit=false;

          } else {
            this.isError = true;
            this.isSubmit=false;
            this.errorMessage = "Invalid email or password.";
          }
        },
        (error) => {
          this.loader.hide();
          this.isError = true;
          this.isSubmit=false;

          this.errorMessage = "An error occurred. Please try again.";
        }
      );
  }
  isMobileDevice(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Check for mobile or tablet identifiers in user agent
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

}
