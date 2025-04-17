import { Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { LoginComponent } from '../authentication/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { SignupComponent } from '../authentication/signup/signup.component';
import { TwofactorauthenticationComponent } from '../authentication/twofactorauthentication/twofactorauthentication.component';
import { CookiepolicyComponent } from '../pages/footers/cookiepolicy/cookiepolicy.component';
import { PrivacypolicyComponent } from '../pages/footers/privacypolicy/privacypolicy.component';
import { TermsofuseComponent } from '../pages/footers/termsofuse/termsofuse.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Wrap routes with Layout
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // ✅ Add pathMatch: 'full'
      { path: 'home', component: HomeComponent }, // ✅ Ensure 'home' is a valid route
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'twofactorauthentication/:email', component: TwofactorauthenticationComponent },
      { path: 'cookiepolicy', component: CookiepolicyComponent },
      { path: 'privacypolicy', component: PrivacypolicyComponent },
      { path: 'termsofuse', component: TermsofuseComponent },

    ]
  }
];
