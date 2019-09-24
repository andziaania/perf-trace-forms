
# PerfTrace

You can see the live demo of this project on 
- http://pawelczyk.biz.pl

## Development server

To run the application, you need node.js with npm and @angular/cli. Then, after downloading this sources, run `npm install`. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Technical record

Here, for the record, I put a summary of angular features and libs used in this project.

#### Nebular UI Library 
- [https://akveo.github.io/nebular)](https://akveo.github.io/nebular)/

#### Nebular auth -setup of the authentication layer for Angular app
- [https://akveo.github.io/nebular/docs/auth/introduction#auth-module](https://akveo.github.io/nebular/docs/auth/introduction#auth-module)
- NbAuthModule

#### ng2-charts - Angular2 directives for Chart.js
- [https://valor-software.com/ng2-charts/](https://valor-software.com/ng2-charts/)
- canvas

#### Bootstrap library for styling

#### Http Interceptor (MockBackendModule, ServerSimulatorInterceptor)
- {provide: HTTP_INTERCEPTORS, useClass: ServerSimulatorInterceptor,...}
- implements HttpInterceptor; intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>

#### Feature module with providers (MockBackendModule)
- static forRoot(): ModuleWithProviders 

### @ViewChild & AfterViewInit
- chart components inside components, eg. ChartUsers inside UsersComponent

#### Intercept input property changes with ngOnChanges()
https://angular.io/guide/component-interaction#intercept-input-property-changes-with-ngonchanges
- in users-total-card.component & users-new-vs-returning-card.component

#### pt- prefix
- (tslint.json "rules", angular.json "prefix")

#### reverse proxy
- webpack dev server custom configuration for the perf trace server
- nginx custom configuration of 
  - the reverse-proxy for the perf trace server 
  - the error page redirection

#### MISCELLANEOUS
- HttpClient
- rxjs (eg. Observable, zip), rxjs/operators (eg. map)
- interface (users.component.TimeRange)
- DatePipe
- https://www.npmjs.com/package/file-saver
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1 and upgraded to version 8.2.0.


#### OTHERS
- docker configuration (Dockerfile)
