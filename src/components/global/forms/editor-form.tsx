"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BasicButton } from "@/components/global/buttons/basic-button";

declare global {
    interface Window {
        tinymce: any;
    }
}

export interface EditorFormProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    height?: number;
    menubar?: boolean;
    toolbar?: string | boolean;
    plugins?: string[];
    contentStyle?: string;
    className?: string;
    error?: boolean;
    helper?: string;
    label?: string;
    required?: boolean;
    maxLength?: number;
    onInit?: (editor: any) => void;
    onBlur?: (value: string) => void;
    onFocus?: (value: string) => void;
}

const defaultPlugins = [
    "advlist autolink lists link image charmap preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste help wordcount",
];

const defaultToolbar = `
  undo redo | formatselect | bold italic backcolor | 
  alignleft aligncenter alignright alignjustify | 
  bullist numlist outdent indent | removeformat | help |
  link image | code | fullscreen | preview
`;

export const EditorForm = forwardRef<HTMLDivElement, EditorFormProps>(
    (
        {
            value = "",
            onChange,
            placeholder = "Start typing...",
            disabled = false,
            readonly = false,
            height = 400,
            menubar = true,
            toolbar = defaultToolbar,
            plugins = defaultPlugins,
            contentStyle,
            className,
            error = false,
            helper,
            label,
            required = false,
            maxLength,
            onInit,
            onBlur,
            onFocus,
        },
        ref,
    ) => {
        const [isClient, setIsClient] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);
        const editorRef = useRef<any>(null);
        const [isFocused, setIsFocused] = useState(false);
        const [isLoaded, setIsLoaded] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        // Ensure we're on the client side
        useEffect(() => {
            setIsClient(true);
        }, []);

        // Load TinyMCE script
        useEffect(() => {
            if (!isClient) return;

            if (typeof window !== "undefined" && !window.tinymce) {
                const apiKey =
                    "sagkb7tx7pq2nhit92o263uvb1zx7wf0czdhag77ho30zkha";
                const script = document.createElement("script");
                script.src = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6/tinymce.min.js`;
                script.referrerPolicy = "origin";
                script.async = true;

                script.onload = () => {
                    setIsLoaded(true);
                    setIsLoading(false);

                    // Suppress TinyMCE plugin loading errors and network errors
                    const originalConsoleError = console.error;
                    const originalConsoleWarn = console.warn;

                    console.error = (...args) => {
                        const message = args[0];
                        if (
                            typeof message === "string" &&
                            (message.includes("Failed to load plugin") ||
                                message.includes("net::ERR_ABORTED 404") ||
                                message.includes("plugin.min.js"))
                        ) {
                            return; // Suppress plugin loading and network errors
                        }
                        originalConsoleError.apply(console, args);
                    };

                    console.warn = (...args) => {
                        const message = args[0];
                        if (
                            typeof message === "string" &&
                            (message.includes("Failed to load plugin") ||
                                message.includes("plugin.min.js"))
                        ) {
                            return; // Suppress plugin loading warnings
                        }
                        originalConsoleWarn.apply(console, args);
                    };
                };

                script.onerror = () => {
                    console.error("Failed to load TinyMCE");
                    setIsLoading(false);
                };

                document.head.appendChild(script);

                return () => {
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                };
            } else {
                setIsLoaded(true);
                setIsLoading(false);
            }
        }, [isClient]);

        // Initialize TinyMCE
        useEffect(() => {
            if (!isLoaded || !containerRef.current || editorRef.current) {
                return;
            }

            const initializeEditor = async () => {
                try {
                    if (window.tinymce) {
                        // Check if dark mode is active
                        const isDarkMode =
                            document.documentElement.classList.contains("dark");

                        // Enhanced content style with dark mode support
                        const enhancedContentStyle =
                            contentStyle ||
                            `
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                font-size: 14px; 
                line-height: 1.6; 
                color: ${isDarkMode ? "#e5e7eb" : "#323233ff"};
                background-color: ${isDarkMode ? "#1f2937" : "#ffffff"};
              }
              h1, h2, h3, h4, h5, h6 { color: ${isDarkMode ? "#f3f4f6" : "#111827"}; }
              p { color: ${isDarkMode ? "#d1d5db" : "#374151"}; }
              code { 
                background-color: ${isDarkMode ? "#374151" : "#f3f4f6"}; 
                color: ${isDarkMode ? "#f9fafb" : "#111827"};
                padding: 2px 4px; 
                border-radius: 3px; 
              }
              pre { 
                background-color: ${isDarkMode ? "#374151" : "#f3f4f6"}; 
                color: ${isDarkMode ? "#f9fafb" : "#111827"};
                padding: 16px; 
                border-radius: 6px; 
                overflow-x: auto; 
              }
              pre code { background: none; padding: 0; }
              blockquote { 
                border-left: 4px solid ${isDarkMode ? "#6b7280" : "#d1d5db"}; 
                margin-left: 0; 
                padding-left: 16px; 
                color: ${isDarkMode ? "#9ca3af" : "#6b7280"}; 
              }
              a { color: ${isDarkMode ? "#60a5fa" : "#2563eb"}; }
              table { border-collapse: collapse; width: 100%; }
              th, td { 
                border: 1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}; 
                padding: 8px; 
                text-align: left; 
              }
              th { 
                background-color: ${isDarkMode ? "#374151" : "#f9fafb"}; 
                font-weight: bold; 
              }
            `;

                        const editor = await window.tinymce.init({
                            target: containerRef.current,
                            height,
                            menubar,
                            toolbar,
                            plugins: plugins
                                .filter((plugin) => plugin)
                                .join(" "), // Convert to space-separated string
                            content_style: enhancedContentStyle,
                            placeholder,
                            readonly: readonly || disabled,
                            max_chars: maxLength,
                            skin: isDarkMode ? "oxide-dark" : "oxide",
                            content_css: isDarkMode ? "dark" : "default",
                            convert_urls: false,
                            relative_urls: false,
                            remove_script_host: false,
                            // Add CDN configuration to prevent plugin loading errors
                            external_plugins: {},
                            plugin_base_urls: {},
                            // Disable automatic plugin loading from URLs
                            forced_root_block: "p",
                            branding: false,
                            statusbar: true,
                            // Prevent plugin loading errors
                            init_instance_callback: (editor: any) => {
                                console.log(
                                    "TinyMCE editor initialized successfully",
                                );
                            },
                            // Handle plugin loading errors gracefully
                            plugins_url: "",
                            // Disable problematic plugins that might not exist
                            removed_menuitems: "print",
                            setup: (editor: any) => {
                                editorRef.current = editor;

                                // Set initial value
                                if (value) {
                                    editor.setContent(value);
                                }

                                // Handle content changes
                                editor.on("input change keyup", () => {
                                    const content = editor.getContent();
                                    onChange?.(content);
                                });

                                // Handle focus events
                                editor.on("focus", () => {
                                    setIsFocused(true);
                                    onFocus?.(editor.getContent());
                                });

                                editor.on("blur", () => {
                                    setIsFocused(false);
                                    onBlur?.(editor.getContent());
                                });

                                // Handle paste events for markdown
                                editor.on("paste", (e: any) => {
                                    const content =
                                        e.clipboardData.getData("text/plain");
                                    // Simple markdown to HTML conversion
                                    const html = content
                                        .replace(
                                            /\*\*(.*?)\*\*/g,
                                            "<strong>$1</strong>",
                                        )
                                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                                        .replace(/`(.*?)`/g, "<code>$1</code>")
                                        .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                                        .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                                        .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                                        .replace(/\n/g, "<br>");

                                    e.preventDefault();
                                    editor.insertContent(html);
                                });

                                // Call onInit callback
                                onInit?.(editor);

                                // Listen for dark mode changes
                                const observer = new MutationObserver(
                                    (mutations) => {
                                        mutations.forEach((mutation) => {
                                            if (
                                                mutation.type ===
                                                    "attributes" &&
                                                mutation.attributeName ===
                                                    "class"
                                            ) {
                                                const isDarkMode =
                                                    document.documentElement.classList.contains(
                                                        "dark",
                                                    );
                                                const newContentStyle =
                                                    contentStyle ||
                                                    `
                        body { 
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                          font-size: 14px; 
                          line-height: 1.6; 
                          color: ${isDarkMode ? "#e5e7eb" : "#1f2937"};
                          background-color: ${isDarkMode ? "#1f2937" : "#ffffff"};
                        }
                        h1, h2, h3, h4, h5, h6 { color: ${isDarkMode ? "#f3f4f6" : "#111827"}; }
                        p { color: ${isDarkMode ? "#d1d5db" : "#374151"}; }
                        code { 
                          background-color: ${isDarkMode ? "#374151" : "#f3f4f6"}; 
                          color: ${isDarkMode ? "#f9fafb" : "#111827"};
                          padding: 2px 4px; 
                          border-radius: 3px; 
                        }
                        pre { 
                          background-color: ${isDarkMode ? "#374151" : "#f3f4f6"}; 
                          color: ${isDarkMode ? "#f9fafb" : "#111827"};
                          padding: 16px; 
                          border-radius: 6px; 
                          overflow-x: auto; 
                        }
                        pre code { background: none; padding: 0; }
                        blockquote { 
                          border-left: 4px solid ${isDarkMode ? "#6b7280" : "#d1d5db"}; 
                          margin-left: 0; 
                          padding-left: 16px; 
                          color: ${isDarkMode ? "#9ca3af" : "#6b7280"}; 
                        }
                        a { color: ${isDarkMode ? "#60a5fa" : "#2563eb"}; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { 
                          border: 1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}; 
                          padding: 8px; 
                          text-align: left; 
                        }
                        th { 
                          background-color: ${isDarkMode ? "#374151" : "#f9fafb"}; 
                          font-weight: bold; 
                        }
                      `;

                                                // Update editor content style
                                                editor.dom.addStyle(
                                                    newContentStyle,
                                                );

                                                // Update editor skin if needed
                                                if (
                                                    editor.editorManager &&
                                                    editor.editorManager.theme
                                                ) {
                                                    editor.editorManager.theme.switchSkin(
                                                        isDarkMode
                                                            ? "oxide-dark"
                                                            : "oxide",
                                                    );
                                                }
                                            }
                                        });
                                    },
                                );

                                observer.observe(document.documentElement, {
                                    attributes: true,
                                    attributeFilter: ["class"],
                                });

                                // Store observer for cleanup
                                (editor as any).darkModeObserver = observer;
                            },
                        });
                    }
                } catch (error) {
                    console.error("Failed to initialize TinyMCE:", error);
                    setIsLoading(false);
                }
            };

            initializeEditor();

            return () => {
                if (editorRef.current) {
                    // Clean up dark mode observer
                    if ((editorRef.current as any).darkModeObserver) {
                        (
                            editorRef.current as any
                        ).darkModeObserver.disconnect();
                    }
                    editorRef.current.destroy();
                    editorRef.current = null;
                }
            };
        }, [
            isLoaded,
            height,
            menubar,
            toolbar,
            plugins,
            contentStyle,
            placeholder,
            readonly,
            disabled,
        ]);

        // Update editor content when value prop changes
        useEffect(() => {
            if (editorRef.current && value !== editorRef.current.getContent()) {
                editorRef.current.setContent(value || "");
            }
        }, [value]);

        // Handle disabled state
        useEffect(() => {
            if (editorRef.current) {
                editorRef.current.setMode(
                    readonly || disabled ? "readonly" : "design",
                );
            }
        }, [readonly, disabled]);

        const renderFallback = () => (
            <div className="space-y-2">
                {label && (
                    <Label>
                        {label}
                        {required && (
                            <span className="text-destructive ml-1">*</span>
                        )}
                    </Label>
                )}
                <Textarea
                    ref={ref as any}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readonly}
                    maxLength={maxLength}
                    className={cn(
                        "min-h-[200px]",
                        error &&
                            "border-destructive focus-visible:ring-destructive/20",
                    )}
                />
                {helper && !error && (
                    <p className="text-sm text-muted-foreground">{helper}</p>
                )}
                {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
        );

        if (isLoading) {
            return (
                <div className="space-y-2">
                    {label && (
                        <Label>
                            {label}
                            {required && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </Label>
                    )}
                    <div
                        className={cn(
                            "w-full rounded-md border border-input bg-muted/50",
                            "flex items-center justify-center",
                            "min-h-[200px]",
                        )}
                    >
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p className="text-sm text-muted-foreground">
                                Loading editor...
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        if (!isLoaded) {
            return renderFallback();
        }

        return (
            <div className={cn("space-y-2", className)}>
                {label && (
                    <Label>
                        {label}
                        {required && (
                            <span className="text-destructive ml-1">*</span>
                        )}
                    </Label>
                )}

                <div
                    ref={containerRef}
                    className={cn(
                        "border rounded-md",
                        error && "border-destructive",
                        isFocused && "ring-2 ring-ring/20 ring-offset-2",
                        disabled && "opacity-50 cursor-not-allowed",
                    )}
                />

                {helper && !error && (
                    <p className="text-sm text-muted-foreground">{helper}</p>
                )}

                {error && <p className="text-sm text-destructive">{error}</p>}

                {maxLength && (
                    <p className="text-sm text-muted-foreground text-right">
                        {value?.length || 0} / {maxLength} characters
                    </p>
                )}
            </div>
        );
    },
);

EditorForm.displayName = "EditorForm";

// Markdown Editor variant
export interface MarkdownEditorProps
    extends Omit<EditorFormProps, "plugins" | "toolbar"> {
    enablePreview?: boolean;
    previewMode?: "split" | "tab";
}

export const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
    ({ enablePreview = false, previewMode = "split", ...props }, ref) => {
        const markdownPlugins = [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
        ];

        const markdownToolbar = `
      undo redo | formatselect | bold italic | 
      bullist numlist | link image | code | preview |
      h1 h2 h3 | blockquote | hr
    `;

        return (
            <EditorForm
                ref={ref}
                {...props}
                plugins={markdownPlugins}
                toolbar={markdownToolbar}
                contentStyle={
                    props.contentStyle ||
                    `
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            font-size: 14px; 
            line-height: 1.6; 
          }
          h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
          h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; }
          h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; }
          blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 16px; color: #666; }
          code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
          pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
          pre code { background: none; padding: 0; }
        `
                }
            />
        );
    },
);

MarkdownEditor.displayName = "MarkdownEditor";
