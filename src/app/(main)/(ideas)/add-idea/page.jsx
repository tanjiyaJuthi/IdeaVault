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
import { useEffect, useState } from "react";

const AddIdeaPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/category`
            );

            const data = await res.json();
            setCategories(data.data || []);
            } catch (err) {
            console.error("Failed to load categories:", err);
            } finally {
            setLoadingCategories(false);
            }
        };

        fetchCategories();
        }, []);

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
            <div className="bg-linear-to-r from-white to-[#fff4f8] relative overflow-hidden pt-32 pb-40">

                {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">

                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-5 py-4 rounded-lg bg-white/70 backdrop-blur-xl border border-pink-100 shadow-md mb-8">
                <span className="w-2 h-2 rounded-lg bg-[#810B38] animate-pulse"></span>

                <span className="text-sm font-semibold tracking-wide text-[#810B38]">
                    Idea Submission
                </span>
                </div>

                {/* HEADING */}
                <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">
                Add your{" "}
                <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Idea
                </span>{" "}
                and let us know!
                </h2>

                {/* SUBTEXT */}
                <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-zinc-500">
                Share your startup idea with the community. Every great product starts with a single idea worth expressing.
                </p>

            </div>

            {/* MODERN CURVE */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="relative block w-full h-[220px]"
          >
            <path
              fill="#fff4f8"
              d="M0,64 C180,220 420,260 720,220 C1020,180 1260,40 1440,140 L1440,320 L0,320 Z"
            />
          </svg>
        </div>

            </div>

            <div className="text-base mx-auto max-w-7xl p-10 shadow-sm my-20 rounded-lg">
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

                                            <SelectContent className="bg-white">
                                                {categories?.map((category, index) => (
                                                    <SelectItem
                                                    key={category?._id || `${category?.name}-${index}`}
                                                    value={String(category?.name)}
                                                    >
                                                    {category?.name}
                                                    </SelectItem>
                                                ))}
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