"use client";

import { FormField } from "@/interfaces/formField";
import AdvancedOptionsPopup from "./AdvanceOptionsPopUp";
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

const typeOptionsFields = [
  "text",
  "para",
  "multi",
  "checkbox",
  "dropdown",
  "DatePicker",
  "FileUpload",
];

const initialFormFields: FormField[] = [
  {
    label: "First Name",
    key: "first_name",
    type: "multi",
    required: true,
    options: ["Option 1", "Option 2", "Option 3"],
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

  const handlePreview = () => {
    window.localStorage.setItem("formFields", JSON.stringify(formFields));
    window.open("/preview", "_blank");
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
                  <AdvancedOptionsPopup value={field} />
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
              <TableCell colSpan={3}>
                <Button className="w-28" onClick={handlePreview}>
                  Preivew
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
