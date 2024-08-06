import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { CustomDatePipe } from './custom-date.pipe';
import { SampleComponentComponent } from './sample-component/sample-component.component';
import { ListComponent } from './list/list.component';
import { DataComponent } from './data/data.component';


// import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    CustomDatePipe,
    SampleComponentComponent,
    ListComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // For Firebase Authentication
    AngularFirestoreModule, // For Firestore Database
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
