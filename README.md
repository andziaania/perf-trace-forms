
# PerfTrace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1 and upgraded to version 8.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. Copy the output from the dist folder under a web-server of your choice.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



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

### MISCELLANEOUS
- interface (users.component.TimeRange)
- DatePipe
- zip (rxjs)
