'use client';

import Button from "@/app/components/general/Button";
import Input from "@/app/components/general/Input";
import Modal from "@/app/components/general/Modal";
import { Reading } from "@prisma/client";
import { useState } from "react";

export default function Measurements({ reading }: {
	reading: Reading
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col gap-2 col-span-2">
			<div className="flex flex-row justify-between">
				<h2 className="text-lg font-semibold">Measurments</h2>
				<Button type="button" size="sm" color="green" title="Add" onClick={() => setOpen(true)} />
			</div>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title="Add Measurement"
				actions={[{
					title: "Add",
					props: {
						form: "add-measurement-form",
						type: "submit",
					}
				}]}
			>
				{/* Add measurement form */}
				<form id="add-measurement-form">
					<Input hidden name="readingId" value={reading.id} />
					<div className="grid grid-cols-2 gap-2">
						<Input
							label="Value"
							name="value"
							type="number"
							required
						/>
						<Input
							label="Units"
							name="units"
							type="text"
							required
						/>
					</div>
				</form>
			</Modal>
		</div>
	)
}