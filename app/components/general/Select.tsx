import { cn } from "@/lib/utils";
import { forwardRef } from "react"

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	label: string,
	options: {
		label: string,
		value: string,
	}[],
	labelProps?: React.SelectHTMLAttributes<HTMLLabelElement>,
}

function Select(props: SelectProps, ref: React.Ref<HTMLSelectElement>) {
	const { label, options, labelProps, ...rest } = props;
	const { className, ...selectProps } = rest;
	return (
		<label {...labelProps}>
			<span className="mb-1 text-sm font-medium block">{label}</span>
			<div className="relative">
				<select
					ref={ref}
					autoComplete='off'
					className={cn("w-full rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600 pr-2 appearance-none", className)}
					{...selectProps}
				>
					{options.map((option) => (
						<option value={option.value} key={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-zinc-50">
					<svg
						className="w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M10.293 14.95a1 1 0 01-1.414 0l-4.243-4.243a1 1 0 111.414-1.414L10 12.586l3.536-3.536a1 1 0 111.414 1.414l-4.243 4.243z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
		</label>
	)
}

export default forwardRef(Select);