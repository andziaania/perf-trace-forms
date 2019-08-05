import { LoggerService } from './../logger.service';
import { LoginService } from './../login.service';
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import { log } from 'util';


/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appLoginExistsValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: LoginExistsValidatorDirective, multi: true}]
})
export class LoginExistsValidatorDirective implements Validator {

  constructor(private loginService: LoginService, private loggerService: LoggerService) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.checkIfLoginExistsValidatorFn()(control);
  }


  checkIfLoginExistsValidatorFn(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {

      console.log(`KONTROLKA ${control.value}`)
      return this.loginService.isLoginExists(control.value).pipe(
        tap((isLoginExists: boolean) => this.loggerService.log("checkIfLoginExistsValidatorFn", isLoginExists)),
        map ((isLoginExists: boolean) => isLoginExists ? {'forbiddenName': {value: control.value}} : null)
      ).subscribe();
    };
  }

}
