"use client";

import * as React from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type TextAreaInputProps<TForm extends FieldValues> = {
  name: Path<TForm>;
  register: UseFormRegister<TForm>;
  registerOptions?: RegisterOptions<TForm, Path<TForm>>;
  label?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  error?: string | FieldError;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  maxLength?: number;
  showCount?: boolean;
  readOnly?: boolean;
};

export const TextAreaInput = <TForm extends FieldValues>({
  name,
  register,
  registerOptions,
  label,
  id,
  placeholder = "Your message...",
  rows = 5,
  error,
  className = "mt-2 flex flex-col gap-1",
  textareaClassName = "p-2 bg-slate-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-emerald-100 dark:placeholder-emerald-800 dark:text-emerald-800 dark:focus:ring-blue-500 dark:focus:border-blue-500",
  labelClassName = "text-left block text-sm/6 font-medium text-slate-700",
  maxLength,
  showCount,
  readOnly = false,
}: TextAreaInputProps<TForm>) => {
  const textareaId = id ?? String(name);
  const errorMessage = typeof error === "string" ? error : error?.message;

  const [value, setValue] = React.useState("");

  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className={labelClassName}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        placeholder={placeholder}
        className={textareaClassName + " p-2.5"}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${textareaId}-error` : undefined}
        maxLength={maxLength}
        readOnly={readOnly}
        {...register(name, registerOptions)}
        onChange={(e) => setValue(e.target.value)}
      />
      {showCount && typeof maxLength === "number" && (
        <div className="text-right text-xs text-slate-500">
          {value.length}/{maxLength}
        </div>
      )}
      {!!errorMessage && (
        <p id={`${textareaId}-error`} className="text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
