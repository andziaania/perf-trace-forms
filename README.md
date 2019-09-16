
# PerfTrace

You can see the live demo of this project on 
- http://pawelczyk.biz.pl
or
- https://andziaania.github.io

## TECHNICAL RECORD:

Here, for the record, I put a summary of angular features and libs used in this project.

### Nebular UI Library 
- [https://akveo.github.io/nebular)](https://akveo.github.io/nebular)/

### Nebular auth -setup of the authentication layer for Angular app
- [https://akveo.github.io/nebular/docs/auth/introduction#auth-module](https://akveo.github.io/nebular/docs/auth/introduction#auth-module)
- NbAuthModule

### ng2-charts - Angular2 directives for Chart.js
- [https://valor-software.com/ng2-charts/](https://valor-software.com/ng2-charts/)
- canvas

### Bootstrap library for styling

### Http Interceptor (MockBackendModule, ServerSimulatorInterceptor)
- {provide: HTTP_INTERCEPTORS, useClass: ServerSimulatorInterceptor,...}
- implements HttpInterceptor; intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>

### Feature module with providers (MockBackendModule)
- static forRoot(): ModuleWithProviders 

### @ViewChild & AfterViewInit
- chart components inside components, eg. ChartUsers inside UsersComponent

### Intercept input property changes with ngOnChanges()
https://angular.io/guide/component-interaction#intercept-input-property-changes-with-ngonchanges
- in users-total-card.component & users-new-vs-returning-card.component

### pt- prefix
- (tslint.json "rules", angular.json "prefix")

### reverse proxy
- webpack dev server custom configuration for the perf trace server
- nginx custom configuration of 
* the everse-proxy for the perf trace server 
* the error page

### MISCELLANEOUS
- interface (users.component.TimeRange)
- DatePipe
- zip (rxjs)
- https://www.npmjs.com/package/file-saver
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1 and upgraded to version 8.2.0.


### OTHERS
- docker configuration (Dockerfile)


## TODO
- consider timezones in server and client. 
See for Java https://stackoverflow.com/questions/51952984/how-can-i-convert-a-time-in-milliseconds-to-zoneddatetime/51953287
and  https://stackoverflow.com/questions/32437550/whats-the-difference-between-instant-and-localdatetime/32443004#32443004
