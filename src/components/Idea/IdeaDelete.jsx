"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const IdeaDelete = ({ ideaId, ideaTitle, onSuccess }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${ideaId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.message || "Failed to delete idea");
      } else {
        toast.success("Idea deleted successfully!");
      }

      onSuccess?.();
      setOpen(false);

      router.push("/ideas");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-12 p-6 bg-[#590626] hover:bg-slate-900 text-white"
      >
        Delete Idea
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Delete Idea
            </DialogTitle>

            <DialogDescription>
              Are you sure you want to delete <span className="font-bold! text-slate-900!">{ideaTitle}</span>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              className="h-12 p-6 hover:text-[#590626]"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              disabled={loading}
              className="h-12 p-6 bg-[#590626] hover:bg-slate-900 text-white"
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IdeaDelete;