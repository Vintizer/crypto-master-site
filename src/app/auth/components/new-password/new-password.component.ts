import { Observable } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { newPasswordAction } from '../../store/actions/newPassword.action';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { NewPasswordInterface } from '../../types/newPassword.interface';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
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
    const request: NewPasswordInterface = this.form.value;
    console.log('this.form.value: ', this.form.value);
    console.log('request: ', request);
    this.store.dispatch(newPasswordAction({ request }));
  }
  subscribe() {
    this.isLoggedIn$.subscribe((isLogged) => {
      if (isLogged) {
        this.router.navigate(['/']);
      }
    });
  }
}
