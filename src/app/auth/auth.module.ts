import { ForgetPassComponent } from 'src/app/auth/components/forget-pass/forget-pass.component';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { NewPasswordComponent } from 'src/app/auth/components/new-password/new-password.component';
import { SignupComponent } from 'src/app/auth/components/signup/signup.component';
import { GetCurrentUserEffect } from 'src/app/auth/store/effects/getCurrentUser.effect';
import { LoginEffect } from 'src/app/auth/store/effects/login.effect';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { reducers } from 'src/app/auth/store/reducers';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget', component: ForgetPassComponent },
  { path: 'newpassword', component: NewPasswordComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgetPassComponent,
    NewPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
    ]),
  ],
})
export class AuthModule {}
