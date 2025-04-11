import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'twofactorauthentication/:email',
    renderMode: RenderMode.Server // or RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
