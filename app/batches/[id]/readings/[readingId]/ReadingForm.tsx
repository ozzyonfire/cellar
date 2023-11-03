'use client';

import { saveReading } from "@/app/actions";
import Input from "@/app/components/general/Input";
import Select from "@/app/components/general/Select";
import Textarea from "@/app/components/general/Textarea";
import Toast from "@/app/components/general/Toast";
import { Batch, GravityUnit, Reading, TemperatureUnit } from "@prisma/client"
import { useState } from "react";


const tempUnitMap: {
	[keyof in TemperatureUnit]: string
} = {
	'degreesCelcius': '°C',
	'degreesFahrenheit': '°F',
}

const gravityUnitMap: {
	[keyof in GravityUnit]: string
} = {
	'specificGravity': 'SG',
	'brix': '°Bx',
	'kgPerMeterCubed': 'kg/m³',
}

export default function ReadingForm(props: {
	batch: Batch & {
		readings: Reading[]
	}
}) {
	const { batch } = props;
	const reading = batch.readings[0];
	const [show, setShow] = useState(false);

	console.log(reading);

	const handleSaveReading = async (formData: FormData) => {
		const response = await saveReading(formData);
		console.log(response);
		setShow(true);
	}

	return (
		<>
			<Toast
				message="Your changes have been saved."
				status="success"
				show={show}
				onClose={() => setShow(false)}
			/>
			<form id="reading-form" action={handleSaveReading}>
				<Input hidden name="id" value={reading.id} />
				<Input hidden name="batchId" value={batch.id} />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="flex flex-col gap-2">
						<Input
							label="Date"
							name="date"
							type="date"
							defaultValue={reading.date.toISOString().split('T')[0]}
							required
						/>
						<Textarea
							label="Notes"
							name="notes"
							type="text"
							defaultValue={reading.notes || ''}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-row w-full">
							<Input
								labelProps={{
									className: "w-full"
								}}

								className="rounded-r-none" label="Temperature"
								step="0.1"
								name="temperature"
								type="number"
								defaultValue={reading.temperature?.value?.toFixed(3) || ''}
							/>
							<Select
								className="rounded-l-none bg-gray-100 dark:bg-zinc-600 w-16"
								label="Units"
								name="temperatureUnit"
								options={Object.values(TemperatureUnit).map((unit) => ({
									label: tempUnitMap[unit],
									value: unit,
								}))}
								defaultValue={reading.temperature?.units || TemperatureUnit.degreesCelcius}
							/>
						</div>
						<div className="flex flex-row w-full">
							<Input
								labelProps={{
									className: "w-full"
								}}
								className="rounded-r-none"
								label="Sugar content"
								step="0.001"
								name="gravity"
								type="number"
								defaultValue={reading.gravity?.value?.toString() || ''}
							/>
							<Select
								className="rounded-l-none bg-gray-100 dark:bg-zinc-600 w-24"
								label="Units"
								defaultValue={reading.gravity?.units || GravityUnit.specificGravity}
								name="gravityUnit"
								options={Object.values(GravityUnit).map((unit) => ({
									label: gravityUnitMap[unit],
									value: unit,
								}))}
							/>
						</div>
					</div>
					<div className="flex flex-col w-full gap-2">
						<Input
							labelProps={{
								className: "w-full"
							}}
							label="pH"
							name="pH"
							type="number"
							defaultValue={reading.pH?.toString() || ''}
						/>
						<div className="flex flex-row w-full gap-2 items-end">
							<Input
								labelProps={{
									className: "w-full"
								}}
								label="TA"
								name="ta"
								type="number"
								endLabel="g/L"
								defaultValue={reading.ta?.toString() || ''}
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	)
}