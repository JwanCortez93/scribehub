"use client";

import { Editor } from "@/app/(root)/documents/[id]/(components)/editor/Editor";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import Header from "../../../(components)/Header";
import ActiveCollaborators from "./ActiveCollaborators";
import Loader from "@/components/Loader";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { updateDocument } from "@/lib/actions/room.actions";
import ShareModal from "./ShareModal";

const CollaborativeRoom = ({
  users,
  currentUserType,
  roomId,
  roomMetadata,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);
      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          if (updatedDocument) setEditing(false);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);

        updateDocument(roomId, documentTitle);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [roomId, documentTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter Title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}
              {(currentUserType === "editor" ||
                currentUserType === "creator") &&
                !editing && (
                  <>
                    <SquarePen
                      onClick={() => setEditing(true)}
                      className="stroke-1 cursor-pointer"
                    />
                    <p className="view-only-tag">
                      {currentUserType === "creator" ? "Owner" : "Editor"}
                    </p>
                  </>
                )}
              {currentUserType === "viewer" && !editing && (
                <p className="view-only-tag">Read only</p>
              )}
              {loading && <p className="text-sm text-neutral-400">Saving...</p>}
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor
            roomId={roomId}
            creatorId={roomMetadata.creatorId}
            currentUserType={currentUserType}
          />
          ;
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
