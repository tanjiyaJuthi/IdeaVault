"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import CommentDelete from "./CommentDelete";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";
import { Edit3, Trash2 } from "lucide-react";
import { Button } from "@base-ui/react";

const ShowComment = ({
  comment,
  currentUser,
  onDeleteComment,
  handleUpdateComment,
}) => {
  const isOwner =
    currentUser &&
    String(currentUser.id) === String(comment.userId);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.commentText);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/interaction/${comment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            commentText: text,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success("Comment updated");

      handleUpdateComment(comment._id, text);
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-lg p-4 bg-linear-to-r from-white to-[#fff5f9]">

      {isOwner && (
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="h-10 w-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <Edit3 size={16} />
          </Button>

          <CommentDelete
            commentId={comment._id}
            commentText={comment.commentText}
            onSuccess={() => onDeleteComment(comment._id)}
          />
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <Image
          width={100}
          height={100}
          src={comment.userImage || "/fallback.jpg"}
          alt="user"
          className="w-8 h-8 rounded-full"
        />

        <div>
          <p className="text-sm font-medium">
            {comment.userName || "Anonymous"}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {!isEditing ? (
        <p className="text-gray-700 text-sm">
          {comment.commentText}
        </p>
      ) : (
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border p-2 rounded-md text-sm focus:ring-1 focus:ring-gray-200"
          />

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setIsEditing(false);
                setText(comment.commentText);
              }}
              className="px-3 py-1 text-sm border rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-3 py-1 text-sm bg-[#590626] text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowComment;