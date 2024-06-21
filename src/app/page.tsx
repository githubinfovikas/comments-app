"use client";
import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { TbCopyOff } from "react-icons/tb";

type Comment = {
  id: number;
  body: string;
  likes: number; // Added likes assuming it is a part of the comment object
};

export default function Page() {
  const [data, setData] = useState<Comment[]>([]);
  const [copiedCommentId, setCopiedCommentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/comments");
        const fetchedData = await res.json();
        setData(fetchedData.comments);
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedCommentId(id);
        setTimeout(() => setCopiedCommentId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center my-10 pt-4">
      {data.length > 0 ? (
        <div className="flex flex-col gap-1">
          {data.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center justify-between rounded-md border-2 gap-4 border-black px-4 py-2"
            >
              <div className="flex flex-col items-center">
                <span>❤️</span>
                <span className="text-xs ">{comment.likes} M</span>
              </div>

              <div>{comment.body}</div>

              <div>
                {copiedCommentId === comment.id ? (
                  <TbCopyOff className="text-green-500" />
                ) : (
                  <MdContentCopy
                    className="cursor-pointer"
                    onClick={() => handleCopy(comment.body, comment.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-5 text-red-700">**No comments</p>
      )}
    </main>
  );
}
