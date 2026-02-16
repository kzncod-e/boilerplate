"use client";

import { useState } from "react";
import { MultipleSelectField } from "@/components/global/forms/multiple-select-form";
import GlobalCard from "@/components/global/cards/global-card";
import { SKILL_OPTIONS, LANGUAGE_OPTIONS } from "../constants/form-data";

export default function MultipleSelectSection() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    return (
        <GlobalCard
            title="Multiple Select Form"
            description="Advanced multi-select with search and dark mode support"
        >
            <div className="space-y-6">
                <MultipleSelectField
                    label="Technical Skills"
                    helper="Select your technical skills (max 5 visible)"
                    required
                    options={SKILL_OPTIONS}
                    selectedValues={selectedSkills}
                    onChange={setSelectedSkills}
                    placeholder="Search and select skills..."
                    searchable={true}
                    clearable={true}
                    maxVisibleItems={5}
                />

                <MultipleSelectField
                    label="Languages"
                    helper="Select languages you speak"
                    options={LANGUAGE_OPTIONS}
                    selectedValues={selectedLanguages}
                    onChange={setSelectedLanguages}
                    placeholder="Choose languages..."
                    searchable={true}
                    clearable={false}
                    maxVisibleItems={3}
                />

                <MultipleSelectField
                    label="Disabled Multiple Select"
                    helper="This is a disabled example"
                    options={SKILL_OPTIONS.slice(0, 5)}
                    selectedValues={["javascript", "react"]}
                    onChange={() => {}}
                    placeholder="Cannot select..."
                    disabled={false}
                    searchable={false}
                    clearable={false}
                />

                <MultipleSelectField
                    label="Non-Searchable Multiple Select"
                    helper="Click the dropdown to select options"
                    options={SKILL_OPTIONS.slice(0, 8)}
                    selectedValues={[]}
                    onChange={(values) =>
                        console.log("Non-searchable selection:", values)
                    }
                    placeholder="Select from dropdown..."
                    searchable={false}
                    clearable={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-sm">
                        <p className="font-medium mb-2">Selected Skills:</p>
                        <div className="space-y-1">
                            {selectedSkills.length > 0 ? (
                                selectedSkills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="text-muted-foreground"
                                    >
                                        •{" "}
                                        {SKILL_OPTIONS.find(
                                            (opt) => opt.value === skill,
                                        )?.label || skill}
                                    </div>
                                ))
                            ) : (
                                <div className="text-muted-foreground">
                                    No skills selected
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-sm">
                        <p className="font-medium mb-2">
                            Selected Languages:
                        </p>
                        <div className="space-y-1">
                            {selectedLanguages.length > 0 ? (
                                selectedLanguages.map((lang) => (
                                    <div
                                        key={lang}
                                        className="text-muted-foreground"
                                    >
                                        •{" "}
                                        {LANGUAGE_OPTIONS.find(
                                            (opt) => opt.value === lang,
                                        )?.label || lang}
                                    </div>
                                ))
                            ) : (
                                <div className="text-muted-foreground">
                                    No languages selected
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GlobalCard>
    );
}
