import { cn } from "@/lib/utils";
import { Dialog } from '@headlessui/react';

export default function Modal(props: {
	open: boolean
	onClose: () => void
}) {
	const { open, onClose } = props;

	if (!open) return null;

	return (
		<Dialog open={open} onClose={onClose} className="relative z-10">
			{/* Background overlay */}
			<div className="fixed inset-0 backdrop-blur-sm"></div>

			{/* Modal panel */}
			<div className="fixed inset-0 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 text-center">
					<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title
							as="h3"
							className="text-lg font-medium leading-6 text-gray-900"
						>
							Payment successful
						</Dialog.Title>
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								Your payment has been successfully submitted. We’ve sent
								you an email with all of the details of your order.
							</p>
						</div>

						<div className="mt-4">
							<button
								type="button"
								className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
								onClick={onClose}
							>
								Got it, thanks!
							</button>
						</div>
					</Dialog.Panel>
				</div>
			</div>
		</Dialog>
	)
}