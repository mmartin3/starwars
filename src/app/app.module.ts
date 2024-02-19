import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListLinkComponent } from './list-link/list-link.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ListLinkComponent },
      { path: 'people', component: PeopleListComponent },
      { path: 'people/:id', component: PeopleDetailsComponent }
    ])
  ],
  declarations: [
    AppComponent,
    ListLinkComponent,
    PeopleListComponent,
    PeopleDetailsComponent,
    ProgressBarComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
