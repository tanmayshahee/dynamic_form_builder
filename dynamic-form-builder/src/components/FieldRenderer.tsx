import React from "react";
import { FieldSchema } from "../types/schema";
import TextInput from "./Fields/TextInput";
import SelectInput from "./Fields/SelectInput";
import CheckboxInput from "./Fields/CheckboxInput";
import DateInput from "./Fields/DateInput";

interface Props {
  field: FieldSchema;
  value: any;
  onChange: (id: string, value: any) => void;
  error?: string;
}

const FieldRenderer: React.FC<Props> = ({ field, value, onChange, error }) => {
  const commonProps = {
    type: field.type,
    id: field.id,
    label: field.label,
    value,
    onChange: (val: any) => onChange(field.id, val),
    error,
  };

  switch (field.type) {
    case "text":
    case "number":
      return <TextInput {...commonProps} />;
    case "select":
      return <SelectInput {...commonProps} options={field.options || []} />;
    case "checkbox":
      return <CheckboxInput {...commonProps} />;
    case "date":
      return <DateInput {...commonProps} />;
    default:
      return null;
  }
};

export default FieldRenderer;
