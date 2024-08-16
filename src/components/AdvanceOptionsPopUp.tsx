"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { FormField } from "@/interfaces/formField";

type AdvanceOptionsProps = {
  value: FormField;
};

export default function AdvancedOptionsPopup({ value }: AdvanceOptionsProps) {
  const [formField, setFormField] = useState(value);

  useEffect(() => {
    setFormField(value);
  }, [value]);
  return (
    <div className="flex flex-col items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Advanced Options</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Advanced Options</DialogTitle>
          </DialogHeader>
          <OptionsAdder value={formField} setValue={setFormField} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

type OptionAdderProps = {
  value: FormField;
  setValue: (value: FormField) => void;
};

function OptionsAdder({ value, setValue }: OptionAdderProps) {
  return (
    <div className="space-y-4">
      {value.type === "multi" ||
        value.type === "checkbox" ||
        (value.type === "dropdown" && (
          <>
            {value.options?.map((option, index) => (
              <Input
                key={index}
                defaultValue={option}
                onBlur={(e) => {
                  const newOptions = [...(value.options ?? [])];
                  newOptions[index] = e.target.value;
                  setValue({ ...value, options: newOptions });
                }}
              />
            ))}
            <Input
              placeholder="Add Option"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  setValue({
                    ...value,
                    options: [...(value.options ?? []), e.currentTarget.value],
                  });
                  e.currentTarget.value = "";
                }
                if (e.key === "Backspace" && !e.currentTarget.value) {
                  const newOptions = [...(value.options ?? [])];
                  newOptions.pop();
                  setValue({ ...value, options: newOptions });
                }
              }}
              onBlur={(e) => {
                if (e.target.value) {
                  setValue({
                    ...value,
                    options: [...(value.options ?? []), e.target.value],
                  });
                }
              }}
            />
          </>
        ))}
    </div>
  );
}
