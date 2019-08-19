import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbThemeModule, NbLayoutModule, NbButtonModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule  } from '@angular/common/http';
import { NbDummyAuthStrategy, NbAuthModule } from '@nebular/auth';

import { AppRoutingModule } from './app-routing.module';
import { MockBackendModule } from './mock-backend/mock-backend.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    NbThemeModule.forRoot({ name: 'default' }),
    // NbLayoutModule.forRoot(),   // import in the feature module is also needed
    // NbLayoutModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',
          delay: 3000,
        }),
      ],
      forms: {},
    }),

    // Provides an interceptor that mocks the results for the HTTP requests.
    // Remove if there is a server side for this app implemented.
    MockBackendModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
