"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";

/* ---------------- Form Provider ---------------- */

export function Form({ ...props }) {
  return <FormProvider {...props} />;
}

/* ---------------- Field Controller ---------------- */

export function FormField({ ...props }) {
  return <Controller {...props} />;
}

/* ---------------- Context Hook ---------------- */

export const FormItemContext = React.createContext({});

export function FormItem({ className, ...props }) {
  return (
    <FormItemContext.Provider value={{ name: props.name }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

/* ---------------- Label ---------------- */

export function FormLabel({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm font-medium leading-none",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- Control ---------------- */

export function FormControl({ ...props }) {
  const { field } = useFormContext();

  return <Slot {...field} {...props} />;
}

/* ---------------- Message ---------------- */

export function FormMessage({ className, children, ...props }) {
  return (
    <p
      className={cn(
        "text-sm font-medium text-red-500",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/* ---------------- Description ---------------- */

export function FormDescription({ className, ...props }) {
  return (
    <p className={cn("text-xs text-gray-500", className)} {...props} />
  );
}