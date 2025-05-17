import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'twofactorauthentication/:email',
    renderMode: RenderMode.Server // or RenderMode.Client
  },
   {
    path: 'resetpassword/:code',
    renderMode: RenderMode.Server // or RenderMode.Client
  },
   {
    path: 'customersignup/:id',
    renderMode: RenderMode.Server // or RenderMode.Client
  },
  
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
