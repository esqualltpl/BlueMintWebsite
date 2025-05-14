import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http-service';
import { CommonService } from '../../shared/services/common-service';
import { ApiResponse } from '../../shared/interfaces/response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('scrollItem') scrollElements!: QueryList<ElementRef>;
  supportform: FormGroup;
  errorMessage = "";
  isSubmit = false;
  successMessage: string="";
  isSuccess=false;
  isError=false;

  constructor(private cdRef: ChangeDetectorRef,private fb: FormBuilder,
      private httpService: HttpService,
      public commonService: CommonService)  {
    this.supportform = this.fb.group({
      fullname: ['', [Validators.required]],
      company: ['', [Validators.required]],
      contactnumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
support() {
    if (this.supportform.invalid) {
      this.supportform.markAllAsTouched();
      return;
    }
   
    this.isSubmit=true;
    this.httpService.post<ApiResponse<any>>(this.commonService.apiEndPoints.Support, this.supportform.value)
      .subscribe(
        (response) => {
          console.log(response)
          if (response.status=="success" ) {
            this.isSuccess=true;
          this.supportform.reset({
            email: '',
            company: '',
            fullname: '',
            contactnumber: ''
          });

this.isSubmit=false;
            this.successMessage = "Your request has been send successfully.";
          }
        },
        (error) => {
          this.isError=true;
          this.isSubmit=false;
          this.errorMessage = "An error occurred. Please try again.";
        }
      );
  }
  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollElements.forEach((el) => {
      const rect = el.nativeElement.getBoundingClientRect?.();
      if (rect && rect.top < window.innerHeight - 100) {
        el.nativeElement.classList.add('visible');
      }
    });
  }

  ngAfterViewInit() {
    // Defer execution to ensure view is fully loaded
    setTimeout(() => {
      const elements = this.scrollElements.toArray();
      if (elements.length > 0) {
        elements[0].nativeElement.classList.add('visible');
      }
      this.onScroll();
      this.cdRef.detectChanges();
    }, 100);
  }
}
