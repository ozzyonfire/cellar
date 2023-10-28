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
		}
	});

	return (
		<Main>
			<h1 className="text-3xl font-extrabold">
				{batch?.name}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<form className="space-y-6">
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<div className="mt-1">
							<input
								type="text"
								name="name"
								id="name"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="initialVolume" className="block text-sm font-medium text-gray-700">
							Initial Volume
						</label>
						<div className="mt-1">
							<input
								type="number"
								name="initialVolume"
								id="initialVolume"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="vintage" className="block text-sm font-medium text-gray-700">
							Vintage
						</label>
						<div className="mt-1">
							<input
								type="number"
								name="vintage"
								id="vintage"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
							Start Date
						</label>
						<div className="mt-1">
							<input
								type="date"
								name="startDate"
								id="startDate"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
							End Date
						</label>
						<div className="mt-1">
							<input
								type="date"
								name="endDate"
								id="endDate"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</Main>
	)
}
