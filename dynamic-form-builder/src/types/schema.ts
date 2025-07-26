export type FieldType = "text" | "number" | "select" | "checkbox" | "date";

export interface SelectOption {
  value: string;
  label: string;
}

export interface DependencyRule {
  fieldId: string;
  condition: "equals" | "notEquals" | "greaterThan" | "lessThan" | "includes";
  value: any;
}
export interface SubmitButtonConfig {
  text: string;
  loadingText?: string;
}

export interface ValidationRule {
  type: "required" | "minLength" | "maxLength" | "min" | "max" | "pattern";
  value?: number | string;
  message?: string;
}

export interface FieldSchema {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean; // can still use this for quick required checks
  options?: SelectOption[];
  validation?: ValidationRule[];
  dependsOn?: DependencyRule;
}

export interface FormSchema {
  title: string;
  fields: FieldSchema[];
  submitButton?: SubmitButtonConfig;
}
