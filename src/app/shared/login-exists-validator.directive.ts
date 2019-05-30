import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

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

  @Input('appLoginExistsValidator') forbiddenName: string;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenName ?
        forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
        : null;
  }

}
