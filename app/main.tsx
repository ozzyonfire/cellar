'use client'

import { css } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { Batch } from '@prisma/client';
import { useState } from 'react';
import { createBatch } from './actions';
import Button from './components/Button';
import Nav from './components/Nav';
import NewBatchModal from './components/batches/NewBatchModal';

type BatchManagementPageProps = {
	batches: Batch[];
};

const BatchManagementPage: React.FC<BatchManagementPageProps> = ({ batches = [] }) => {
	const [showModal, setShowModal] = useState(false);
	const handleNewBatchClick = () => {
		console.log('clicked');
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleCreateBatch = async (formData: FormData) => {
		console.log('formData', formData)
		const response = await createBatch(formData);
		if (response.message) {

		}
	}

	return (
		<styled.div bg={{
			base: 'gray.100',
			_osDark: 'zinc.900',
		}} minH="screen" color={{
			base: 'gray.900',
			_osDark: 'zinc.50',
		}}>
			<Nav />
			<styled.main py={10}>
				<styled.div maxW="7xl" mx="auto" px={{
					base: 6,
					lg: 8,
				}}>
					<div className="px-4 py-8 sm:px-0">
						<div className="flex justify-between items-center mb-8">
							<h1
								// className="text-3xl font-extrabold text-gray-900"
								className={css({
									fontSize: "3xl",
									fontWeight: 'extrabold',
								})}
							>
								Batch Management
							</h1>
							<Button
								color="orange"
								title='New Batch'
								onClick={handleNewBatchClick}
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{batches.map((batch) => (
								<div
									key={batch.id}
									className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden"
								>
									<div className="px-4 py-2">
										<h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
											{batch.name}
										</h2>
										<p className="text-gray-600 dark:text-gray-400 mt-1">
											{batch.initialVolume}
										</p>
									</div>
									<div className="px-4 py-2 bg-gray-100 dark:bg-zinc-700">
										<p className="text-gray-600 dark:text-gray-400">
											{batch.createdAt.toLocaleDateString()}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='flex justify-center gap-2'>
						<Button title="Hello" size="md" />
						<Button title="Hello" size="md" />
						<Button title="Hello" size="md" />
						<Button title="Hello" size="md" />
					</div>
				</styled.div>
			</styled.main>
			{/* <div className='max-w-md mx-auto'>
				<form
					id="new-batch-form"
					action={handleCreateBatch}
				>
					<div className="grid grid-cols-1 gap-2">
						<div>
							<label className="block mb-1 text-sm font-medium" htmlFor="name">Name</label>
							<input
								data-lpignore="true"
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
								data-lpignore="true"
								autoComplete="off"
								type="number"
								required
								className="w-full rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600"
								id="vintage"
								name="vintage"
							/>
						</div>
					</div>
					<Button className='mt-2' size="sm" type="submit" title="Save" />
				</form>
			</div> */}
			<NewBatchModal open={showModal} onClose={handleModalClose} />
			{/* <Button onClick={async () => { */}
			{/* await testAction();
				console.log('done on the client');
			}} title="Test Action" size="md" /> */}
			{/* <form action={createBatch} className='flex flex-col gap-1 max-w-md mx-auto'>
				<label htmlFor="name">Name</label>
				<input autoComplete='off' className="text-black" type="text" name="name" required id="name" />
				<label htmlFor="vintage">Vintage</label>
				<input autoComplete='off' className="text-black" type="text" name="vintage" required id="vintage" />
				<Button size="sm" type="submit" title="Submit" />
			</form> */}
		</styled.div>
	);
};

export default BatchManagementPage;
