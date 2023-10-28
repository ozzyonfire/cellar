'use client';

import { useState } from "react";
import Button from "../components/general/Button";
import NewVesselModal from "../components/vessel/NewVesselModal";

export default function VesselsMain() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-row justify-between">
			<h1 className="text-3xl font-extrabold">
				Vessels
			</h1>
			<Button color="emerald" title="New Vessel" onClick={() => setOpen(true)}>
				New Vessel
			</Button>
			<NewVesselModal
				open={open}
				onClose={() => setOpen(false)}
			/>
		</div>
	)
}