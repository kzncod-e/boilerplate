"use client";

import { useState } from "react";
import {
    FormField,
    CustomInput as Input,
    CustomTextarea as Textarea,
    CustomSelect as Select,
    CheckboxGroup,
} from "@/components/global/forms/basic-form";
import { StepperForm } from "@/components/global/forms/stepper-form";
import GlobalCard from "@/components/global/cards/global-card";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Settings,
} from "lucide-react";
import { INTEREST_OPTIONS, EXPERIENCE_OPTIONS } from "../constants/form-data";

export default function StepperFormSection() {
    const [currentStep, setCurrentStep] = useState(0);

    const stepperSteps = [
        {
            id: "personal",
            title: "Personal Information",
            description: "Basic details about you",
            content: (
                <div className="space-y-4">
                    <FormField label="Full Name" required>
                        <Input
                            placeholder="Enter your full name"
                            leftIcon={<User className="h-4 w-4" />}
                        />
                    </FormField>
                    <FormField label="Email Address" required>
                        <Input
                            type="email"
                            placeholder="your.email@example.com"
                            leftIcon={<Mail className="h-4 w-4" />}
                        />
                    </FormField>
                    <FormField label="Phone Number">
                        <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            leftIcon={<Phone className="h-4 w-4" />}
                        />
                    </FormField>
                </div>
            ),
            validate: () => true,
        },
        {
            id: "professional",
            title: "Professional Details",
            description: "Your work experience",
            content: (
                <div className="space-y-4">
                    <FormField label="Job Title">
                        <Input
                            placeholder="Senior Software Engineer"
                            leftIcon={<Briefcase className="h-4 w-4" />}
                        />
                    </FormField>
                    <FormField label="Company">
                        <Input
                            placeholder="Tech Corp Inc."
                            leftIcon={<Settings className="h-4 w-4" />}
                        />
                    </FormField>
                    <FormField label="Years of Experience">
                        <Select
                            options={EXPERIENCE_OPTIONS}
                            placeholder="Select experience"
                        />
                    </FormField>
                </div>
            ),
            validate: () => true,
        },
        {
            id: "preferences",
            title: "Preferences",
            description: "Your preferences and settings",
            content: (
                <div className="space-y-4">
                    <FormField label="Location">
                        <Input
                            placeholder="New York, NY"
                            leftIcon={<MapPin className="h-4 w-4" />}
                        />
                    </FormField>
                    <FormField label="Bio">
                        <Textarea
                            placeholder="Tell us about yourself..."
                            rows={4}
                        />
                    </FormField>
                    <FormField label="Interests">
                        <CheckboxGroup
                            options={INTEREST_OPTIONS}
                            selectedValues={["sports", "travel"]}
                            onChange={(values) =>
                                console.log("Interests:", values)
                            }
                            orientation="horizontal"
                        />
                    </FormField>
                </div>
            ),
            optional: true,
            validate: () => true,
        },
    ];

    const handleComplete = (data: Record<string, any>) => {
        console.log("Stepper completed with data:", data);
    };

    return (
        <GlobalCard
            title="Stepper Form"
            description="Multi-step wizard with validation"
        >
            <StepperForm
                steps={stepperSteps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                onComplete={handleComplete}
                allowSkip={true}
                showProgress={true}
                orientation="horizontal"
            />
        </GlobalCard>
    );
}
