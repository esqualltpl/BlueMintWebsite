import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http-service';  // Import HttpService
import { CommonService } from '../../shared/services/common-service';
import { ApiResponse } from '../../shared/interfaces/response';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { environment } from "../../environments/environment.prod";

@Component({
  selector: 'app-signup',
  standalone: true,

  imports: [NgIf, FormsModule,CommonModule,ReactiveFormsModule], 

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isNightMode = false;
  isValid = true;
  urlredirect=environment.apiUrl
  isSuccess: boolean = false;
  isError: boolean = false;
  successMessage: string="";
  signupForm: FormGroup = new FormGroup({
    BusinessName: new FormControl('', Validators.required),
    FirstName: new FormControl('', Validators.required),

    LastName: new FormControl('', Validators.required),

    email: new FormControl('', Validators.required),

    password: new FormControl('', Validators.required),
    Role:new FormControl("Financial Advisor")
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loader: NgxSpinnerService,
    private httpService: HttpService,  // Inject HttpService here
    public commonService: CommonService
  ) {}

  signup() {
    console.log(this.signupForm.value);
    
    // Mark all controls as touched to trigger validation messages
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loader.show();
    this.httpService.post<ApiResponse<any>>(this.commonService.apiEndPoints.Register, this.signupForm.value)
      .subscribe(
        (response) => {
          console.log(response)
          this.loader.hide();
          if (response.status === 'success') {
            this.isSuccess = true;
            this.isError = false;
            this.successMessage = response.message || 'Successfully registered! Please check your email to confirm.';

            setTimeout(() => {
              window.location.href =this.urlredirect+ '/Account/RegisterConfirmation/' + response.data;
            }, 2000);
          } else {
            this.isError = true;
            this.isSuccess = false;
          }
        },
        (error) => {
          this.loader.hide();
          this.isError = true;
          this.isSuccess = false;
        }
      );
  }
}
