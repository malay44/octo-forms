"use client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableCell,
  TableFooter,
} from "./ui/table";

import { useState } from "react";

type typeOptions =
  | "text"
  | "para"
  | "multi"
  | "checkbox"
  | "dropdown"
  | "DatePicker"
  | "FileUpload";

const typeOptionsFields = [
  "text",
  "para",
  "multi",
  "checkbox",
  "dropdown",
  "DatePicker",
  "FileUpload",
];

export interface FormField {
  label: string;
  key: string;
  type: typeOptions;
  required: boolean;
}

const initialFormFields: FormField[] = [
  {
    label: "First Name",
    key: "first_name",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    key: "last_name",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    key: "email",
    type: "text",
    required: true,
  },
  {
    label: "Message",
    key: "message",
    type: "para",
    required: false,
  },
];

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);

  const handleInputChange = (
    index: number,
    field: keyof FormField,
    value: any
  ) => {
    const newFields = [...formFields];
    newFields[index] = { ...newFields[index], [field]: value };
    setFormFields(newFields);
  };

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      { label: "", key: "", type: "text", required: false },
    ]);
  };

  const handleDeleteField = (index: number) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Saved Form Fields:", formFields);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex gap-4 w-5/6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Type</TableHead>
              <TableHead align="center" className="text-center">
                Required
              </TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>Advance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formFields.map((field, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={field.label}
                    placeholder="Label"
                    onChange={(e) =>
                      handleInputChange(index, "label", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={field.key}
                    placeholder="Key"
                    onChange={(e) =>
                      handleInputChange(index, "key", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      handleInputChange(index, "type", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptionsFields.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell align="center" className="p-0">
                  <Checkbox
                    checked={field.required}
                    onCheckedChange={(checked) =>
                      handleInputChange(index, "required", checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteField(index)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button>Advance</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button className="w-28" onClick={handleSave}>
                  Save
                </Button>
              </TableCell>
              <TableCell colSpan={3} align="right">
                <Button className="w-28" onClick={handleAddField}>
                  Add Field
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
