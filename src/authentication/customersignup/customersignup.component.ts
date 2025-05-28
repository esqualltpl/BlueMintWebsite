import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared/services/http-service';  // Import HttpService
import { CommonService } from '../../shared/services/common-service';
import { ApiResponse } from '../../shared/interfaces/response';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { environment } from "../../environments/environment.prod";

@Component({
  selector: 'app-customersignup',
  standalone: true,

  imports: [NgIf, FormsModule,CommonModule,ReactiveFormsModule], 

  templateUrl: './customersignup.component.html',
  styleUrl: './customersignup.component.css'
})
export class CustomersignupComponent {
  isNightMode = false;
  isSubmit=false;
  id!: number;
  isValid = true;
  urlredirect=environment.redirectUrl
  isSuccess: boolean = false;
  isError: boolean = false;
  successMessage: string="";
  errorMessage:string="";
  signupForm: FormGroup = new FormGroup({

    id: new FormControl(''),

    email: new FormControl('', Validators.required),

    password: new FormControl('', Validators.required),
    Role:new FormControl("Client")
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loader: NgxSpinnerService,
    private httpService: HttpService,  // Inject HttpService here
    public commonService: CommonService,
        private route: ActivatedRoute

  ) {
    this.route.paramMap.subscribe(params => {
            const idParam = params.get('id');

     if (idParam) {
        this.id = +idParam; // convert to number
        this.getCustomerData(this.id); // call the API to get customer data
      }

    });
  }
getCustomerData(id: number) {
    this.loader.show();
    const url = `${this.commonService.apiEndPoints.Getcustomer}?id=${id}`;
    this.httpService.get<ApiResponse<any>>(url).subscribe(
      (response) => {
        this.loader.hide();
        console.log(response);
        if (response.status === 'success' && response.data) {
          this.signupForm.patchValue({
            id: this.id,
            email: response.data.email // patch email
          });
        } else {
          this.isError = true;
                  this.errorMessage="Invalid link";
        }
      },
      (error) => {
        this.loader.hide();
        this.isError = true;
        this.errorMessage="Invalid link";

        //console.error('Error fetching customer data:', error);
      }
    );
  }
  signup() {
    console.log(this.signupForm.value);
      if (this.isMobileDevice()) {
    this.isError = true;
    this.errorMessage = "Login is only allowed from desktop devices.";
    return;
  }
    // Mark all controls as touched to trigger validation messages
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.signupForm.get('id')?.setValue(this.id);
    this.isSubmit=true;
    this.loader.show();
    this.httpService.post<ApiResponse<any>>(this.commonService.apiEndPoints.Customerregister, this.signupForm.value)
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
              this.isSubmit=false;
   
            },500);
          } else {
            this.isError = true;
            this.isSuccess = false;
                          this.isSubmit=false;
            this.errorMessage=response.message;
          }
        },
        (error) => {
          this.loader.hide();
          this.isError = true;
          this.isSuccess = false;
          this.errorMessage=error;
              this.isSubmit=false;

        }
      );
  }
  isMobileDevice(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Check for mobile or tablet identifiers in user agent
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}
}
