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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('scrollItem') scrollElements!: QueryList<ElementRef>;

  constructor(private cdRef: ChangeDetectorRef) {}

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
