import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerSimulatorInterceptor} from './server-simulator-interceptor';
import { ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersMockService } from './users-mock.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class MockBackendModule {


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MockBackendModule,
      providers: [
        UsersMockService,
        {
          // use fake backend in place of Http service for backend-less development
          provide: HTTP_INTERCEPTORS,
          useClass: ServerSimulatorInterceptor,
          multi: true
        },
      ],
    };
  }
}
