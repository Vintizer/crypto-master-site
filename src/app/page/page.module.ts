import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { AuthGuard } from './../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: PageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [PageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PageModule {}
