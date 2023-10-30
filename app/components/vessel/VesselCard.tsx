'use client';

import { Vessel } from "@prisma/client"
import Button from "../general/Button";
import { useState } from "react";
import NewVesselModal from "./NewVesselModal";

export default function VesselCard(props: {
	vessel: Vessel
}) {
	const { vessel } = props;
	const [editModalOpen, setEditModalOpen] = useState(false);

	return (
		<>
			<div key={vessel.id} className="bg-white dark:bg-zinc-700 dark:text-zinc-50 rounded-xl shadow-md p-4">
				<div className="flex flex-row justify-between mb-2">
					<h3 className="text-lg font-medium">{vessel.name}</h3>
					<Button
						color="orange"
						size="sm"
						title="Edit"
						flat
						onClick={() => {
							setEditModalOpen(true);
						}}
					/>
				</div>
				<div className="flex flex-row justify-between">
					<p className="text-sm">{vessel.type}</p>
					<p className="text-sm">{vessel.volume} {vessel.volumeUnit}</p>
				</div>
			</div>
			<NewVesselModal open={editModalOpen} onClose={() => setEditModalOpen(false)} vessel={vessel} />
		</>
	)
}