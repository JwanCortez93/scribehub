import { getDocument } from "@/lib/actions/room.actions";
import CollaborativeRoom from "./(components)/CollaborativeRoom";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getClerkUsers } from "@/lib/actions/user.actions";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds }).then((res) =>
    res.filter(Boolean)
  );

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType =
    room.metadata.creatorId === clerkUser.id
      ? "creator"
      : room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes(
          "room:write"
        )
      ? "editor"
      : "viewer";
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        users={usersData}
        currentUserType={currentUserType}
        roomId={id}
        roomMetadata={room.metadata}
      />
    </main>
  );
};

export default Document;
