import { Batch } from "@prisma/client"
import Link from "next/link";

export default function BatchCard(props: {
	batch: Batch
}) {
	const { batch } = props;
	return (
		<Link
			key={batch.id}
			className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out hover:cursor-pointer hover:ring-1 ring-indigo-300 ring-offset-1"
			href={`/batches/${batch.id}`}
		>
			<div className="px-4 py-2">
				<h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
					{batch.name}
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mt-1">
					{batch.vintage}
				</p>
			</div>
			<div className="px-4 py-2 bg-gray-100 dark:bg-zinc-700">
				<p className="text-gray-600 dark:text-gray-400">
					{batch.createdAt.toLocaleDateString()}
				</p>
			</div>
		</Link>
	)
}