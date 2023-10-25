'use client'

import { useState } from 'react';
import Nav from './components/Nav';
import { Batch } from '@prisma/client';
import Modal from './components/Modal';
import Button from './components/Button';
import { styled } from '@/styled-system/jsx';

type BatchManagementPageProps = {
	batches: Batch[];
};

const BatchManagementPage: React.FC<BatchManagementPageProps> = ({ batches = [] }) => {
	const [showModal, setShowModal] = useState(false);

	const handleNewBatchClick = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

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
							<h1 className="text-3xl font-extrabold text-gray-900">Batch Management</h1>
							<button
								className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
								onClick={handleNewBatchClick}
							>
								New Batch
							</button>
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
					<Button title="Hello" />
				</styled.div>
			</styled.main>
			<Modal open={showModal} onClose={handleModalClose} />
		</styled.div>
	);
};

export default BatchManagementPage;
