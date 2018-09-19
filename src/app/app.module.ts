import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/common/login/login.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './modules/routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_DATE_LOCALE,
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
import { HomeSecretaryComponent } from './components/secretary/home-secretary/home-secretary.component';
import { HomeProfessorComponent } from './components/professor/home-professor/home-professor.component';
import { HomeDatailsComponent } from './components/common/home-datails/home-datails.component';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';
import { StudentManagementComponent} from './components/secretary/student-management/student-management.component';
import { FormDialogComponent } from './components/common/form-dialog/form-dialog.component';
import { ResponseDialogComponent } from './components/common/response-dialog/response-dialog.component';
import { RoomManagementComponent } from './components/secretary/room-management/room-management.component';
import { TeachingManagementComponent } from './components/secretary/teaching-management/teaching-management.component';
import { LessonManagementComponent } from './components/secretary/lesson-management/lesson-management.component';
import { ExamManagementComponent } from './components/secretary/exam-management/exam-management.component';
import { LessonComponent } from './components/professor/lesson/lesson.component';
import {StarRatingModule} from 'angular-star-rating';
import { ProfessorSegnalationComponent } from './components/professor/professor-segnalation/professor-segnalation.component';
import { CourseManagementComponent } from './components/secretary/course-management/course-management.component';
import { ProfessorManagementComponent } from './components/secretary/professor-management/professor-management.component';
import { SegnalationManagementComponent } from './components/secretary/segnalation-management/segnalation-management.component';
import { SegnalationDialogComponent } from './components/secretary/segnalation-management/segnalation-dialog/segnalation-dialog.component';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { DropZoneDirective } from './directive/drop-zone.directive';
import { UploadDialogComponent } from './components/professor/lesson/upload-dialog/upload-dialog.component';
import { SpinnerComponent } from './components/common/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HomeSecretaryComponent,
    HomeProfessorComponent,
    HomeDatailsComponent,
    StudentManagementComponent,
    FormDialogComponent,
    ResponseDialogComponent,
    RoomManagementComponent,
    TeachingManagementComponent,
    LessonManagementComponent,
    ExamManagementComponent,
    LessonComponent,
    ProfessorSegnalationComponent,
    CourseManagementComponent,
    ProfessorManagementComponent,
    SegnalationManagementComponent,
    SegnalationDialogComponent,
    DropZoneDirective,
    UploadDialogComponent,
    SpinnerComponent
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
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    StarRatingModule.forRoot()
  ],
  entryComponents: [FormDialogComponent, ResponseDialogComponent, UploadDialogComponent, SegnalationDialogComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
