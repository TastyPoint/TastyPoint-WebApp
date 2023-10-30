import {AbstractControl} from "@angular/forms";

export interface CustomValidator {
  errorName: string,
  value: any;
  validateValue: boolean;
  crossWith?: string;
  validate(control?: AbstractControl): boolean;
}
