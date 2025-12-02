"use client";

import * as React from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  ControllerRenderProps,
  Control,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // optional helper if you use cn()
import { Controller } from "react-hook-form";
type Option = {
  label: string;
  value: string;
};

type SelectFieldProps<TForm extends FieldValues> = {
  name: Path<TForm>;
  label?: string;
  control: Control<TForm>;
  options: Option[];
  id?: string;
  placeholder?: string;
  error?: string | FieldError;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
};

export const SelectField = <TForm extends FieldValues>({
  name,
  label,
  control,
  options,
  id,
  placeholder,
  error,
  className = "flex flex-col gap-1 mt-3",
  labelClassName = "text-left block text-sm font-medium text-slate-700",
  disabled = false,
}: SelectFieldProps<TForm>) => {
  const selectId = id ?? String(name);
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className={cn(className)}>
      {label && (
        <Label htmlFor={selectId} className={labelClassName}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        disabled={disabled}
        render={({
          field,
        }: {
          field: ControllerRenderProps<TForm, Path<TForm>>;
        }) => (
          <Select value={field.value || ""} onValueChange={field.onChange}>
            <SelectTrigger
              id={selectId}
              disabled={disabled}
              className={cn(
                "w-full border border-emerald-200 focus:ring-emerald-400 focus:border-emerald-400 text-sm text-emerald-900",
                errorMessage && "border-red-500"
              )}
            >
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {!!errorMessage && (
        <p id={`${selectId}-error`} className="text-xs text-red-600 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
