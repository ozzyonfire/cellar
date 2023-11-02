import Button from "@/app/components/general/Button";
import Input from "@/app/components/general/Input";
import Textarea from "@/app/components/general/Textarea";
import Main from "@/app/components/layout/Main";
import { getServerSession } from "next-auth";
import Link from 'next/link';

export default async function NewBatchReading({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const id = searchParams.id as string;
	const session = await getServerSession();

	const batch = await prisma.batch.findFirst({
		where: {
			id,
			userId: session?.user.id
		},
	});

	if (!batch) {
		return (
			<Main>
				<div className="flex flex-col items-center justify-center h-full">
					<h1 className="text-3xl font-extrabold mb-4">Batch not found</h1>
					<Link href="/batches">
						<Button color="emerald" title="Go Back" />
					</Link>
				</div>
			</Main>
		)
	}

	return (
		<Main>
			<div className="mb-10">
				<div className="flex flex-row gap-4">
					<h1 className="text-3xl font-extrabold">
						{batch.name}
					</h1>
					<h1 className="text-3xl font-extrabold">
						/
					</h1>
					<h1 className="text-3xl font-extrabold">
						New Reading
					</h1>
				</div>
			</div>
			<form>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="flex flex-col gap-2">
						<Input
							label="Date"
							name="date"
							type="date"
							defaultValue={new Date().toISOString().slice(0, 10)}
							required
						/>
						<Textarea
							label="Notes"
							name="notes"
							type="text"
						/>
					</div>
					<div className="flex flex-col gap-2 col-span-2">
						<h2 className="text-lg font-semibold">Measurments</h2>
					</div>
				</div>
			</form>
		</Main>
	)
}