import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/common/login/login.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './modules/routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
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
import {CourseComponent} from './components/secretary/course/course.component';
import { NewCourseDialogComponent } from './components/secretary/new-course-dialog/new-course-dialog.component';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';
import { ProfessorComponent } from './components/secretary/professor/professor.component';
import { NewProfessorDialogComponent } from './components/secretary/new-professor-dialog/new-professor-dialog.component';

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
    NewCourseDialogComponent,
    ProfessorComponent,
    NewProfessorDialogComponent
  ],
  imports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,

    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,

    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  entryComponents: [NewCourseDialogComponent, NewProfessorDialogComponent],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
