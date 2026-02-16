"use client";

import PageHeader from "@/components/global/page-header";
import BasicFormSection from "./components/basic-form-section";
import DatePickerSection from "./components/date-picker-section";
import SearchFormSection from "./components/search-form-section";
import MultipleSelectSection from "./components/multiple-select-section";
import StepperFormSection from "./components/stepper-form-section";
import CustomStylingSection from "./components/custom-styling-section";
import EditorSection from "./components/editor-section";

export default function FormPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Forms"
                description="Comprehensive form components with validation and interactions"
            />

            <BasicFormSection />
            <DatePickerSection />
            <SearchFormSection />
            <MultipleSelectSection />
            <StepperFormSection />
            <CustomStylingSection />
            <EditorSection />
        </div>
    );
}
