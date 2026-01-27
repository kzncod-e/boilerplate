"use client";

import React, { useState } from "react";
import { BasicButton, ButtonVariant, ButtonSize, ButtonRounded } from "@/components/global/buttons/basic-button";
import { GroupedButton } from "@/components/global/buttons/grouped-button";
import { ActionButton } from "@/components/global/buttons/action-button";
import GlobalCard from "@/components/global/cards/global-card";
import PageHeader from "@/components/global/page-header";
import { 
  Save, 
  Trash2, 
  Download, 
  Upload, 
  Edit, 
  Plus, 
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Check,
  X,
  AlertTriangle,
  Info,
  RefreshCw
} from "lucide-react";

export default function ButtonPage() {
  const [selectedGroup, setSelectedGroup] = useState("option1");
  const [selectedMultiple, setSelectedMultiple] = useState("option1,option3");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  // Grouped button options
  const horizontalOptions = [
    { id: "option1", label: "Option 1", icon: <User className="h-4 w-4" /> },
    { id: "option2", label: "Option 2", icon: <Mail className="h-4 w-4" /> },
    { id: "option3", label: "Option 3", icon: <Phone className="h-4 w-4" /> },
  ];

  const verticalOptions = [
    { id: "view", label: "View", icon: <Info className="h-4 w-4" /> },
    { id: "edit", label: "Edit", icon: <Edit className="h-4 w-4" /> },
    { id: "delete", label: "Delete", icon: <Trash2 className="h-4 w-4" /> },
  ];

  const iconOnlyOptions = [
    { id: "user", label: "", icon: <User className="h-4 w-4" /> },
    { id: "mail", label: "", icon: <Mail className="h-4 w-4" /> },
    { id: "phone", label: "", icon: <Phone className="h-4 w-4" /> },
  ];

  // Action handlers
  const handleSave = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved successfully!");
        resolve();
      }, 2000);
    });
  };

  const handleDelete = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Deleted successfully!");
        resolve();
      }, 1500);
    });
  };

  const handleDownload = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Downloaded successfully!");
        resolve();
      }, 1000);
    });
  };

  const handleLoadingToggle = (key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: !prev[key] }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buttons"
        description="Comprehensive button components with various styles and interactions"
      />

      {/* Basic Buttons */}
      <GlobalCard title="Basic Buttons" description="Individual buttons with different variants and styles">
        <div className="space-y-6">
          {/* Color Variants */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Color Variants</h4>
            <div className="flex flex-wrap gap-3">
              <BasicButton variant="default">Default</BasicButton>
              <BasicButton variant="primary">Primary</BasicButton>
              <BasicButton variant="secondary">Secondary</BasicButton>
              <BasicButton variant="success">Success</BasicButton>
              <BasicButton variant="warning">Warning</BasicButton>
              <BasicButton variant="danger">Danger</BasicButton>
              <BasicButton variant="info">Info</BasicButton>
              <BasicButton variant="ghost">Ghost</BasicButton>
              <BasicButton variant="outline">Outline</BasicButton>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <BasicButton size="xs">Extra Small</BasicButton>
              <BasicButton size="sm">Small</BasicButton>
              <BasicButton size="md">Medium</BasicButton>
              <BasicButton size="lg">Large</BasicButton>
              <BasicButton size="xl">Extra Large</BasicButton>
            </div>
          </div>

          {/* Rounded Variants */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Rounded Variants</h4>
            <div className="flex flex-wrap gap-3">
              <BasicButton rounded="none">None</BasicButton>
              <BasicButton rounded="sm">Small</BasicButton>
              <BasicButton rounded="md">Medium</BasicButton>
              <BasicButton rounded="lg">Large</BasicButton>
              <BasicButton rounded="full">Full</BasicButton>
            </div>
          </div>

          {/* Icons */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <BasicButton leftIcon={<Save className="h-4 w-4" />}>
                Save
              </BasicButton>
              <BasicButton rightIcon={<Download className="h-4 w-4" />}>
                Download
              </BasicButton>
              <BasicButton leftIcon={<Upload className="h-4 w-4" />} rightIcon={<Plus className="h-4 w-4" />}>
                Upload
              </BasicButton>
              <BasicButton leftIcon={<User className="h-4 w-4" />} rounded="full">
                Profile
              </BasicButton>
            </div>
          </div>

          {/* Loading States */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Loading States</h4>
            <div className="flex flex-wrap gap-3">
              <BasicButton 
                loading={loadingStates.save}
                onClick={() => handleLoadingToggle("save")}
              >
                Save
              </BasicButton>
              <BasicButton 
                loading={loadingStates.download}
                onClick={() => handleLoadingToggle("download")}
                variant="secondary"
              >
                Download
              </BasicButton>
              <BasicButton 
                loading={loadingStates.delete}
                onClick={() => handleLoadingToggle("delete")}
                variant="danger"
              >
                Delete
              </BasicButton>
            </div>
          </div>

          {/* Full Width */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Full Width</h4>
            <div className="space-y-3 max-w-md">
              <BasicButton fullWidth>Full Width Button</BasicButton>
              <BasicButton fullWidth variant="outline">Full Width Outline</BasicButton>
            </div>
          </div>
        </div>
      </GlobalCard>

      {/* Grouped Buttons */}
      <GlobalCard title="Grouped Buttons" description="Connected buttons with selection states">
        <div className="space-y-6">
          {/* Horizontal with Icons */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Horizontal with Icons</h4>
            <GroupedButton
              options={horizontalOptions}
              selected={selectedGroup}
              onSelectionChange={setSelectedGroup}
              variant="outline"
              size="md"
            />
          </div>

          {/* Horizontal Labels Only */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Horizontal Labels Only</h4>
            <GroupedButton
              options={horizontalOptions}
              selected={selectedGroup}
              onSelectionChange={setSelectedGroup}
              variant="outline"
              size="md"
              showIcons={false}
            />
          </div>

          {/* Vertical */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Vertical Group</h4>
            <div className="flex gap-6">
              <GroupedButton
                options={verticalOptions}
                selected="view"
                variant="outline"
                size="sm"
                orientation="vertical"
              />
              <GroupedButton
                options={verticalOptions}
                selected="edit"
                variant="primary"
                size="md"
                orientation="vertical"
              />
            </div>
          </div>

          {/* Multiple Selection */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Multiple Selection</h4>
            <GroupedButton
              options={horizontalOptions}
              selectedIds={selectedMultiple.split(",")}
              onSelectionChange={setSelectedMultiple}
              variant="outline"
              size="md"
              allowMultiple={true}
            />
          </div>

          {/* Icon Only */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Icon Only</h4>
            <GroupedButton
              options={iconOnlyOptions}
              selected="user"
              variant="outline"
              size="md"
            />
          </div>

          {/* Full Width */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Full Width</h4>
            <GroupedButton
              options={horizontalOptions}
              selected={selectedGroup}
              onSelectionChange={setSelectedGroup}
              variant="outline"
              size="md"
              fullWidth={true}
            />
          </div>
        </div>
      </GlobalCard>

      {/* Action Buttons */}
      <GlobalCard title="Action Buttons" description="Buttons with async actions and confirmations">
        <div className="space-y-6">
          {/* Simple Action */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Simple Action</h4>
            <div className="flex flex-wrap gap-3">
              <ActionButton
                action={handleSave}
                leftIcon={<Save className="h-4 w-4" />}
                successText="Saved!"
              >
                Save Document
              </ActionButton>
              <ActionButton
                action={handleDownload}
                leftIcon={<Download className="h-4 w-4" />}
                variant="secondary"
                successText="Downloaded!"
              >
                Download File
              </ActionButton>
            </div>
          </div>

          {/* With Confirmation */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">With Confirmation</h4>
            <div className="flex flex-wrap gap-3">
              <ActionButton
                action={handleDelete}
                leftIcon={<Trash2 className="h-4 w-4" />}
                variant="danger"
                showConfirmation={true}
                confirmTitle="Delete Item"
                confirmText="Are you sure you want to delete this item? This action cannot be undone."
                successText="Deleted!"
                loadingText="Deleting..."
              >
                Delete Item
              </ActionButton>
              <ActionButton
                action={handleSave}
                leftIcon={<RefreshCw className="h-4 w-4" />}
                variant="warning"
                showConfirmation={true}
                confirmTitle="Reset Changes"
                confirmText="This will reset all unsaved changes. Continue?"
                successText="Reset Complete!"
                loadingText="Resetting..."
              >
                Reset Changes
              </ActionButton>
            </div>
          </div>

          {/* Auto Reset */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Auto Reset After Success</h4>
            <div className="flex flex-wrap gap-3">
              <ActionButton
                action={handleSave}
                leftIcon={<Check className="h-4 w-4" />}
                variant="success"
                successText="Completed!"
                resetAfterSuccess={true}
                resetDelay={3000}
              >
                Complete Task
              </ActionButton>
            </div>
          </div>
        </div>
      </GlobalCard>

      {/* Custom Styling */}
      <GlobalCard title="Custom Styling" description="Buttons with custom CSS classes">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Classes</h4>
            <div className="flex flex-wrap gap-3">
              <BasicButton 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
              >
                Gradient Button
              </BasicButton>
              <BasicButton 
                variant="outline"
                className="border-2 border-dashed border-gray-400 text-gray-600 hover:border-gray-600"
              >
                Dashed Border
              </BasicButton>
              <BasicButton 
                className="bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                Dark Shadow
              </BasicButton>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <BasicButton className="h-6 px-2 text-xs">Tiny</BasicButton>
              <BasicButton className="h-20 px-8 text-xl">Extra Large</BasicButton>
              <BasicButton className="w-32 h-32 rounded-full flex flex-col items-center justify-center">
                <div className="text-2xl mb-1">🚀</div>
                <div>Launch</div>
              </BasicButton>
            </div>
          </div>
        </div>
      </GlobalCard>
    </div>
  );
}