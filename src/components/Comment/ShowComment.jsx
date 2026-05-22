import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const ShowComment = ({comment, isOwner}) => {
    const user = String(isOwner.id) === String(comment.userId);;

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-2 justify-end border border-gray-200 rounded-lg p-4 bg-linear-to-r from-white to-[#fff5f9]"
        >            
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Image
                        width={100}
                        height={100}
                        src={comment.userImage || "/fallback.jpg"}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-medium">{comment.userName || "Anonymus"}</p>
                        <p className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                <p className="text-gray-700 text-sm">
                    {comment.commentText}
                </p>
            </div>

            {user && (
                <div className="max-w-7xl mx-auto px-5 lg:px-0 flex items-center justify-between pb-5">
                    <div className="flex items-end gap-3">
                        <Link
                            href="#"
                            className="px-5 py-3 rounded-lg border border-gray-400"
                        >
                            <FaEdit />
                        </Link>

                        {/* <IdeaDelete
                            ideaId={idea._id}
                            ideaTitle={idea.ideaTitle}
                        /> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowComment;