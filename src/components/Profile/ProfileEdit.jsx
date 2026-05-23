"use client";

import { useEffect, useState } from "react";
import { Edit3, X } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@base-ui/react";
import toast from "react-hot-toast";

const ProfileEdit = ({ currentImage, onUpdated }) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImage || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageUrl(currentImage || "");
  }, [currentImage]);

  const handleUpdate = async () => {
    if (!imageUrl) return;

    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/update-image`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ image: imageUrl }),
        }
      );

      const data = await res.json();
      
      if (data?.success) {
        toast.success("Image updated!");
        onUpdated?.(imageUrl);
        setOpen(false);
      } else {
        toast.error("Failed in updating image!");
      }
    } catch (err) {
      console.error("Image update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setOpen(true)}
        className="absolute -bottom-2 -right-2 h-10 w-10 bg-[#590626] text-white rounded-lg flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        <Edit3 size={16} />
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Update Profile Image
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Input */}
            <div className="space-y-3">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#590626]"
              />

              {/* Preview */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg border"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[#590626] text-white hover:bg-[#43041d] disabled:opacity-60"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;