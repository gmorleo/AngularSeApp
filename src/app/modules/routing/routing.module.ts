import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../components/common/login/login.component';
import {NotFoundComponent} from '../../components/common/not-found/not-found.component';
import {AuthGuard} from '../../guards/auth.guard';
import {HomeStudentComponent} from '../../components/student/home-student/home-student.component';
import {HomeSecretaryComponent} from '../../components/secretary/home-secretary/home-secretary.component';
import {AuthSecretaryGuard} from '../../guards/auth-secretary.guard';
import {HomeProfessorComponent} from '../../components/professor/home-professor/home-professor.component';
import {AuthProfessorGuard} from '../../guards/auth-professor.guard';
import {HomeDatailsComponent} from '../../components/common/home-datails/home-datails.component';
import {CourseComponent} from '../../components/secretary/course/course.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'secretary', component: HomeSecretaryComponent, canActivate: [AuthSecretaryGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeDatailsComponent},
      {path: 'course', component: CourseComponent}
    ]},
  {path: 'professor', component: HomeProfessorComponent, canActivate: [AuthProfessorGuard],
    children: [
      {path: 'professor/home', component: HomeDatailsComponent}
    ]},
  {path: '', component: LoginComponent},
  {path: '**', component: NotFoundComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class RoutingModule { }
