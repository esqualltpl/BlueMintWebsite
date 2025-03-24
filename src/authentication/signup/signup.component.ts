import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule for ngModel

@Component({
  selector: 'app-signup',
  imports: [NgIf, FormsModule], // ✅ Import FormsModule here

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  selectedType: string = 'Adviser'; // Default selection

}
