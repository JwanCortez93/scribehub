"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteDocument } from "@/lib/actions/room.actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    await deleteDocument(roomId);
    setOpen(false);

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-xl bg-transparent p-2 transition-all hover:bg-red-300 hover:text-destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <Trash2 />
          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription className="text-secondary-foreground">
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5">
          <DialogClose
            asChild
            className="w-full bg-popover hover:brightness-110"
          >
            <Button>Cancel</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={deleteDocumentHandler}
            className="w-full hover:brightness-110"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
