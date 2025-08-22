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
  selector: 'app-staffsignup',
  standalone: true,

  imports: [NgIf, FormsModule,CommonModule,ReactiveFormsModule], 

  templateUrl: './staffsignup.component.html',
  styleUrl: './staffsignup.component.css'
})
export class StaffsignupComponent {
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
  email: new FormControl('', [Validators.required, Validators.email]),

  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    // at least 1 lower, 1 upper, 1 digit, 1 special
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%^&*()_+\-=[\]{};':"\\|,.<>/?@]).+$/)
  ]),
  confirmpassword: new FormControl('', Validators.required),

  Role: new FormControl('Financial Advisor'),
  type: new FormControl(),
});
get f() { return this.signupForm.controls; }

ngOnInit() {
  // auto-check mismatch without custom validator
  this.signupForm.get('confirmpassword')?.valueChanges.subscribe(val => {
    if (val && this.f['password'].value !== val) {
      this.f['confirmpassword'].setErrors({ passwordMismatch: true });
    } else {
      if (this.f['confirmpassword'].hasError('passwordMismatch')) {
        this.f['confirmpassword'].setErrors(null);
      }
    }
  });
}


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
    const url = `${this.commonService.apiEndPoints.Getstaff}?id=${id}`;
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
   
    this.signupForm.get('id')?.setValue(this.id);
    this.isSubmit=true;
    this.loader.show();
    this.httpService.post<ApiResponse<any>>(this.commonService.apiEndPoints.Staffregister, this.signupForm.value)
      .subscribe(
        (response) => {
          console.log(response)
          this.loader.hide();
          if (response.status === 'success') {
            this.isSuccess = true;
            this.isError = false;
            this.successMessage = response.message || 'Successfully registered! Please check your email to confirm.';

            setTimeout(() => {
              window.location.href ='/emailconfirm/' + response.data;
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
