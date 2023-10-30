import { createVessel } from "@/app/actions";
import { Vessel, VolumeUnit } from "@prisma/client";
import Input from "../general/Input";
import Modal from "../general/Modal";
import Select from "../general/Select";

export default function NewVesselModal(props: {
	open: boolean,
	onClose: () => void,
	vessel?: Vessel,
}) {
	const { open, onClose, vessel } = props;

	async function handleCreateVessel(formData: FormData) {
		const response = await createVessel(formData);
		if (response.status == 'success') {
			onClose();
			console.log(response);
		} else {
			alert(response.message);
		}
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={vessel ? 'Edit Vessel' : 'New Vessel'}
			actions={[
				{
					title: 'Save',
					props: {
						color: 'orange',
						type: "submit",
						form: "new-vessel-form",
					}
				}
			]}
		>
			<form
				id="new-vessel-form"
				action={handleCreateVessel}
			>
				<Input
					type="hidden"
					name="id"
					defaultValue={vessel?.id?.toString()}
					readOnly
				/>
				<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
					<Input
						label="Name"
						name="name"
						required
						defaultValue={vessel?.name}
					/>
					<Select
						label="Type"
						name="type"
						defaultValue={vessel?.type}
						required
						options={[
							{ label: "SS. Fermenter", value: "SS. Fermenter" },
							{ label: "Brite Tank", value: "Brite Tank" },
							{ label: "Barrel", value: "Barrel" },
							{ label: "Carboy", value: "Carboy" },
							{ label: "Plastic Tote", value: "Plastic Tote" },
							{ label: "Other", value: "Other" },
						]}
					/>
					<Input
						label="Volume"
						name="volume"
						required
						type="number"
						defaultValue={vessel?.volume?.toString()}
					/>
					<Select
						label="Units"
						name="units"
						required
						defaultValue={vessel?.volumeUnit?.toString()}
						options={Object.keys(VolumeUnit).map((unit) => ({
							label: unit,
							value: unit,
						}))}
					/>
				</div>
			</form>
			<p className="text-sm text-gray-500 dark:text-zinc-400 mt-2">
				This information can be changed later.
			</p>
		</Modal>
	)
}