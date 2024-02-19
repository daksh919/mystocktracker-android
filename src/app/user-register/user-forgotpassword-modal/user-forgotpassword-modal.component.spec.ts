import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgotpasswordModalComponent } from './user-forgotpassword-modal.component';

describe('UserForgotpasswordModalComponent', () => {
  let component: UserForgotpasswordModalComponent;
  let fixture: ComponentFixture<UserForgotpasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserForgotpasswordModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserForgotpasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
