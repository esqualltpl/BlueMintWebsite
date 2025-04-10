import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
// server-prerender.ts or app.server.ts

export function getPrerenderParams() {
  return [
    { email: 'user1@example.com' },
    { email: 'user2@example.com' },
    { email: 'user3@example.com' },
    // Add more dynamic emails or fetch them from an API or database
  ];
}
