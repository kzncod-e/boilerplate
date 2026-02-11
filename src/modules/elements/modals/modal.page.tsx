"use client";

import React, { useState } from "react";
import { BasicModal, ModalSize } from "@/components/global/modals/basic-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Settings,
    User,
    FileText,
    AlertCircle,
    CheckCircle,
    X,
    Save,
    Trash2,
    Download,
    Upload,
    Eye,
    Edit,
} from "lucide-react";
import PageHeader from "@/components/global/page-header";
import GlobalCard from "@/components/global/cards/global-card";

export default function ModalPage() {
    const [modals, setModals] = useState({
        small: false,
        normal: false,
        lg: false,
        xl: false,
        full: false,
        customFooter: false,
        form: false,
        confirmation: false,
    });

    const toggleModal = (key: keyof typeof modals) => {
        setModals((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const closeModal = (key: keyof typeof modals) => {
        setModals((prev) => ({ ...prev, [key]: false }));
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Modals page"
                description="Reusable modals components with dynamic props"
            />

            {/* Size Variants */}
            <GlobalCard
                title="Modal Sizes"
                description="Click to see different modal sizes in action"
            >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <Button
                        onClick={() => toggleModal("small")}
                        variant="outline"
                    >
                        Small
                    </Button>
                    <Button
                        onClick={() => toggleModal("normal")}
                        variant="outline"
                    >
                        Normal
                    </Button>
                    <Button onClick={() => toggleModal("lg")} variant="outline">
                        Large
                    </Button>
                    <Button onClick={() => toggleModal("xl")} variant="outline">
                        Extra Large
                    </Button>
                    <Button
                        onClick={() => toggleModal("full")}
                        variant="outline"
                    >
                        Full Page
                    </Button>
                </div>
            </GlobalCard>

            {/* Custom Footer */}
            <GlobalCard
                title="Custom Footer Actions"
                description="Modal with custom React nodes in footer"
            >
                <Button onClick={() => toggleModal("customFooter")}>
                    Open Custom Footer Modal
                </Button>
            </GlobalCard>

            {/* Form Modal */}
            <GlobalCard
                title="Form Modal"
                description="Modal with form content and validation"
            >
                <Button onClick={() => toggleModal("form")}>
                    Open Form Modal
                </Button>
            </GlobalCard>

            {/* Confirmation Modal */}
            <GlobalCard
                title="Confirmation Modal"
                description="Modal for confirmation dialogs"
            >
                <Button
                    onClick={() => toggleModal("confirmation")}
                    variant="destructive"
                >
                    Open Confirmation Modal
                </Button>
            </GlobalCard>

            {/* Size Modals */}
            <BasicModal
                isOpen={modals.small}
                onClose={() => closeModal("small")}
                title="Small Modal"
                description="This is a small modal with minimal content"
                size="small"
            >
                <p className="text-sm ">
                    Small modals are perfect for quick confirmations, alerts, or
                    simple forms.
                </p>
            </BasicModal>

            <BasicModal
                isOpen={modals.normal}
                onClose={() => closeModal("normal")}
                title="Normal Modal"
                description="This is the default modal size"
                size="normal"
            >
                <div className="space-y-4">
                    <p>
                        Normal modals work well for most use cases like forms,
                        detailed information, or standard interactions.
                    </p>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">Default Size</Badge>
                        <Badge variant="outline">Most Common</Badge>
                    </div>
                </div>
            </BasicModal>

            <BasicModal
                isOpen={modals.lg}
                onClose={() => closeModal("lg")}
                title="Large Modal"
                description="This is a large modal for more complex content"
                size="lg"
            >
                <div className="space-y-4">
                    <p>
                        Large modals are suitable for complex forms, data
                        tables, or detailed content that requires more space.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Feature 1</h4>
                            <p className="text-sm ">Description of feature 1</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Feature 2</h4>
                            <p className="text-sm ">Description of feature 2</p>
                        </div>
                    </div>
                </div>
            </BasicModal>

            <BasicModal
                isOpen={modals.xl}
                onClose={() => closeModal("xl")}
                title="Extra Large Modal"
                description="This is an extra large modal for maximum content"
                size="xl"
            >
                <div className="space-y-6">
                    <p>
                        Extra large modals are perfect for dashboards, complex
                        data visualization, or when you need to display a lot of
                        information.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    Card {item}
                                </h4>
                                <p className="text-sm ">
                                    Content for card {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </BasicModal>

            <BasicModal
                isOpen={modals.full}
                onClose={() => closeModal("full")}
                title="Full Page Modal"
                description="This modal takes up almost the entire viewport"
                size="full"
            >
                <div className="space-y-6">
                    <p>
                        Full page modals are ideal for immersive experiences,
                        complex workflows, or when you need maximum screen real
                        estate.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                            <div key={item} className="p-6 border rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    Section {item}
                                </h4>
                                <p className="text-sm ">
                                    This is section {item} with more detailed
                                    content that would benefit from the full
                                    page modal experience.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </BasicModal>

            {/* Custom Footer Modal */}
            <BasicModal
                isOpen={modals.customFooter}
                onClose={() => closeModal("customFooter")}
                title="Custom Footer Modal"
                description="This modal demonstrates custom footer content"
                size="normal"
                footerLeft={
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm ">Auto-save enabled</span>
                    </div>
                }
                footerRight={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => closeModal("customFooter")}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => closeModal("customFooter")}>
                            Save Changes
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p>
                        This modal shows how you can add custom React components
                        to both the left and right sides of the footer.
                    </p>
                    <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                            <p className="text-sm text-yellow-800">
                                The left footer can contain status indicators,
                                while the right footer typically contains action
                                buttons.
                            </p>
                        </div>
                    </div>
                </div>
            </BasicModal>

            {/* Form Modal */}
            <BasicModal
                isOpen={modals.form}
                onClose={() => closeModal("form")}
                title="User Profile"
                description="Edit your profile information"
                size="lg"
                footerLeft={
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">Draft</Badge>
                        <span className="text-sm ">
                            Last saved 2 minutes ago
                        </span>
                    </div>
                }
                footerRight={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => closeModal("form")}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => closeModal("form")}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Profile
                        </Button>
                    </>
                }
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            rows={4}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="newsletter"
                            className="rounded"
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                            Subscribe to newsletter
                        </Label>
                    </div>
                </div>
            </BasicModal>

            {/* Confirmation Modal */}
            <BasicModal
                isOpen={modals.confirmation}
                onClose={() => closeModal("confirmation")}
                title="Delete Confirmation"
                description="Are you sure you want to delete this item? This action cannot be undone."
                size="small"
                showCloseButton={false}
                footerLeft={
                    <div className="flex items-center gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" />
                        <span className="text-sm">
                            This action is permanent
                        </span>
                    </div>
                }
                footerRight={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => closeModal("confirmation")}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => closeModal("confirmation")}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <p className="text-sm text-red-800">
                                Deleting this item will remove all associated
                                data and cannot be recovered.
                            </p>
                        </div>
                    </div>
                    <p className="text-sm ">
                        Please confirm that you want to proceed with this
                        action.
                    </p>
                </div>
            </BasicModal>
        </div>
    );
}
