import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AuthGuard } from '../shared/guards/auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageComponent } from './components/page/page.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignalsComponent } from './components/signals/signals.component';
import { LogoutEffect } from './store/effects/logout.effect';

const routes: Routes = [
  { path: '', component: PageComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'signals', component: SignalsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    SignalsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    EffectsModule.forFeature([LogoutEffect]),
  ],
})
export class PageModule {}
