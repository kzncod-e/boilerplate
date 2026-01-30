"use client";

import React, { useState } from "react";
import { 
  FormField, 
  CustomInput as Input, 
  CustomTextarea as Textarea, 
  CustomSelect as Select, 
  RadioGroup, 
  CheckboxGroup 
} from "@/components/global/forms/basic-form";
import { MultipleSelect, MultipleSelectField } from "@/components/global/forms/multiple-select-form";
import { DatePicker } from "@/components/global/forms/date-picker-form";
import { SearchForm, QuickSearch } from "@/components/global/forms/search-form";
import { StepperForm } from "@/components/global/forms/stepper-form";
import { EditorForm, MarkdownEditor } from "@/components/global/forms/editor-form";
import GlobalCard from "@/components/global/cards/global-card";
import PageHeader from "@/components/global/page-header";
import { BasicButton } from "@/components/global/buttons/basic-button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Briefcase,
  Settings,
  Save
} from "lucide-react";

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    country: "",
    gender: "",
    interests: [] as string[],
    newsletter: false,
  });

  const [searchValue, setSearchValue] = useState("");
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const [markdownContent] = useState(`# Welcome to Markdown EditorVisit [GitHub](https://github.com) for more information!`);
  
  // Multiple select states
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Search suggestions
  const suggestions = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
    "Diana Prince",
    "Edward Norton",
    "Fiona Apple"
  ];

  // Country options
  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" }
  ];

  // Gender options
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ];

  // Interest options
  const interestOptions = [
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "travel", label: "Travel" },
  ];

  // Multiple select options
  const skillOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" }
  ];

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "portuguese", label: "Portuguese" },
    { value: "russian", label: "Russian" },
    { value: "arabic", label: "Arabic" },
    { value: "hindi", label: "Hindi" },
    { value: "italian", label: "Italian" }
  ];

  // Stepper form steps
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
      validate: () => {
        // Basic validation logic
        return true;
      }
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
              options={[
                { value: "0-2", label: "0-2 years" },
                { value: "3-5", label: "3-5 years" },
                { value: "6-10", label: "6-10 years" },
                { value: "10+", label: "10+ years" }
              ]}
              placeholder="Select experience"
            />
          </FormField>
        </div>
      ),
      validate: () => {
        return true;
      }
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
              options={interestOptions}
              selectedValues={["sports", "travel"]}
              onChange={(values) => console.log("Interests:", values)}
              orientation="horizontal"
            />
          </FormField>
        </div>
      ),
      optional: true,
      validate: () => {
        return true;
      }
    }
  ];

  const handleBasicFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Basic form data:", formData);
  };

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  const handleStepperComplete = (data: Record<string, any>) => {
    console.log("Stepper completed with data:", data);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Forms"
        description="Comprehensive form components with validation and interactions"
      />

      {/* Basic Form */}
      <GlobalCard title="Basic Form" description="Standard form inputs with validation">
        <form onSubmit={handleBasicFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" required helper="Enter your complete name">
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                leftIcon={<User className="h-4 w-4" />}
              />
            </FormField>

            <FormField label="Email Address" required error={!formData.email.includes("@") && formData.email ? "Invalid email format" : ""}>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john.doe@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </FormField>

            <FormField label="Phone Number">
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
                leftIcon={<Phone className="h-4 w-4" />}
              />
            </FormField>

            <FormField label="Country">
              <Select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                options={countries}
                placeholder="Select your country"
              />
            </FormField>
          </div>

          <FormField label="Message">
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us more about yourself..."
              rows={4}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-wrap">
            <FormField label="Gender">
              <RadioGroup
                options={genderOptions}
                value={formData.gender}
                onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                orientation="horizontal"
              />
            </FormField>

            <FormField label="Interests">
              <CheckboxGroup
                options={interestOptions}
                selectedValues={formData.interests}
                onChange={(values) => setFormData(prev => ({ ...prev, interests: values }))}
                orientation="horizontal"
              />
            </FormField>
          </div>

          <div className="flex gap-3">
            <BasicButton type="submit" leftIcon={<Save className="h-4 w-4" />}>
              Save Form
            </BasicButton>
            <BasicButton variant="outline" onClick={() => setFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
              country: "",
              gender: "",
              interests: [],
              newsletter: false,
            })}>
              Reset
            </BasicButton>
          </div>
        </form>
      </GlobalCard>

      {/* Date Picker Form */}
      <GlobalCard title="Date Picker" description="Single and range date selection with calendar">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Single Date">
              <DatePicker
                mode="single"
                value={singleDate}
                onChange={(value) => {
                  if (value instanceof Date || value === null) {
                    setSingleDate(value);
                  }
                }}
                placeholder="Select a date"
              />
            </FormField>

            <FormField label="Date Range">
              <DatePicker
                mode="range"
                value={dateRange}
                onChange={(value) => {
                  if (Array.isArray(value) || value === null) {
                    setDateRange(value);
                  }
                }}
                placeholder="Select date range"
              />
            </FormField>
          </div>

          <FormField label="Date Range with Two Calendars">
            <DatePicker
              mode="range"
              value={dateRange}
              onChange={(value) => {
                if (Array.isArray(value) || value === null) {
                  setDateRange(value);
                }
              }}
              placeholder="Select date range"
              showTwoCalendars={true}
            />
          </FormField>

          <div className="flex gap-3">
            <BasicButton onClick={() => {
              setSingleDate(new Date());
              setDateRange([new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]);
            }}>
              Set Today
            </BasicButton>
            <BasicButton variant="outline" onClick={() => {
              setSingleDate(null);
              setDateRange(null);
            }}>
              Clear Dates
            </BasicButton>
          </div>
        </div>
      </GlobalCard>

      {/* Search Form */}
      <GlobalCard title="Search Form" description="Built-in search with debouncing and suggestions">
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
              suggestions={suggestions}
              onSuggestionClick={(suggestion) => {
                setSearchValue(suggestion);
                console.log("Selected suggestion:", suggestion);
              }}
              placeholder="Search users..."
            />
          </FormField>

          <div className="text-sm text-gray-600">
            <p>Current search value: "{searchValue}"</p>
            <p>Try typing "John" to see suggestions.</p>
          </div>
        </div>
      </GlobalCard>

      {/* Multiple Select Form */}
      <GlobalCard title="Multiple Select Form" description="Advanced multi-select with search and dark mode support">
        <div className="space-y-6">
          <MultipleSelectField
            label="Technical Skills"
            helper="Select your technical skills (max 5 visible)"
            required
            options={skillOptions}
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
            options={languageOptions}
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
            options={skillOptions.slice(0, 5)}
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
            options={skillOptions.slice(0, 8)}
            selectedValues={[]}
            onChange={(values) => console.log("Non-searchable selection:", values)}
            placeholder="Select from dropdown..."
            searchable={false}
            clearable={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm">
              <p className="font-medium mb-2">Selected Skills:</p>
              <div className="space-y-1">
                {selectedSkills.length > 0 ? (
                  selectedSkills.map(skill => (
                    <div key={skill} className="text-muted-foreground">
                      • {skillOptions.find(opt => opt.value === skill)?.label || skill}
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No skills selected</div>
                )}
              </div>
            </div>

            <div className="text-sm">
              <p className="font-medium mb-2">Selected Languages:</p>
              <div className="space-y-1">
                {selectedLanguages.length > 0 ? (
                  selectedLanguages.map(lang => (
                    <div key={lang} className="text-muted-foreground">
                      • {languageOptions.find(opt => opt.value === lang)?.label || lang}
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No languages selected</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlobalCard>

      {/* Stepper Form */}
      <GlobalCard title="Stepper Form" description="Multi-step wizard with validation">
        <StepperForm
          steps={stepperSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onComplete={handleStepperComplete}
          allowSkip={true}
          showProgress={true}
          orientation="horizontal"
        />
      </GlobalCard>

      {/* Custom Styling */}
      <GlobalCard title="Custom Styling" description="Forms with custom CSS classes">
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
              className="bg-gray-900 text-white border-gray-700 focus:border-blue-500"
              options={countries}
              placeholder="Dark theme select"
            />
          </FormField>
        </div>
      </GlobalCard>

      {/* Rich Text Editor */}
      <GlobalCard title="Rich Text Editor" description="WYSIWYG editor with TinyMCE integration">
        <div className="space-y-6">
          <EditorForm
            label="Content Editor"
            value={editorContent}
            onChange={setEditorContent}
            placeholder="Start writing your content..."
            height={300}
            helper="Rich text editor with formatting options"
            maxLength={5000}
          />

          <div className="flex gap-3">
            <BasicButton onClick={() => setEditorContent("<h1>Hello World!</h1><p>This is some <strong>formatted</strong> content.</p>")}>
              Set Sample Content
            </BasicButton>
            <BasicButton variant="outline" onClick={() => setEditorContent("")}>
              Clear Content
            </BasicButton>
          </div>

          <div className="text-sm text-gray-600">
            <p>Current content length: {editorContent.length} characters</p>
            <p>Features: Bold, italic, lists, links, images, tables, and more!</p>
          </div>
        </div>
      </GlobalCard>

      {/* Markdown Editor */}
      <GlobalCard title="Markdown Editor" description="Markdown editor with live preview support">
        <div className="space-y-6">
          <MarkdownEditor
            label="Markdown Content"
            value={markdownContent}
            onChange={(value) => console.log("Markdown changed:", value)}
            placeholder="Write your markdown here..."
            height={400}
            helper="Supports markdown syntax with live preview"
            maxLength={10000}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Quick Reference:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><code>**bold**</code> → <strong>bold</strong></p>
                <p><code>*italic*</code> → <em>italic</em></p>
                <p><code>`code`</code> → <code>code</code></p>
                <p><code># Header</code> → H1 Header</p>
                <p><code>## Header</code> → H2 Header</p>
                <p><code>[link](url)</code> → Link</p>
                <p><code>&gt; quote</code> → Blockquote</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Tips:</h4>
              <div className="text-xs text-blue-600 space-y-1">
                <p>• Use toolbar for quick formatting</p>
                <p>• Paste markdown to auto-convert</p>
                <p>• Preview mode available</p>
                <p>• Supports code blocks and tables</p>
              </div>
            </div>
          </div>
        </div>
      </GlobalCard>
    </div>
  );
}