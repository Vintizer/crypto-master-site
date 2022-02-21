import { PersistanceService } from 'src/app//shared/services/persistance.service';
import { ForgetPassComponent } from 'src/app/auth/components/forget-pass/forget-pass.component';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { NewPasswordComponent } from 'src/app/auth/components/new-password/new-password.component';
import { SignupComponent } from 'src/app/auth/components/signup/signup.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { reducers } from 'src/app/auth/store/reducers';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { ForgetPasswordEffect } from './store/effects/forgetPassword.effect';
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { GetTradersListEffect } from './store/effects/getTradersList.effect';
import { LoginEffect } from './store/effects/login.effect';
import { LogoutEffect } from './store/effects/logout.effect';
import { MakeTraderEffect } from './store/effects/makeTrader.effect';
import { NewApiEffect } from './store/effects/newApi.effect';
import { NewPasswordEffect } from './store/effects/newPassword.effect';
import { NewSignalEffect } from './store/effects/newSignal.effect';
import { SignupEffect } from './store/effects/signup.effect';
import { SubscribeTraderEffect } from './store/effects/subscribeTrader.effect';
import { UnSubscribeTraderEffect } from './store/effects/unSubscribeTrader.effect';
import { UpdateFeeEffect } from './store/effects/updateFee.effect';

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
      ForgetPasswordEffect,
      LoginEffect,
      NewPasswordEffect,
      SubscribeTraderEffect,
      NewSignalEffect,
      SignupEffect,
      GetCurrentUserEffect,
      LogoutEffect,
      GetTradersListEffect,
      UnSubscribeTraderEffect,
      NewApiEffect,
      UpdateFeeEffect,
      MakeTraderEffect,
    ]),
    BackendErrorMessagesModule,
  ],

  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
