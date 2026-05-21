"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddIdeaPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");


    const form = useForm({
        defaultValues: {
            ideaTitle: "",
            shortDescription: "",
            category: "",
            tags: "",
            imageUrl: "",
            estimatedBudget: "",
            problemStatement: "",
            proposedSolution: "",
            detailedDescription: "",
            targetAudience: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setSubmitError("");

    try {
        const payload = {
            ...data,
            tags: data.tags
                ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [],
        };

        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || "Failed to create idea");
        }

        router.replace("/my-ideas");
        router.refresh();

        form.reset();
    } catch (error) {
        console.error("Add idea error:", error.message);
        setSubmitError(error.message || "Something went wrong");
    }
};

    return (
        <div className="">
            <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-center">
                        Add your Idea and let us know!
                    </h2>
                </div>
            </div>

            <div className="mx-auto max-w-7xl p-10 shadow-sm mb-20 rounded-lg">
                {submitError && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                        {submitError}
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="ideaTitle"
                                rules={{
                                    required: "Title is required",
                                    minLength: {
                                        value: 6,
                                        message: "Title must be at least 6 characters",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Idea Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Idea Title" {...field}
                                                    className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:shadow-none focus-visible:border-[#560625]"
                                                />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="targetAudience"
                                rules={{
                                    required: "Target Audience is required",
                                    minLength: {
                                        value: 5,
                                        message: "Target Audience must be at least 5 characters",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target Audience</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Target Audience" {...field}
                                                    className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:shadow-none focus-visible:border-[#560625]"
                                                />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                rules={{
                                    required: "Category is required",
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>

                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value || ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full py-6 px-3 rounded-lg border-stone-200 bg-white focus:ring-0">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent className="bg-white border-transparent!">
                                                <SelectItem value="Beach">Beach</SelectItem>
                                                <SelectItem value="Mountain">Mountain</SelectItem>
                                                <SelectItem value="City">City</SelectItem>
                                                <SelectItem value="Adventure">Adventure</SelectItem>
                                                <SelectItem value="Cultural">Cultural</SelectItem>
                                                <SelectItem value="Luxury">Luxury</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tags"
                                rules={{
                                    required: "Tags are required",
                                    validate: (value) =>
                                    value?.length > 0 || "Please add at least one tag",
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Tags (comma separated)</FormLabel>

                                    <FormControl>
                                        <Input
                                        placeholder="AI, startup, education"
                                        className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:border-[#560625]"
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>

                                        <FormControl>
                                            <Input
                                            placeholder="Enter Image Url"
                                            {...field}
                                            className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:border-[#560625]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="estimatedBudget"
                                type="number"
                                rules={{
                                    required: "Estimated Budget is required",
                                    validate: (v) =>
                                        v && v.toString().length >= 3 || "Minimum 3 digits required"
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estimated Budget</FormLabel>

                                        <FormControl>
                                            <Input
                                            placeholder="Enter Estimated Budget"
                                            {...field}
                                            className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:border-[#560625]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="problemStatement"
                                rules={{
                                    required: "Problem Statement is required",
                                    minLength: {
                                        value: 10,
                                        message: "Problem Statement must be at least 10 characters",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Problem Statement</FormLabel>

                                        <FormControl>
                                            <Input
                                            placeholder="Enter Problem Statement"
                                            {...field}
                                            className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:border-[#560625]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="proposedSolution"
                                rules={{
                                    required: "Proposed Solution is required",
                                    minLength: {
                                        value: 10,
                                        message: "Proposed Solution must be at least 10 characters",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Proposed Solution</FormLabel>

                                        <FormControl>
                                            <Input
                                            placeholder="Enter Proposed Solution"
                                            {...field}
                                            className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:border-[#560625]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="md:col-span-2">
                                <FormField
                                control={form.control}
                                name="shortDescription"
                                rules={{
                                    required: "Short Description is required",
                                    minLength: {
                                        value: 10,
                                        message: "Short Description must be at least 10 characters",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Short Description" {...field}
                                                    className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:shadow-none focus-visible:border-[#560625]"
                                                />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>

                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="detailedDescription"
                                    rules={{
                                        required: "Detailed Description is required",
                                        minLength: {
                                        value: 20,
                                        message: "Detailed Description must be at least 20 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Detailed Description</FormLabel>

                                        <FormControl>
                                            <Textarea
                                            placeholder="Enter detailed description..."
                                            {...field}
                                            className="min-h-25 rounded-lg shadow-none border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus-visible:border-[#560625]"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Button 
                                    type="submit"
                                    className="text-md w-full py-6 bg-[#f8eae2] hover:bg-slate-900 hover:text-white text-slate-900"
                                >
                                    Add your Idea
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddIdeaPage;