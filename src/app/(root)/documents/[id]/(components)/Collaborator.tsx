"use client";

import Image from "next/image";
import { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "@/components/ui/button";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";

const Collaborator = ({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || "viewer");
  const [loading, setLoading] = useState(false);

  console.log({ user });

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updatedBy: user,
    });

    setLoading(false);
  };
  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);
    await removeCollaborator({ roomId, email });
    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-secondary-foreground">
              {loading && "updating..."}
            </span>
          </p>
          <p className="text-sm font-light text-muted">{collaborator.email}</p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-primary">Owner</p>
      ) : (
        <div className="flex items-center">
          {user.id === creatorId || user.id === collaborator.id ? (
            <>
              {user.id === creatorId ? (
                <UserTypeSelector
                  userType={userType}
                  setUserType={setUserType}
                  onClickHandler={shareDocumentHandler}
                />
              ) : null}
              <Button
                type="button"
                className="text-white bg-destructive hover:brightness-110"
                onClick={() => removeCollaboratorHandler(collaborator.email)}
              >
                Remove
              </Button>
            </>
          ) : null}
        </div>
      )}
    </li>
  );
};

export default Collaborator;
