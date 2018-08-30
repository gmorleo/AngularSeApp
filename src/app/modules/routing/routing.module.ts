import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../components/common/login/login.component';
import {NotFoundComponent} from '../../components/common/not-found/not-found.component';
import {StudentHomeComponent} from '../../components/student/student-home/student-home.component';
import {AuthGuard} from '../../guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'student', component: StudentHomeComponent, canActivate: [AuthGuard]},
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
