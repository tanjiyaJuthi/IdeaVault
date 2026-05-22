"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authClient } from "@/app/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const IdeaEditPage = () => {
    const [submitError, setSubmitError] = useState("");
    const params = useParams();
    const router = useRouter();
    const ideaId = params?.id;

    const [loading, setLoading] = useState(false);
    const [ideaLoading, setIdeaLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const inputClass =
        "w-full border border-gray-200 rounded-lg px-3 py-6 focus:outline-none";
    const textareaClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none min-h-[120px]";

    const form = useForm({
        defaultValues: {
        ideaTitle: "",
        shortDescription: "",
        detailedDescription: "",
        category: "",
        tags: "",
        imageUrl: "",
        estimatedBudget: "",
        targetAudience: "",
        problemStatement: "",
        proposedSolution: "",
        },
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/category`
                );

                const data = await res.json();
                setCategories(data.data);
            } catch (err) {
                console.error("Failed to load categories:", err);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

  const { reset } = form;

  useEffect(() => {
    if (!ideaId) return;

    const fetchIdea = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${ideaId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );

        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message || "Failed to load idea");
          return;
        }

        const idea = result.data;

        reset({
          ideaTitle: idea.ideaTitle || "",
          shortDescription: idea.shortDescription || "",
          detailedDescription: idea.detailedDescription || "",
          category: idea.category || "",
          tags: idea.tags?.join(", ") || "",
          imageUrl: idea.imageUrl || "",
          estimatedBudget: idea.estimatedBudget || "",
          targetAudience: idea.targetAudience || "",
          problemStatement: idea.problemStatement || "",
          proposedSolution: idea.proposedSolution || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch idea");
      } finally {
        setIdeaLoading(false);
      }
    };

    fetchIdea();
  }, [ideaId, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();

      const payload = {
        ...data,
        tags: data.tags
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${ideaId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Update failed");
        return;
      }

      toast.success("Idea updated successfully");
      router.push("/my-ideas");
      router.refresh();
    } catch (error) {
        console.error("Add idea error:", error.message);
        setSubmitError(error.message || "Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (ideaLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="">
        <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center">
                    Update your Idea and let us know!
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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* TITLE */}
                <FormField
                control={form.control}
                name="ideaTitle"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Idea Title</FormLabel>
                    <FormControl>
                        <Input className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* CATEGORY */}
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
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full py-6 px-3 rounded-lg border-stone-200 bg-white focus:ring-0">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent className="bg-white border-transparent! z-9999!">
                                    {loadingCategories ? (
                                        <SelectItem value="loading" disabled>
                                            Loading categories...
                                        </SelectItem>
                                    ) : (
                                        categories.map((cat) => (
                                            <SelectItem key={cat.name} value={cat.name}>
                                                {cat.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* TARGET */}
                <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                        <Input className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* BUDGET */}
                <FormField
                control={form.control}
                name="estimatedBudget"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                        <Input type="number" className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* IMAGE */}
                <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                        <Input className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* TAGS */}
                <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                        <Input className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* PROBLEM */}
                <FormField
                control={form.control}
                name="problemStatement"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Problem Statement</FormLabel>
                    <FormControl>
                        <Input className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* SOLUTION */}
                <FormField
                control={form.control}
                name="proposedSolution"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Proposed Solution</FormLabel>
                    <FormControl>
                        <Input className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* SHORT DESC */}
                <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                        <Input className={inputClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* LONG DESC */}
                <FormField
                control={form.control}
                name="detailedDescription"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                        <Textarea className={textareaClass} {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                {/* ACTIONS */}
                <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button
                    className="h-12 p-6"
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/my-ideas")}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 p-6 bg-[#590626] text-white hover:bg-black"
                >
                    {loading ? "Updating..." : "Update Idea"}
                </Button>
                </div>
            </form>
            </Form>
        </div>
    </div>
  );
};

export default IdeaEditPage;
