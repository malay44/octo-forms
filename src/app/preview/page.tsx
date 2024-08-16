"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField as FormFieldType } from "@/interfaces/formField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function Page() {
  const [formFields, setFormFields] = useState<FormFieldType[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const formFields = JSON.parse(localStorage.getItem("formFields") ?? "[]");
      setFormFields(formFields);
    }
  }, []);
  return (
    <div className="flex flex-col items-center bg-secondary mx-auto w-3/6 p-6">
      <h1 className="text-3xl font-bold my-4">Form Preview</h1>
      <div className="flex flex-col w-full">
        {formFields.map((field, index) => {
          if (field.type === "text") {
            return (
              <>
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input key={index} required={field.required} />
              </>
            );
          }
          if (field.type === "para") {
            return (
              <>
                <Label htmlFor={field.key}>{field.label}</Label>
                <textarea
                  key={index}
                  required={field.required}
                  className="w-full h-32"
                />
              </>
            );
          }

          if (field.type === "dropdown") {
            return (
              <Select key={field.key}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }

          if (field.type === "multi") {
            return (
              <>
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.options?.map((option, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={option}
                      name={option}
                      value={option}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </>
            );
          }

          if (field.type === "checkbox") {
            return (
              <>
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.options?.map((option, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={option}
                      name={option}
                      value={option}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </>
            );
          }
        })}
      </div>
    </div>
  );
}
