import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  public newPasswordForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: [''],
      copyPassword: [''],
    });
  }
  newPassword() {
    // TODO validate
    this.http
      .post(`${environment.apiUrl}/newPassword`, this.newPasswordForm.value)
      .subscribe(
        (res) => {
          this.newPasswordForm.reset();
          this.router.navigate(['login']);
        },
        (error) => console.log(error)
      );
  }
}
