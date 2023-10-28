import { getServerSession } from "@/lib/auth";
import Main from "@/app/components/layout/Main";
import Button from "../components/general/Button";
import VesselsMain from "./main";

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
			<div className="flex flex-col">
				{vessels.map((vessel) => (
					<div className="flex flex-row justify-between" key={vessel.id}>
						<div className="flex flex-col">
							<h2 className="text-xl font-bold">
								{vessel.name}
							</h2>
							<p className="text-sm">
								{vessel.type}
							</p>
						</div>
						<div className="flex flex-row">
							<Button color="emerald" title="Edit Vessel">
								Edit
							</Button>
							<Button color="red" title="Delete Vessel">
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>
		</Main>
	)
}