import { getServerSession } from "@/lib/auth";
import HomePage from "./main";
import { redirect } from "next/navigation";

export default async function BatchesPage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/login');
  }

  const batches = await prisma.batch.findMany({
    where: {
      userId: session.user.id
    }
  });

  return (
    <HomePage batches={batches} />
  )
}
