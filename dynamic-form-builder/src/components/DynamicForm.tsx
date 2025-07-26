// src/components/DynamicForm.tsx
import React, { useState } from "react";
import { FormSchema, FieldSchema } from "../types/schema";
import FieldRenderer from "./FieldRenderer";
import "../styles/Form.css";

interface Props {
  schema: FormSchema;
  onSubmit: (data: Record<string, any>) => void;
}

const DynamicForm: React.FC<Props> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateField = (field: FieldSchema, value: any): string | null => {
    // 1. Handle "required" if it's directly defined
    if (
      field.required &&
      !field.validation &&
      (value === undefined || value === "")
    ) {
      return `${field.label} is required.`;
    }

    // 2. Handle custom validation array (if defined)
    if (field.validation) {
      for (const rule of field.validation) {
        switch (rule.type) {
          case "required":
            if (value === undefined || value === "") {
              return rule.message || `${field.label} is required.`;
            }
            break;

          case "minLength":
            if (
              typeof value === "string" &&
              value.length < (rule.value as number)
            ) {
              return (
                rule.message ||
                `${field.label} must be at least ${rule.value} characters.`
              );
            }
            break;

          case "maxLength":
            if (
              typeof value === "string" &&
              value.length > (rule.value as number)
            ) {
              return (
                rule.message ||
                `${field.label} must be at most ${rule.value} characters.`
              );
            }
            break;

          case "min":
            if (typeof value === "number" && value < (rule.value as number)) {
              return (
                rule.message || `${field.label} must be at least ${rule.value}.`
              );
            }
            break;

          case "max":
            if (typeof value === "number" && value > (rule.value as number)) {
              return (
                rule.message || `${field.label} must be at most ${rule.value}.`
              );
            }
            break;

          case "pattern":
            if (
              typeof value === "string" &&
              !new RegExp(rule.value as string).test(value)
            ) {
              return rule.message || `${field.label} format is invalid.`;
            }
            break;
        }
      }
    }

    return null;
  };

  const shouldShowField = (field: FieldSchema): boolean => {
    const dep = field.dependsOn;
    if (!dep) return true;

    const dependentValue = formData[dep.fieldId];

    switch (dep.condition) {
      case "equals":
        return dependentValue === dep.value;
      case "notEquals":
        return dependentValue !== dep.value;
      case "greaterThan":
        return dependentValue > dep.value;
      case "lessThan":
        return dependentValue < dep.value;
      case "includes":
        return (
          Array.isArray(dependentValue) && dependentValue.includes(dep.value)
        );
      default:
        return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    schema.fields.forEach((field) => {
      if (!shouldShowField(field)) return;
      const value = formData[field.id];
      const error = validateField(field, value);
      if (error) {
        validationErrors[field.id] = error;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        onSubmit(formData);
        alert("Form submitted successfully!");
        setFormData({});
        setErrors({});
        setIsSubmitting(false);
      }, 1000); // simulate submission delay purposely added to show loading text otherwise not required
    }
  };

  const submitText = isSubmitting
    ? schema.submitButton?.loadingText || "Submitting..."
    : schema.submitButton?.text || "Submit";

  return (
    <form onSubmit={handleSubmit}>
      <h2>{schema.title}</h2>
      {schema.fields.map(
        (field) =>
          shouldShowField(field) && (
            <FieldRenderer
              key={field.id}
              field={field}
              value={formData[field.id]}
              onChange={handleChange}
              error={errors[field.id]}
            />
          )
      )}
      <button type="submit" disabled={isSubmitting}>
        {submitText}
      </button>
    </form>
  );
};

export default DynamicForm;
