import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { LoginRequestInterface } from './../../types/loginRequest.interface';
import { loginAction } from './../../store/actions/login.action';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import {
  validationErrorsSelector,
  isSubmittingSelector,
} from './../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public isLoggedIn$: Observable<boolean | null>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    this.subscribe();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  subscribe() {
    this.isLoggedIn$.subscribe((isLogged) => {
      if (isLogged) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    const request: LoginRequestInterface = this.form.value;
    this.store.dispatch(loginAction({ request }));
  }
}
