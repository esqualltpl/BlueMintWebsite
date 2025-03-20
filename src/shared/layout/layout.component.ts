import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,  // ✅ Mark it as standalone
  imports: [CommonModule, RouterModule], // ✅ Required modules
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {}
