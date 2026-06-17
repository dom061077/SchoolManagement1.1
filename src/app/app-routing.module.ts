import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonlistingComponent } from './component/personlisting/personlisting.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./presentation/student/student.module').then(m => m.StudentModule) },
  { path: 'login', component: LoginComponent },
  //{path:'listperson', component: PersonlistingComponent},
  { path: 'student', loadChildren: () => import('./presentation/student/student.module').then(m => m.StudentModule) }, // Lazy load the StudentModule
  { path: 'student-registrations', loadChildren: () => import('./presentation/student-registration/student-registration.module').then(m => m.StudentRegistrationModule) },
  { path: 'shift', loadChildren: () => import('./presentation/shift/shift.module').then(m => m.ShiftModule) },
  { path: 'school-exams', loadChildren: () => import('./presentation/school-exam/school-exam.module').then(m => m.SchoolExamModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
