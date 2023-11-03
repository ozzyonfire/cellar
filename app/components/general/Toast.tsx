'use client';

import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo } from "react";

export default function Toast(props: {
	message: string,
	status: 'success' | 'error' | 'warning' | 'info',
	show: boolean,
	onClose?: () => void
}) {
	const { message, status, show, onClose } = props;

	useEffect(() => {
		const timer = setTimeout(() => {
			onClose?.();
		}, 5000);
		return () => clearTimeout(timer);
	}, [onClose]);

	const statusStyles = useMemo(() => {
		switch (status) {
			case 'success':
				return 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-50';
			case 'error':
				return 'bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-50';
			case 'warning':
				return 'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-50';
			case 'info':
				return 'bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-50';
		}
	}, [status]);


	return (
		<Transition
			show={show}
			enter="transition ease-out duration-300"
			enterFrom="transform opacity-0 scale-50"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-200"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-50"
			appear
			as={Fragment}
		>
			<div className="fixed bottom-4 right-4 z-50">
				<div className={cn(`flex flex-row justify-between items-center gap-2 p-4 rounded-lg shadow-md`, statusStyles)}>
					<span>{message}</span>
					<button onClick={() => onClose?.()}>
						<svg className={`w-4 h-4 text-zinc-800 dark:text-zinc-50`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 11.414l4.95 4.95 1.414-1.414L11.414 10l4.95-4.95-1.414-1.414L10 8.586 5.05 3.636 3.636 5.05 8.586 10l-4.95 4.95 1.414 1.414L10 11.414z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
		</Transition>
	)
}