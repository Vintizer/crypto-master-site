import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit {
  public signalForm!: FormGroup;
  public pairs: string[];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.pairs = ['btc/usdt', 'people/usdt', 'bnb/usdt'];
  }

  ngOnInit(): void {
    this.signalForm = this.formBuilder.group({
      price: [''],
      tp: [''],
      sl: [''],
      pair: [''],
    });
  }
  sendSignal() {
    console.log(this.signalForm.value);
  }
}
