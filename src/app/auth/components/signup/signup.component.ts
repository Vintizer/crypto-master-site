import { Observable } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import {
  signupAction,
  signupFailureAction,
} from '../../store/actions/signup.action';
import {
  currentUserSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { SignupRequestInterface } from '../../types/signupRequest.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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
      email: ['', [Validators.required]],
      password: [''],
      copyPassword: [''],
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
  onSubmit() {
    const request: SignupRequestInterface = this.form.value;
    if (this.form.value.password !== this.form.value.copyPassword) {
      this.store.dispatch(
        signupFailureAction({ errors: { message: ['Password are not equal'] } })
      );
    } else {
      this.store.dispatch(signupAction({ request }));
    }
  }

  subscribe() {
    this.isLoggedIn$.subscribe((isLogged) => {
      if (isLogged) {
        this.router.navigate(['/']);
      }
    });
  }
  // signUp() {
  //   // TODO validate
  //   this.http
  //     .post(`${environment.apiUrl}/auth/registration`, this.signupForm.value)
  //     .subscribe(
  //       (res) => {
  //         this.signupForm.reset();
  //         this.router.navigate(['login']);
  //       },
  //       (error) => console.log(error)
  //     );
  // }
}
