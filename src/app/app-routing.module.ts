import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestioneditorComponent } from './pages/questioneditor/questioneditor.component';
import { QuizeditorComponent } from './pages/quizeditor/quizeditor.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudenteditorComponent } from './pages/studenteditor/studenteditor.component';

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
    path: 'students',
    component: StudentListComponent
  },
  {
    path: 'students/student/:id',
    component: StudenteditorComponent
  },
  {
    path: 'admin/quiz/:id',
    component: QuizeditorComponent
  },

  {
    path: 'admin/quiz/:id/question/:id',
    component: QuestioneditorComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
