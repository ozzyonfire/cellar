import Button from "@/app/components/general/Button";
import Main from "@/app/components/layout/Main";
import { getServerSession } from "next-auth";
import Link from 'next/link';
import Measurements from "./Measurements";
import ReadingForm from "./ReadingForm";
import { deleteReading } from "@/app/actions";

export default async function NewBatchReading({
	params,
	searchParams,
}: {
	params: {
		id: string
		readingId: string
	}
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const id = params.id as string;
	const readingId = params.readingId as string;
	const session = await getServerSession();

	console.log('id', readingId);

	const batch = await prisma.batch.findFirst({
		where: {
			id,
			userId: session?.user.id
		},
		include: {
			readings: {
				where: {
					id: readingId
				}
			}
		}
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

	const handleRemoveReading = async () => {
		'use server';
		await deleteReading(readingId, id);
	}

	return (
		<Main>
			<div className="mb-10">
				<div className="flex flex-row justify-between">
					<div className="flex flex-row gap-4">
						<Link href={`/batches/${id}`}>
							<h1 className="text-3xl font-extrabold text-emerald-500 hover:text-emerald-400">
								{batch.name}
							</h1>
						</Link>
						<h1 className="text-3xl font-extrabold">
							/
						</h1>
						<h1 className="text-3xl font-extrabold">
							Edit Reading
						</h1>
					</div>
					<div className="flex flex-row gap-2">
						<Button
							title="Delete"
							color="red"
							type="submit"
							form="remove-reading"
						/>
						<Button
							title="Save"
							color="orange"
							type="submit"
							form="reading-form"
						/>
					</div>
				</div>
			</div>
			<form action={handleRemoveReading} id="remove-reading">
			</form>
			<ReadingForm batch={batch} />
			<Measurements reading={batch.readings[0]} />
		</Main>
	)
}