import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared/services/http-service';
import { CommonService } from '../../shared/services/common-service';
import { ApiResponse } from '../../shared/interfaces/response';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from "../../environments/environment.prod";

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  isSuccess = false;
  isSubmit = false;
  code!: string;

  isError = false;
  errorMessage = "";
  urlredirect=environment.redirectUrl
  successMessage: string="";

  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loader: NgxSpinnerService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    public commonService: CommonService
  ) {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code') || '';
  
      this.loginForm = this.fb.group({
         code: [this.code],
         email: ['', [Validators.required]],
         password: ['', [Validators.required]],


      });
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loader.show();
    //window.open(this.urlredirect + '/Account/Login/', '_blank');
    this.isSubmit=true;

    this.httpService.post<ApiResponse<any>>(this.commonService.apiEndPoints.Resetpassword, this.loginForm.value)
      .subscribe(
        (response) => {
          console.log(response)
          this.loader.hide();
         if (response.status=="success" ) {
            this.isSuccess = true;
            this.isError = false;
            this.successMessage=response.message;
            //localStorage.setItem('userToken', response.data.token);
           // this.router.navigate(['/dashboard']);
            //window.location.href =this.urlredirect+ '/Account/Login/' + response.id+"/"+ response.token;
            this.isSubmit=false;

          } else {
            this.isError = true;
            this.isSubmit=false;
            this.errorMessage = "Invalid Information.";
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
}
