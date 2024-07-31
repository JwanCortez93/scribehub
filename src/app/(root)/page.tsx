import { SignedIn, UserButton } from "@clerk/nextjs";
import Header from "./(components)/Header";
import { FileX2 } from "lucide-react";
import AddDocumentBtn from "./(components)/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const documents = [];
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.length > 0 ? (
        <></>
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
