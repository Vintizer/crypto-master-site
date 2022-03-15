import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MatExpansionModule } from '@angular/material/expansion';
import { StoreModule } from '@ngrx/store';
import { MatRadioModule } from '@angular/material/radio';
import { AuthGuard } from '../shared/guards/auth.guard';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageComponent } from './components/page/page.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignalsComponent } from './components/signals/signals.component';
import { OrderTableComponent } from './components/order-table/order-table.component';

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
    OrderTableComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatToolbarModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatRadioModule,
    MatIconModule,
    CommonModule,
    BackendErrorMessagesModule,
  ],
})
export class PageModule {}
