import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent implements OnInit {
  public forgetForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: [''],
    });
  }
  forget() {
    this.http
      .post(`${environment.apiUrl}/reset`, this.forgetForm.value)
      .subscribe(
        (res) => {
          this.forgetForm.reset();
          this.router.navigate(['login']);
        },
        (error) => console.log(error)
      );
  }
}
