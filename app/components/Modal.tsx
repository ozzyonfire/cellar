import { cn } from "@/lib/utils";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from "react";
import Button, { ButtonProps } from "./Button";

export default function Modal(props: {
	open: boolean
	onClose: () => void
	title?: string
	children?: React.ReactNode
	actions?: {
		title: string
		onClick?: () => void
		props?: ButtonProps
	}[]
}) {
	const { open, onClose, actions, children, title } = props;

	return (
		<Transition
			show={open}
			as={Fragment}
			appear
		>
			<Dialog
				onClose={onClose} className="relative z-10">
				{/* Background overlay */}
				<Transition.Child
					enter="ease-in-out duration-300"
					enterFrom="backdrop-filter backdrop-blur-none opacity-0"
					enterTo="backdrop-filter backdrop-blur-sm opacity-100"
					leave="ease-in duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					className="fixed inset-0"
				>
					<div className="fixed inset-0"></div>
				</Transition.Child>

				{/* Modal panel */}
				<Transition.Child
					enter="ease-in-out duration-300"
					enterFrom="opacity-0 scale-50"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-50"
					className="fixed inset-0"
				>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-6 text-left align-middle shadow-xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50"
								>
									{title}
								</Dialog.Title>
								<div className="my-6 text-gray-500 dark:text-gray-300">
									{children}
								</div>
								<div className="mt-4 flex justify-end gap-1">
									{actions?.map(action => {
										return <Button
											key={action.title}
											size="sm"
											type="button"
											title={action.title}
											onClick={action.onClick}
											{...action.props}
										/>
									})}
								</div>
							</Dialog.Panel>
						</div>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition>
	)
}