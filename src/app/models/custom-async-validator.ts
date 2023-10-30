import { Observable } from "rxjs";
import { AbstractControl } from "@angular/forms";
import {ValidationError} from "./validation-error";

export interface CustomAsyncValidator extends ValidationError {
  errorName: string,
  validate(control?: AbstractControl): Observable<any>;
  value: any;
  validateValue: boolean;
  crossWith?: string;
}


