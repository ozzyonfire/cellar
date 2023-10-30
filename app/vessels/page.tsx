import { getServerSession } from "@/lib/auth";
import Main from "@/app/components/layout/Main";
import Button from "../components/general/Button";
import VesselsMain from "./main";
import VesselCard from "../components/vessel/VesselCard";

export default async function VesselsPage() {
	const session = await getServerSession();
	const vessels = await prisma.vessel.findMany({
		where: {
			userId: session?.user.id
		}
	});

	return (
		<Main>
			<VesselsMain />
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-4">
				{vessels.map((vessel) => (
					<VesselCard vessel={vessel} key={vessel.id} />
				))}
			</div>
		</Main>
	)
}