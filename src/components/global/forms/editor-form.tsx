"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  "advlist autolink lists link image charmap print preview anchor",
  "searchreplace visualblocks code fullscreen",
  "insertdatetime media table paste code help wordcount",
  "markdown"
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
      height = 300,
      menubar = false,
      toolbar = defaultToolbar,
      plugins = defaultPlugins,
      contentStyle = "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; }",
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
    ref
  ) => {
    const editorRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    // Load TinyMCE script
    useEffect(() => {
      if (typeof window !== 'undefined' && !window.tinymce) {
        const apiKey = 'sagkb7tx7pq2nhit92o263uvb1zx7wf0czdhag77ho30zkha';
        const script = document.createElement('script');
        script.src = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6/tinymce.min.js`;
        script.referrerPolicy = 'origin';
        script.async = true;
        
        script.onload = () => {
          setIsLoaded(true);
          setIsLoading(false);
        };
        
        script.onerror = () => {
          console.error('Failed to load TinyMCE');
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
    }, []);

    // Initialize TinyMCE
    useEffect(() => {
      if (!isLoaded || !containerRef.current || editorRef.current) {
        return;
      }

      const initializeEditor = async () => {
        try {
          if (window.tinymce) {
            const editor = await window.tinymce.init({
              target: containerRef.current,
              height,
              menubar,
              toolbar,
              plugins,
              content_style: contentStyle,
              placeholder,
              readonly: readonly || disabled,
              max_chars: maxLength,
              setup: (editor: any) => {
                editorRef.current = editor;
                
                // Set initial value
                if (value) {
                  editor.setContent(value);
                }
                
                // Handle content changes
                editor.on('input change keyup', () => {
                  const content = editor.getContent();
                  onChange?.(content);
                });
                
                // Handle focus events
                editor.on('focus', () => {
                  setIsFocused(true);
                  onFocus?.(editor.getContent());
                });
                
                editor.on('blur', () => {
                  setIsFocused(false);
                  onBlur?.(editor.getContent());
                });
                
                // Handle paste events for markdown
                editor.on('paste', (e: any) => {
                  const content = e.clipboardData.getData('text/plain');
                  // Simple markdown to HTML conversion
                  const html = content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code>$1</code>')
                    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/\n/g, '<br>');
                  
                  e.preventDefault();
                  editor.insertContent(html);
                });
                
                // Call onInit callback
                onInit?.(editor);
              }
            });
          }
        } catch (error) {
          console.error('Failed to initialize TinyMCE:', error);
          setIsLoading(false);
        }
      };

      initializeEditor();

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }, [isLoaded, height, menubar, toolbar, plugins, contentStyle, placeholder, readonly, disabled]);

    // Update editor content when value prop changes
    useEffect(() => {
      if (editorRef.current && value !== editorRef.current.getContent()) {
        editorRef.current.setContent(value || '');
      }
    }, [value]);

    // Handle disabled state
    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.setMode(readonly || disabled ? 'readonly' : 'design');
      }
    }, [readonly, disabled]);

    const renderFallback = () => (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref as any}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          maxLength={maxLength}
          className={cn(
            "w-full min-h-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
        />
        {helper && !error && (
          <p className="text-sm text-gray-500">{helper}</p>
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );

    if (isLoading) {
      return (
        <div className="space-y-2">
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className={cn(
            "w-full rounded-md border border-gray-300 bg-gray-50",
            "flex items-center justify-center",
            "min-h-[200px]",
            className
          )}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading editor...</p>
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
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div
          ref={containerRef}
          className={cn(
            "border rounded-md",
            error && "border-red-500",
            isFocused && "ring-2 ring-blue-500 ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        
        {helper && !error && (
          <p className="text-sm text-gray-500">{helper}</p>
        )}
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        
        {maxLength && (
          <p className="text-xs text-gray-400 text-right">
            {value?.length || 0} / {maxLength} characters
          </p>
        )}
      </div>
    );
  }
);

EditorForm.displayName = "EditorForm";

// Markdown Editor variant
export interface MarkdownEditorProps extends Omit<EditorFormProps, 'plugins' | 'toolbar'> {
  enablePreview?: boolean;
  previewMode?: 'split' | 'tab';
}

export const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  ({ enablePreview = false, previewMode = 'split', ...props }, ref) => {
    const markdownPlugins = [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
      "markdown"
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
        contentStyle={`
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
        `}
      />
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";