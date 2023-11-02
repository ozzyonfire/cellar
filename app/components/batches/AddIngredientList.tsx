'use client';
import { BatchIngredient, Ingredient, VolumeUnit, WeightUnit } from "@prisma/client";
import Button from "../general/Button";
import { useMemo, useState } from "react";
import Modal, { ModalAction } from "../general/Modal";
import Input from "../general/Input";
import Select from "../general/Select";
import { createBatchIngredient, createIngredient } from "@/app/actions";
import Textarea from "../general/Textarea";

type PopulatedBatchIngredient = BatchIngredient & {
	ingredient: Ingredient
}

export default function AddIngredientList(props: {
	batchIngredients: PopulatedBatchIngredient[];
	ingredients: Ingredient[];
	batchId: string
}) {
	const { batchIngredients, ingredients, batchId } = props;
	const [open, setOpen] = useState(false);
	const [addingNewIngredient, setAddingNewIngredient] = useState(false);
	const [optimisticIngredients, setOptimisticIngredients] = useState<Ingredient[]>(ingredients);
	const [optimisticBatchIngredients, setOptimisticBatchIngredients] = useState<BatchIngredient[]>(batchIngredients);

	const handleNewIngredient = async (formData: FormData) => {
		const response = await createIngredient(formData);
		if (response.status == 'success') {
			if (response.data) {
				setOptimisticIngredients([...optimisticIngredients, response.data]);
			}
			setAddingNewIngredient(false);
		} else {
			alert(response.message);
		}
	}

	const handleNewBatchIngredient = async (formData: FormData) => {
		const response = await createBatchIngredient(formData);
		if (response.status == 'success') {
			if (response.data) {
				setOptimisticBatchIngredients([...optimisticBatchIngredients, response.data]);
			}
			setOpen(false);
		}
	}

	const actions = useMemo<ModalAction[]>(() => {
		if (addingNewIngredient) {
			return [{
				title: 'Cancel',
				props: {
					color: 'red',
					type: "button",
					onClick: () => {
						setAddingNewIngredient(false);
					}
				}
			}, {
				title: 'Save',
				props: {
					color: 'orange',
					type: "submit",
					form: "new-ingredient-form",
				}
			}]
		} else {
			return [{
				title: 'Save',
				props: {
					color: 'orange',
					type: "submit",
					form: "new-batch-ingredient-form",
				}
			}]
		}
	}, [addingNewIngredient]);

	return (
		<div>
			<div className="flex justify-between mt-4 items-center">
				<h3 className="text-md font-semibold">Ingredients</h3>
				<Button
					color="orange"
					size="sm"
					title="Add"
					flat
					onClick={() => {
						setOpen(true);
					}}
				/>
			</div>
			<div className="flex flex-col mt-2 divide-y divide-dashed divide-zinc-500">
				{batchIngredients.map((batchIngredient) => (
					<div className="flex flex-row justify-between py-1.5" key={batchIngredient.id}>
						<p className="text-sm">{batchIngredient.ingredient.name}</p>
						<p className="text-sm">{batchIngredient.volume} {batchIngredient.volumeUnit}</p>
					</div>
				))}
			</div>
			<Modal
				title={addingNewIngredient ? 'New Ingredient' : 'Add Batch Ingredient'}
				open={open}
				onClose={() => setOpen(false)}
				actions={actions}
			>
				{addingNewIngredient ?
					<form action={handleNewIngredient} id="new-ingredient-form">
						<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
							<Input
								label="Name"
								name="name"
								type="text"
								required
							/>
							<Input
								label="Type"
								name="type"
								placeholder="Apples, Hops, Grapes, etc."
								type="text"
							/>
						</div>
					</form>
					:
					<form action={handleNewBatchIngredient} id="new-batch-ingredient-form">
						<Input type="hidden" name="batchId" value={batchId} />
						<div className="flex flex-row justify-between mb-2 items-end gap-2">
							<Select
								name="ingredient"
								labelProps={{
									className: "block flex-grow"
								}}
								label="Ingredient"
								type="text"
								required
								options={props.ingredients.map((ingredient) => ({
									label: ingredient.name,
									value: ingredient.id,
								}))}
							/>
							<Button
								color="orange"
								className="h-11"
								size="sm"
								type="button"
								title="New"
								flat
								onClick={() => {
									setAddingNewIngredient(true);
								}}
							/>
						</div>
						<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
							<Input
								name="volume"
								label="Volume"
								type="number"
							/>
							<Select
								name="volumeUnit"
								label="Volume Unit"
								type="text"
								defaultValue={VolumeUnit.liter}
								options={Object.keys(VolumeUnit).map((unit) => ({
									label: unit,
									value: unit,
								}))
								}
							/>
							<Input
								name="weight"
								label="Weight"
								type="number"
							/>
							<Select
								name="weightUnit"
								label="Weight Unit"
								type="text"
								defaultValue={WeightUnit.tonne}
								options={Object.keys(WeightUnit).map((unit) => ({
									label: unit,
									value: unit,
								}))}
							/>
							<Input
								required
								name="date"
								label="Date Added"
								type="date"
								defaultValue={new Date().toISOString().split('T')[0]}
							/>
							<Textarea
								label="Notes"
								name="notes"
								placeholder="Notes"
							/>
						</div>
					</form>
				}
			</Modal>
		</div>
	)
}