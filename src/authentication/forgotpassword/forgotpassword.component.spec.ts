import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorauthenticationComponent } from './twofactorauthentication.component';

describe('LoginComponent', () => {
  let component: TwofactorauthenticationComponent;
  let fixture: ComponentFixture<TwofactorauthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwofactorauthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwofactorauthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
