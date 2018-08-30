import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../components/common/login/login.component';
import {NotFoundComponent} from '../../components/common/not-found/not-found.component';
import {AuthGuard} from '../../guards/auth.guard';
import {HomeStudentComponent} from '../../components/student/home-student/home-student.component';
import {HomeSecretaryComponent} from '../../components/secretary/home-secretary/home-secretary.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'secretary', component: HomeSecretaryComponent, canActivate: [AuthGuard]},
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
