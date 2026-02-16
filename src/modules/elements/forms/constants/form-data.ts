export const SUGGESTIONS = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
    "Diana Prince",
    "Edward Norton",
    "Fiona Apple",
];

export const COUNTRIES = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
];

export const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

export const INTEREST_OPTIONS = [
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "travel", label: "Travel" },
];

export const SKILL_OPTIONS = [
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
    { value: "kotlin", label: "Kotlin" },
];

export const LANGUAGE_OPTIONS = [
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
    { value: "italian", label: "Italian" },
];

export const EXPERIENCE_OPTIONS = [
    { value: "0-2", label: "0-2 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "6-10", label: "6-10 years" },
    { value: "10+", label: "10+ years" },
];

export const INITIAL_FORM_DATA = {
    name: "",
    email: "",
    phone: "",
    message: "",
    country: "",
    gender: "",
    interests: [] as string[],
    newsletter: false,
};

export const DEFAULT_MARKDOWN_CONTENT = `# Welcome to Markdown EditorVisit [GitHub](https://github.com) for more information!`;
