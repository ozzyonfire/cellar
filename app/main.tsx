'use client'

import { useState } from 'react';
import Nav from './components/Nav';
import { Batch } from '@prisma/client';

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
		<div className="bg-gray-100 dark:bg-zinc-900 min-h-screen">
			<Nav />
			<main className="py-10">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
											{batch.description}
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
				</div>
			</main>
			{showModal && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
						&#8203;
						<div
							className="inline-block align-bottom bg-white dark:bg-zinc-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<div className="bg-white dark:bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div
										className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
									>
										<svg
											className="h-6 w-6 text-green-600"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<h3
											className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
											id="modal-headline"
										>
											New Batch
										</h3>
										<div className="mt-2">
											<form className="space-y-6">
												<div>
													<label
														htmlFor="batch-name"
														className="block text-sm font-medium text-gray-700 dark:text-gray-300"
													>
														Name
													</label>
													<div className="mt-1">
														<input
															type="text"
															name="batch-name"
															id="batch-name"
															className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
															placeholder="Enter batch name"
														/>
													</div>
												</div>
												<div>
													<label
														htmlFor="batch-description"
														className="block text-sm font-medium text-gray-700 dark:text-gray-300"
													>
														Description
													</label>
													<div className="mt-1">
														<textarea
															id="batch-description"
															name="batch-description"
															rows={3}
															className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
															placeholder="Enter batch description"
														></textarea>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 dark:bg-zinc-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={handleModalClose}
								>
									Save
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-zinc-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={handleModalClose}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BatchManagementPage;
