"use client";

import { Button } from "@/components/ui/button";
import { createDocument } from "@/lib/actions/room.actions";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) {
        router.push(`/documents/${room.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="flex gap-1 shadow-md hover:brightness-110"
    >
      <PlusCircle />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
};

export default AddDocumentBtn;
