import { createVessel } from "@/app/actions";
import Modal from "../general/Modal"
import Input from "../general/Input";
import Select from "../general/Select";
import { VolumeUnit } from "@prisma/client";
import { SelectValue, SelectTrigger, Select as ShadSelect, SelectContent, SelectItem } from "@/components/ui/select";

export default function NewVesselModal(props: {
	open: boolean,
	onClose: () => void,
}) {
	const { open, onClose } = props;

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="New Vessel"
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
				action={createVessel}
			>
				<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
					<Input
						label="Name"
						name="name"
						required
					/>
					<Input
						label="Type"
						name="type"
						required
					/>
					<Input
						label="Volume"
						name="volume"
						required
						type="number"
					/>
					<Select
						label="Units"
						name="units"
						required
						options={Object.keys(VolumeUnit).map((unit) => ({
							label: unit,
							value: unit,
						}))}
					/>
					<ShadSelect>
						<SelectTrigger>
							<SelectValue placeholder="Pick a unit" />
						</SelectTrigger>
						<SelectContent>
							{Object.keys(VolumeUnit).map((unit) => {
								return (<SelectItem key={unit} value={unit}>{unit}</SelectItem>)
							})}
						</SelectContent>
					</ShadSelect>
				</div>
			</form>
		</Modal>
	)
}