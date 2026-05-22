"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const IdeaEdit = ({ idea }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

  const router = useRouter();

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

  useEffect(() => {
    if (!open || !idea) return;

    form.reset({
        ideaTitle: idea.ideaTitle || "",
        shortDescription: idea.shortDescription || "",
        category: idea.category || "",
        tags: idea.tags?.join(", ") || "",
        imageUrl: idea.imageUrl || "",
        estimatedBudget: idea.estimatedBudget || "",
        problemStatement: idea.problemStatement || "",
        proposedSolution: idea.proposedSolution || "",
        detailedDescription: idea.detailedDescription || "",
        targetAudience: idea.targetAudience || "",
    });
    }, [open, idea?._id]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();

      const payload = {
        ...data,
        tags: data.tags
          ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message);

      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-12 rounded-lg border border-gray-200 bg-white focus:border-[#590626] focus:ring-0 transition";

  const textareaClass =
    "min-h-28 rounded-lg border border-gray-200 bg-white focus:border-[#590626] focus:ring-0 transition";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-12 px-5 py-2 rounded-lg bg-white shadow-sm text-gray-700 hover:text-[#590627] transition">
          Edit Idea
        </button>
      </DialogTrigger>

      <DialogContent className="z-50 max-w-5xl max-h-[90vh] overflow-y-auto bg-linear-to-r! from-white! to-[#fff4f8]!">
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
        </DialogHeader>

        <Form {...form} className="">
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

            {/* CATEGORY (FULL WIDTH) */}
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
                <FormItem className="">
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
                <FormItem className="">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input className={inputClass} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem  className="md:col-span-2">
                  <FormLabel>Short  Description</FormLabel>
                  <FormControl>
                    <Input className={inputClass} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
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
              <Button className="p-5.5" type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button
                type="submit"
                className="p-5.5 bg-[#590626] text-white hover:bg-black"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Idea"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaEdit;