"use client";

import { useState } from "react";
import { FormField } from "@/components/global/forms/basic-form";
import { SearchForm, QuickSearch } from "@/components/global/forms/search-form";
import GlobalCard from "@/components/global/cards/global-card";
import { SUGGESTIONS } from "../constants/form-data";

export default function SearchFormSection() {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value: string) => {
        console.log("Searching for:", value);
    };

    return (
        <GlobalCard
            title="Search Form"
            description="Built-in search with debouncing and suggestions"
        >
            <div className="space-y-6">
                <FormField label="Basic Search">
                    <SearchForm
                        value={searchValue}
                        onChange={setSearchValue}
                        onSearch={handleSearch}
                        placeholder="Search for users..."
                        loading={false}
                    />
                </FormField>

                <FormField label="Search Without Button">
                    <SearchForm
                        value={searchValue}
                        onChange={setSearchValue}
                        onSearch={handleSearch}
                        placeholder="Type to search..."
                        showSearchButton={false}
                        showClearButton={true}
                    />
                </FormField>

                <FormField label="Quick Search with Suggestions">
                    <QuickSearch
                        value={searchValue}
                        onChange={setSearchValue}
                        suggestions={SUGGESTIONS}
                        onSuggestionClick={(suggestion) => {
                            setSearchValue(suggestion);
                            console.log("Selected suggestion:", suggestion);
                        }}
                        placeholder="Search users..."
                    />
                </FormField>

                <div className="text-sm text-gray-600">
                    <p>Current search value: &quot;{searchValue}&quot;</p>
                    <p>Try typing &quot;John&quot; to see suggestions.</p>
                </div>
            </div>
        </GlobalCard>
    );
}
