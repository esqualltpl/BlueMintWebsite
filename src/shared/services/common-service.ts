import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Router } from '@angular/router';
import { ApiResponse, ApiResponseArray, ListeningParameter } from '../interfaces/response';
import { AppRoutes } from '../routes/AppRoutes';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEndPoints } from '../routes/ApiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiEndPoints = ApiEndPoints;
  listeningParameter: ListeningParameter = {} as ListeningParameter;
  _defaultSkip = 1;
  _defaultTake = 10;

  appRoutes = AppRoutes;

  constructor(public routerService: Router, public spinnerService: NgxSpinnerService, public httpService: HttpService) {}

  Update<T>(apiUrl: string, id: any, data: any, navigateUrl?: string | null): Promise<ApiResponse<T>> {
    this.spinnerService.show();

    return new Promise<ApiResponse<T>>((resolve, reject) => {
        this.httpService.put<ApiResponse<T>>(apiUrl, data).subscribe(response => {
            if (response.data) {
                if (response.success === true) {
                    // Remove Toast notifications
                    // this.toasterService.success("", "Data Updated Successfully");
                    if (navigateUrl) {
                        this.routerService.navigate([navigateUrl]);
                    }
                    resolve(response);
                } else {
                    // Remove Toast notifications
                    // this.toasterService.error("", "Data Update Failed");
                    reject(new Error("Data Update Failed"));
                }
            } else {
                reject(new Error("No data in response"));
            }
        }, error => {
            // Handle error case
            this.spinnerService.hide();
            reject(error);
        });

        this.spinnerService.hide();
    });
}


  Delete<T>(apiUrl: string, id: any, navigateUrl?: string | null): Promise<ApiResponse<T>> {
    this.spinnerService.show();

    return new Promise<ApiResponse<T>>((resolve, reject) => {
      this.httpService.delete<ApiResponse<T>>(apiUrl).subscribe(
        response => {
          this.spinnerService.hide();
          // Remove Toast notifications
          // this.toasterService.success("", "Data Deleted Successfully");
          resolve(response);
        },
        error => {
          this.spinnerService.hide();
          // Remove Toast notifications
          // this.toasterService.error("", "Data Deletion Failed");
          reject(error);
        }
      );
    });
  }

  Add<T>(apiUrl: string, data: any, navigateUrl?: string | null): ApiResponse<T> {
    this.spinnerService.show();
    this.httpService.post<ApiResponse<T>>(apiUrl, data).subscribe(response => {
      if (response.data) {
        if (response.success === true) {
          // Remove Toast notifications
          // this.toasterService.success("", "Data Saved Successfully");
          this.spinnerService.hide();
          this.routerService.navigate([navigateUrl]);
        } else {
          this.spinnerService.hide();
          // Remove Toast notifications
          // this.toasterService.error("", "Data Saving Failed");
        }
      }
    });
    return {} as ApiResponse<T>;
  }

  // You can leave other methods unchanged if they don't rely on `ToastrService`.
}
