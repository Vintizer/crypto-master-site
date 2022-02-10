import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './page/header/header.component';
import { FooterComponent } from './page/footer/footer.component';
import { ContentComponent } from './page/content/content.component';
import { PageComponent } from './page/page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingsComponent } from './page/content/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignalsComponent } from './page/content/signals/signals.component';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'my',
    component: PageComponent,
  },
  { path: '', redirectTo: '/my', pathMatch: 'full' },
  // { path: '**', redirectTo: '/auth/signup' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    PageComponent,
    SettingsComponent,
    SignalsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AuthModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
