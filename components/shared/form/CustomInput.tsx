"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type CustomInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  id?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  readOnly?: boolean;
  step?: string;
  min?: number;
  max?: number;

  /** 👇 NEW: Fully typed onBlur callback */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export default function CustomInput<T extends FieldValues>({
  name,
  label,
  register,
  id,
  type = "text",
  placeholder,
  autoComplete,
  error,
  className = "mt-2 flex flex-col gap-1",
  inputClassName = "p-2 bg-slate-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-100 dark:placeholder-emerald-800 dark:text-emerald-800 dark:focus:ring-blue-500 dark:focus:border-blue-500",
  labelClassName = "text-left block text-sm/6 font-medium text-slate-700",
  readOnly = false,
  step,

  /** 👇 NEW PROP */
  onBlur,
}: CustomInputProps<T>) {
  const inputId = id ?? String(name);

  return (
    <div className={className}>
      <Label htmlFor={inputId} className={labelClassName}>
        {label}
      </Label>

      <Input
        id={inputId}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        readOnly={readOnly}
        className={inputClassName}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        step={type === "number" ? step : undefined}
        disabled={readOnly}
        {...register(name, { valueAsNumber: type === "number" })}
        onBlur={(e) => {
          register(name).onBlur(e);
          onBlur?.(e);
        }}
      />

      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
