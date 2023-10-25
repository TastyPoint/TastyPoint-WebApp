
export interface ValidationError {
  validationError(response: any): { [key: string]: any; } | null;
}

export function validationError(key: string, value: any): { [key: string]: any; } {
  return {[key]: value};
}
