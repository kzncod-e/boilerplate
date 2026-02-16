"use client";

import {
    FormField,
    CustomInput as Input,
    CustomTextarea as Textarea,
    CustomSelect as Select,
} from "@/components/global/forms/basic-form";
import GlobalCard from "@/components/global/cards/global-card";
import { COUNTRIES } from "../constants/form-data";

export default function CustomStylingSection() {
    return (
        <GlobalCard
            title="Custom Styling"
            description="Forms with custom CSS classes"
        >
            <div className="space-y-6">
                <FormField label="Gradient Input">
                    <Input
                        className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Custom styled input"
                    />
                </FormField>

                <FormField label="Large Textarea">
                    <Textarea
                        className="min-h-[200px] text-lg border-2 border-dashed border-blue-300 focus:border-blue-500"
                        placeholder="Large custom textarea"
                    />
                </FormField>

                <FormField label="Custom Select">
                    <Select
                        className="bg-gray-900 text-white border-gray-700 focus:border-blue-500 w-ful"
                        options={COUNTRIES}
                        placeholder="Dark theme select"
                    />
                </FormField>
            </div>
        </GlobalCard>
    );
}
