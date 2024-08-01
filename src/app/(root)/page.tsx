import { SignedIn, UserButton } from "@clerk/nextjs";
import Header from "./(components)/Header";
import { FileText, FileX2 } from "lucide-react";
import AddDocumentBtn from "./(components)/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import DeleteModal from "./(components)/DeleteModal";
import Notifications from "./(components)/Notifications";


const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li
                key={id}
                className="document-list-item bg-gradient-to-t from-primary to-primary-foreground hover:brightness-110"
              >
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="hidden rounded-md bg-primary-foreground p-2 sm:block">
                    <FileText className="text-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg text-background">
                      {metadata.title}
                    </p>
                    <p className="text-sm font-light text-primary-foreground">
                      Created about {dateConverter(createdAt)}
                    </p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <FileX2 className="w-10 h-10 stroke-1" />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
