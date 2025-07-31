import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailconfirmationComponent } from './emailconfirmation.component';

describe('LoginComponent', () => {
  let component: EmailconfirmationComponent;
  let fixture: ComponentFixture<EmailconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailconfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
