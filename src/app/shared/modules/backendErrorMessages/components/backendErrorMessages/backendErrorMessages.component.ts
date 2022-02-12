import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.components.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface | null;

  errorMessages: string[];

  ngOnInit(): void {
    const errors: BackendErrorsInterface | null = this.backendErrorsProps;
    console.log('errors: ', errors);
    if (errors != null) {
      console.log('Object.keys(errors): ', Object.keys(errors));
      this.errorMessages = Object.keys(errors).map((name: string) => {
        console.log('errors[name]: ', errors[name]);
        const messages = errors[name];
        return `${messages}`;
      });
    }
  }
}
