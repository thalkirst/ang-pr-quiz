import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizeditorComponent } from './pages/quizeditor/quizeditor.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },

  {
    path: 'quiz/:id',
    component: QuizeditorComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
