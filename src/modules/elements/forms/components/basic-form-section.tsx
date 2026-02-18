"use client";

import { useState } from "react";
import { CheckboxGroup } from "@/components/global/forms/basic-form";
import InputField from "@/components/global/forms/input-field";
import GlobalCard from "@/components/global/cards/global-card";
import { BasicButton } from "@/components/global/buttons/basic-button";
import { Save } from "lucide-react";
import {
  COUNTRIES,
  GENDER_OPTIONS,
  INTEREST_OPTIONS,
  INITIAL_FORM_DATA,
} from "../constants/form-data";

export default function BasicFormSection() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Basic form data:", formData);
  };

  return (
    <GlobalCard
      title="Basic Form"
      description="Standard form inputs with validation"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            helper="Enter your complete name"
          />

          <InputField
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
            error={
              !formData.email.includes("@") && formData.email
                ? "Invalid email format"
                : ""
            }
          />

          <InputField
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />

          <InputField
            name="country"
            label="Country"
            type="select"
            value={formData.country}
            onChange={handleChange}
            placeholder="Select your country"
            options={COUNTRIES}
          />
        </div>

        <InputField
          name="message"
          label="Message"
          type="textarea"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about yourself..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-wrap">
          <InputField
            name="gender"
            label="Gender"
            type="radio"
            value={formData.gender}
            onChange={handleChange}
            options={GENDER_OPTIONS}
          />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
              Interests
            </label>
            <CheckboxGroup
              options={INTEREST_OPTIONS}
              selectedValues={formData.interests}
              onChange={(values) => handleChange("interests", values)}
              orientation="horizontal"
            />
          </div>
        </div>

        <InputField
          name="newsletter"
          label="Newsletter"
          type="checkbox"
          value={formData.newsletter}
          onChange={handleChange}
          placeholder="Subscribe to our newsletter"
        />

        <div className="flex gap-3">
          <BasicButton type="submit" leftIcon={<Save className="h-4 w-4" />}>
            Save Form
          </BasicButton>
          <BasicButton
            variant="outline"
            onClick={() => setFormData({ ...INITIAL_FORM_DATA })}
          >
            Reset
          </BasicButton>
        </div>
      </form>
    </GlobalCard>
  );
}
