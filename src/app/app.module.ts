import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing.module';
// import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

//import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TestControllerService } from './services/testcontroller.service';
import { TestScriptsService } from './services/testscripts.service';
import { KeywordService } from './services/keyword.service';
import { RepositoryService } from './services/repository.service';
import { GlobalService } from './services/global.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { MatSidenavModule } from '@angular/material';
import {MultiSelectModule} from 'primeng/multiselect';
import { AdminComponent } from './admin';
import { SharedModule } from './shared';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatSidenavModule,
    MultiSelectModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    AdminComponent,
    ConfirmationDialogComponent,
    
  ],
  providers: [TestControllerService,TestScriptsService,KeywordService,RepositoryService, GlobalService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
