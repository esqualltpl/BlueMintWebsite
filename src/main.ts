import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpService } from './shared/services/http-service';  // Ensure the HttpService is imported

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // Make sure HttpClient is provided
    HttpService           // Add your HttpService as a provider
  ]
}).catch(err => console.error(err));
