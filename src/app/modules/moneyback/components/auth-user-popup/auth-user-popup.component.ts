import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-auth-user-popup',
  templateUrl: './auth-user-popup.component.html',
  styleUrls: ['./auth-user-popup.component.scss'],
})
export class AuthUserPopupComponent implements OnInit {
  userForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    },
    {
      validators: this.comparePasswords('password', 'password2'),
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  createUser() {
    let user = this.userForm.value;
    if (this.userForm.valid) {
      this.authService
        .createUser(user.username, user.password, this.data.id)
        .subscribe(console.log);
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  comparePasswords(field: string, field2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get(field)?.value;
      const pass2 = control.get(field2)?.value;

      if (pass1 !== pass2) {
        control.get(field2)?.setErrors({ compare: true });
        return { compare: true };
      }

      control.get(field2)?.setErrors(null);
      return null;
    };
  }
}
