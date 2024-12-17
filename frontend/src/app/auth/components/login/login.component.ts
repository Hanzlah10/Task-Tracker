import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { selectCurrentUser, selectValidationMessage } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private store: Store) { }

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })


  onSubmit() {
    this.store.dispatch(AuthActions.login(this.loginForm.getRawValue()))
  }

}
