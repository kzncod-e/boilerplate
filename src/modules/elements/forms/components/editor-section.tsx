"use client";

import { useState } from "react";
import {
    EditorForm,
    MarkdownEditor,
} from "@/components/global/forms/editor-form";
import GlobalCard from "@/components/global/cards/global-card";
import { BasicButton } from "@/components/global/buttons/basic-button";
import { DEFAULT_MARKDOWN_CONTENT } from "../constants/form-data";

export default function EditorSection() {
    const [editorContent, setEditorContent] = useState("");
    const [markdownContent] = useState(DEFAULT_MARKDOWN_CONTENT);

    return (
        <>
            {/* Rich Text Editor */}
            <GlobalCard
                title="Rich Text Editor"
                description="WYSIWYG editor with TinyMCE integration"
            >
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
                        <BasicButton
                            onClick={() =>
                                setEditorContent(
                                    "<h1>Hello World!</h1><p>This is some <strong>formatted</strong> content.</p>",
                                )
                            }
                        >
                            Set Sample Content
                        </BasicButton>
                        <BasicButton
                            variant="outline"
                            onClick={() => setEditorContent("")}
                        >
                            Clear Content
                        </BasicButton>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p>
                            Current content length: {editorContent.length}{" "}
                            characters
                        </p>
                        <p>
                            Features: Bold, italic, lists, links, images,
                            tables, and more!
                        </p>
                    </div>
                </div>
            </GlobalCard>

            {/* Markdown Editor */}
            <GlobalCard
                title="Markdown Editor"
                description="Markdown editor with live preview support"
            >
                <div className="space-y-6">
                    <MarkdownEditor
                        label="Markdown Content"
                        value={markdownContent}
                        onChange={(value) =>
                            console.log("Markdown changed:", value)
                        }
                        placeholder="Write your markdown here..."
                        height={400}
                        helper="Supports markdown syntax with live preview"
                        maxLength={10000}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">
                                Quick Reference:
                            </h4>
                            <div className="text-xs text-gray-600 space-y-1">
                                <p>
                                    <code>**bold**</code> →{" "}
                                    <strong>bold</strong>
                                </p>
                                <p>
                                    <code>*italic*</code> → <em>italic</em>
                                </p>
                                <p>
                                    <code>`code`</code> → <code>code</code>
                                </p>
                                <p>
                                    <code># Header</code> → H1 Header
                                </p>
                                <p>
                                    <code>## Header</code> → H2 Header
                                </p>
                                <p>
                                    <code>[link](url)</code> → Link
                                </p>
                                <p>
                                    <code>&gt; quote</code> → Blockquote
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">
                                Tips:
                            </h4>
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
        </>
    );
}
