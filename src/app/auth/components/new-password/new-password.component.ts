import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { Observable } from 'rxjs';
import {
  validationErrorsSelector,
  isSubmittingSelector,
} from './../../store/selectors';
import { NewPasswordInterface } from './../../types/newPassword.interface';
import { newPasswordAction } from './../../store/actions/newPassword.action';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  public form: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
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
  }

  onSubmit() {
    const request: NewPasswordInterface = this.form.value;
    console.log('this.form.value: ', this.form.value);
    console.log('request: ', request);
    this.store.dispatch(newPasswordAction({ request }));
  }
}
