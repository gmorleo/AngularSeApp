import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../components/common/login/login.component';
import {NotFoundComponent} from '../../components/common/not-found/not-found.component';
import {HomeSecretaryComponent} from '../../components/secretary/home-secretary/home-secretary.component';
import {AuthSecretaryGuard} from '../../guards/auth-secretary.guard';
import {HomeProfessorComponent} from '../../components/professor/home-professor/home-professor.component';
import {AuthProfessorGuard} from '../../guards/auth-professor.guard';
import {HomeDatailsComponent} from '../../components/common/home-datails/home-datails.component';
import {CourseComponent} from '../../components/secretary/course/course.component';
import {ProfessorComponent} from '../../components/secretary/professor/professor.component';
import {StudentManagementComponent} from '../../components/secretary/student-management/student-management.component';
import {RoomManagementComponent} from '../../components/secretary/room-management/room-management.component';
import {TeachingManagementComponent} from '../../components/secretary/teaching-management/teaching-management.component';
import {LessonManagementComponent} from '../../components/secretary/lesson-management/lesson-management.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'secretary', component: HomeSecretaryComponent, canActivate: [AuthSecretaryGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeDatailsComponent},
      {path: 'course-management', component: CourseComponent},
      {path: 'teaching-management', component: TeachingManagementComponent},
      {path: 'professor-management', component: ProfessorComponent},
      {path: 'student-management', component: StudentManagementComponent},
      {path: 'room-management', component: RoomManagementComponent},
      {path: 'lesson-management', component: LessonManagementComponent}
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
