import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestioneditorComponent } from './pages/questioneditor/questioneditor.component';
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
    path: 'admin/quiz/:id',
    component: QuizeditorComponent,
  },

  {
    path: 'admin/quiz/1/question/:id',
    component: QuestioneditorComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
