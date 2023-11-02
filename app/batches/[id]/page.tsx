import AddIngredientList from "@/app/components/batches/AddIngredientList";
import Button from "@/app/components/general/Button";
import Input from "@/app/components/general/Input";
import Select from "@/app/components/general/Select";
import Main from "@/app/components/layout/Main";
import { getServerSession } from "@/lib/auth";
import { VolumeUnit } from "@prisma/client";
import Link from "next/link";

export default async function BatchPage({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const id = searchParams.id as string;
	const session = await getServerSession();

	const ingredients = await prisma.ingredient.findMany({
		where: {
			userId: session?.user.id
		}
	});

	const batch = await prisma.batch.findFirst({
		where: {
			id,
			userId: session?.user.id
		},
		include: {
			batchIngredients: {
				include: {
					ingredient: true
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

	return (
		<Main>
			<div className="mb-10">
				<h1 className="text-3xl font-extrabold">
					{batch?.name}
				</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
				<div className="relative outline-1 outline outline-zinc-500 rounded-xl p-4 col-span-2">
					<h2 className="text-lg font-semibold top-[-1rem] absolute bg-zinc-100 dark:bg-zinc-900 px-1">General</h2>
					<form className="grid grid-cols-2 gap-2">
						<Input
							name="name"
							label="Name"
							defaultValue={batch?.name}
							required
						/>
						<Input
							type="date"
							name="startDate"
							label="Start Date"
							defaultValue={batch?.startDate?.toISOString().split('T')[0]}
							required
						/>
						<Input
							type="number"
							name="initalVolume"
							label="Initial Volume"
							defaultValue={batch?.initialVolume?.toString()}
						/>
						<Select
							name="initialVolumeUnit"
							label="Initial Volume Unit"
							options={Object.keys(VolumeUnit).map((unit) => ({
								label: unit,
								value: unit,
							}))}
							defaultValue={batch?.initialVolumeUnit || ''}
						/>
					</form>
					<AddIngredientList
						batchIngredients={batch.batchIngredients}
						ingredients={ingredients}
						batchId={batch.id}
					/>
				</div>
				<div className="relative outline-1 outline outline-zinc-500 rounded-xl p-4 col-span-4">
					<h2 className="text-lg font-semibold top-[-1rem] absolute bg-zinc-100 dark:bg-zinc-900 px-1">Current Info</h2>
					{/* Current volume */}
					{/* Current vessel */}
					{/* Last reading */}
					{/* Last racking */}
					{/* Last addition */}
					{/* Maybe a chart or something here */}
				</div>
				<div className="relative outline-1 outline outline-zinc-500 rounded-xl p-4 col-span-3">
					<h2 className="text-lg font-semibold top-[-1rem] absolute bg-zinc-100 dark:bg-zinc-900 px-1">Readings</h2>
					{/* List all the readings and their measurements here */}
					<div className="flex justify-end gap-2">
						<Link href={`/batches/${batch.id}/new-reading`}>
							<Button
								size="sm"
								title="New Reading"
								color="emerald"
								className="mt-2"
							/>
						</Link>
					</div>
				</div>
				<div className="relative outline-1 outline outline-zinc-500 rounded-xl p-4 col-span-3">
					<h2 className="text-lg font-semibold top-[-1rem] absolute bg-zinc-100 dark:bg-zinc-900 px-1">Additions</h2>
					{/* Current volume */}
					{/* Current vessel */}
					{/* Last reading */}
					{/* Last racking */}
					{/* Last addition */}
					{/* Maybe a chart or something here */}
				</div>
			</div>
		</Main>
	)
}
