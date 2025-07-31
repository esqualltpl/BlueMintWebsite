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
  selector: 'app-emailconfirmation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './emailconfirmation.component.html',
  styleUrl: './emailconfirmation.component.css'
})
export class EmailconfirmationComponent {
  isSuccess = false;
  isSubmit = false;
  email!: string;

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
      this.email = params.get('email') || '';
  
      this.loginForm = this.fb.group({
        code: ['', [Validators.required, Validators.minLength(6)]],
        email: [this.email]
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

    this.httpService.post<ApiResponse<any>>(this.commonService.apiEndPoints.Emailconfirmation, this.loginForm.value)
      .subscribe(
        (response) => {
          console.log(response)
          this.loader.hide();
          if (response.token!=null && response.token != '' ) {
            this.isSuccess = true;
            this.isError = false;
            //localStorage.setItem('userToken', response.data.token);
           // this.router.navigate(['/dashboard']);
            window.location.href =this.urlredirect+ '/Account/Login/' + response.id+"/"+ response.token;
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
