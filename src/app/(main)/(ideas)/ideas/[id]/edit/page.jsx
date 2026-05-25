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
        <div className="bg-linear-to-r from-white to-[#fff4f8] relative overflow-hidden pt-28 pb-40">

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">

                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/70 backdrop-blur-xl border border-pink-100 shadow-md mb-8">
                <span className="w-2 h-2 rounded-full bg-[#810B38] animate-pulse"></span>

                <span className="text-sm font-semibold tracking-wide text-[#810B38]">
                    Idea Update Zone
                </span>
                </div>

                {/* HEADING */}
                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">
                Update your{" "}
                <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Idea
                </span>{" "}
                and let us know!
                </h2>

                {/* SUBTEXT */}
                <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-zinc-500">
                Improve, refine, and evolve your idea with feedback from the community.
                Keep it growing with better insights and collaboration.
                </p>

            </div>

            {/* MODERN PREMIUM CURVE */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="relative block w-full h-[200px]"
                >
                <path
                    fill="#fff4f8"
                    d="M0,64 C180,220 420,260 720,220 C1020,180 1260,40 1440,140 L1440,320 L0,320 Z"
                />
                </svg>
            </div>

            </div>

        <div className="mx-auto max-w-7xl p-10 shadow-sm my-20 rounded-lg">
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
