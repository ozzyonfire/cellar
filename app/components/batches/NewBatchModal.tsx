import { createBatch } from "@/app/actions";
import Modal from "../Modal"

export default function NewBatchModal(props: {
	open: boolean,
	onClose: () => void,
	onCreateBatch?: (name: string, vintage: number) => void
}) {
	const { open, onClose, onCreateBatch } = props;

	const handleCreateBatch = async (formData: FormData) => {
		console.log('formData', formData)
		const response = await createBatch(formData);
		if (response.message) {

		}
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="New Batch"
			actions={[
				{
					title: 'Cancel',
					onClick: onClose,
				},
				// {
				// 	title: 'Save',
				// 	// onClick: handleModalClose,
				// 	props: {
				// 		color: 'orange',
				// 		type: "submit",
				// 		form: "new-batch-form",
				// 	}
				// }
			]}
		>
			<form
				id="new-batch-form"
				action={createBatch}
			>
				<div className="grid grid-cols-1 gap-2">
					<div>
						<label className="block mb-1 text-sm font-medium" htmlFor="name">Name</label>
						<input
							autoComplete='off'
							type="text"
							required
							className="w-full rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600"
							id="name"
							name="name"
						/>
					</div>
					<div>
						<label className="block mb-1 text-sm font-medium" htmlFor="vintage">Vintage</label>
						<input
							autoComplete="off"
							type="number"
							required
							className="w-full rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600"
							id="vintage"
							name="vintage"
						/>
					</div>
					<div>
						<label className="block mb-1 text-sm font-medium" htmlFor="vessel">Vessel</label>
						<select
							autoComplete="off"
							required
							className="w-full rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600"
							id="vessel"
							name="vessel"
						>
							<option value="barrel">Barrel</option>
							<option value="tank">Tank</option>
						</select>
					</div>
				</div>
				<button type="submit">Submit form</button>
			</form>
		</Modal>
	)
}