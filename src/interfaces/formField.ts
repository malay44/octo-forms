export type formFieldType =
  | "text"
  | "para"
  | "multi"
  | "checkbox"
  | "dropdown"
  | "DatePicker"
  | "FileUpload";

interface genericFormField {
  label: string;
  key: string;
  type: formFieldType;
  required: boolean;
}

interface textFormField extends genericFormField {
  type: "text";
  minLength?: number;
  maxLength?: number;
}

interface paraFormField extends genericFormField {
  type: "para";
  minLength?: number;
  maxLength?: number;
}

interface multiFormField extends genericFormField {
  type: "multi";
  options?: string[];
}

interface checkboxFormField extends genericFormField {
  type: "checkbox";
  options?: string[];
}

interface dropdownFormField extends genericFormField {
  type: "dropdown";
  options?: string[];
}

interface DatePickerFormField extends genericFormField {
  type: "DatePicker";
}

interface FileUploadFormField extends genericFormField {
  type: "FileUpload";
  maxFiles: number;
  maxFileSize: number;
}

export type FormField =
  | textFormField
  | paraFormField
  | multiFormField
  | checkboxFormField
  | dropdownFormField
  | DatePickerFormField
  | FileUploadFormField;
