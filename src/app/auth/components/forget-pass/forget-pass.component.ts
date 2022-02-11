import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ForgetPasswordInterface } from '../../types/forgetPassword.interface';
import { forgetPasswordAction } from '../../store/actions/forgetPassword.action';
import { isSubmittingSelector } from '../../store/selectors';
import { validationErrorsSelector } from './../../store/selectors';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent implements OnInit {
  public form: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: [''],
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const request: ForgetPasswordInterface = this.form.value;
    console.log('this.form.value: ', this.form.value);
    console.log('request: ', request);
    this.store.dispatch(forgetPasswordAction({ request }));
  }

  // forgetPassword() {
  //   this.http.post(`${environment.apiUrl}/reset`, this.form.value).subscribe(
  //     (res) => {
  //       this.form.reset();
  //       this.router.navigate(['login']);
  //     },
  //     (error) => console.log(error)
  //   );
  // }
}
