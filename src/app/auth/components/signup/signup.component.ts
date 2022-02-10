import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: [''],
      copyPassword: [''],
    });
  }
  signUp() {
    console.log('this.signupForm: ', this.signupForm);
    // TODO validate
    this.http
      .post(`${environment.apiUrl}/auth/registration`, this.signupForm.value)
      .subscribe(
        (res) => {
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        (error) => console.log(error)
      );
  }
}
