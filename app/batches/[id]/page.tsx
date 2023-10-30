import Button from "@/app/components/general/Button";
import Input from "@/app/components/general/Input";
import Main from "@/app/components/layout/Main";
import { getServerSession } from "@/lib/auth";

export default async function BatchPage({
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
		include: {
			batchIngredients: {
				include: {
					ingredient: true
				}
			}
		}
	});

	return (
		<Main>
			<div className="mb-10">
				<h1 className="text-3xl font-extrabold">
					{batch?.name}
				</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="relative outline-1 outline outline-zinc-500 rounded-xl p-4">
					<h2 className="text-lg font-semibold top-[-1rem] absolute bg-zinc-100 dark:bg-zinc-900 px-1">General</h2>
					<form className="flex flex-col gap-2">
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
					</form>
					<div className="flex justify-between mt-4 items-center">
						<h3 className="text-md">Ingredients</h3>
						<Button
							color="orange"
							size="sm"
							title="Add"
							flat
						/>
					</div>
					<div className="flex flex-col gap-2">
						{batch?.batchIngredients.map((ingredient) => (
							<div className="flex flex-row justify-between" key={ingredient.id}>
								<p className="text-sm">{ingredient.id}</p>
								<p className="text-sm">{ingredient.volume} {ingredient.volumeUnit}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Main>
	)
}
