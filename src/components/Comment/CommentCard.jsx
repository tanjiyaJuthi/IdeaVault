"use client";

import Image from "next/image";
import { useState } from "react";
import ShowComment from "./ShowComment";

const CommentCard = ({ ideaId, comments = [], onAddComment, isOwner }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      await onAddComment({
        ideaId,
        commentText: text,
      });

      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-5 space-y-6 mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Comments</h3>
          <span className="text-sm text-gray-500">
            {comments.length} total
          </span>
        </div>

        {/* INPUT BOX */}
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#590627] resize-none h-24"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#590627] text-white px-5 py-2 rounded-lg hover:bg-slate-900 transition disabled:opacity-50"
            >
              {loading ? "Posting..." : "Add Comment"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-5 space-y-6 mt-10">
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-sm">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <ShowComment 
                key={comment._id} 
                comment={comment} 
                isOwner={isOwner}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;