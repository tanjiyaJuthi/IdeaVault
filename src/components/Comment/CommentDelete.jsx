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
import { RiDeleteBin2Line } from "react-icons/ri";
import { Trash2 } from "lucide-react";

const CommentDelete = ({ commentId, commentText, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/interaction/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.message || "Failed to delete comment");
        return;
      }

      toast.success("Comment deleted");

      onSuccess?.();

      setOpen(false);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-10 w-10 rounded-lg bg-red-50 text-[#590626] flex items-center justify-center hover:bg-red-100"
      >
        <Trash2 size={16} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-900">
                {commentText}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="h-12 py-4 px-6"
            >
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              disabled={loading}
              className="bg-[#590626] text-white h-12 py-4 px-6"
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentDelete;