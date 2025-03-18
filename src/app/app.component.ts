import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, MenubarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Bluemint';

  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: ['/'] },
  ];
}