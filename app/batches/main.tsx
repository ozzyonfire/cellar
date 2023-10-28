'use client'

import { css } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { Batch } from '@prisma/client';
import { useState } from 'react';
import { createBatch } from '../actions';
import Button from '../components/general/Button';
import BatchCard from '../components/batches/BatchCard';
import NewBatchModal from '../components/batches/NewBatchModal';

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
		<>
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
								<BatchCard key={batch.id} batch={batch} />
							))}
						</div>
					</div>
				</styled.div>
			</styled.main>
			<NewBatchModal open={showModal} onClose={handleModalClose} />
		</>
	);
};

export default BatchManagementPage;
