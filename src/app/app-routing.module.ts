import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./presentation/student/student.module').then(m => m.StudentModule) },
  { path: 'student', loadChildren: () => import('./presentation/student/student.module').then(m => m.StudentModule) }, // Lazy load the StudentModule
  { path: 'student-registrations', loadChildren: () => import('./presentation/student-registration/student-registration.module').then(m => m.StudentRegistrationModule) },
  { path: 'shift', loadChildren: () => import('./presentation/shift/shift.module').then(m => m.ShiftModule) },
  { path: 'school-exams', loadChildren: () => import('./presentation/school-exam/school-exam.module').then(m => m.SchoolExamModule) },
];

/*
  1. The actual Router service IS a Singleton
  There is only one global instance of the Router class (the service that tracks URLs and navigates between components) in your entire Angular application.

  How does Angular guarantee this?

  RouterModule.forRoot(routes) is called only once (typically in 

  app-routing.module.ts
  ).
  It tells Angular to register the core singleton service (Router) into the root Dependency Injection container.
  RouterModule.forChild(routes) is called in lazy-loaded submodules (like 

  school-exam-routing.module.ts
  ).
  It does not create a new Router service. It only registers more route configurations.
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
