import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/common/login/login.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './modules/routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {FirebaseService} from './services/firebase.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {HomeStudentComponent} from './components/student/home-student/home-student.component';
import { HomeSecretaryComponent } from './components/secretary/home-secretary/home-secretary.component';
import {ProvaComponent} from './components/common/prova/prova.component';
import { HomeProfessorComponent } from './components/professor/home-professor/home-professor.component';
import { HomeDatailsComponent } from './components/common/home-datails/home-datails.component';
import {CourseComponent, newCourseDialog} from './components/secretary/course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HomeStudentComponent,
    HomeSecretaryComponent,
    ProvaComponent,
    HomeProfessorComponent,
    HomeDatailsComponent,
    CourseComponent,
    newCourseDialog
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatTreeModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
