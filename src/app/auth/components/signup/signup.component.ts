import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SignupRequestInterface } from './../../types/signupRequest.interface';
import { signupAction } from './../../store/actions/signup.action';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import {
  validationErrorsSelector,
  isSubmittingSelector,
  currentUserSelector,
} from './../../store/selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public user$: Observable<CurrentUserInterface | null>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

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
    this.user$ = this.store.pipe(select(currentUserSelector));
  }
  subscribe() {
    this.user$.subscribe((r) => alert(r?.email));
    this.backendErrors$.subscribe((r) => console.log(r));
  }
  onSubmit() {
    const request: SignupRequestInterface = this.form.value;
    // TODO check password equal
    this.store.dispatch(signupAction({ request }));
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
