import { cn } from "@/lib/utils";
import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string,
	labelProps?: React.InputHTMLAttributes<HTMLLabelElement>,
	endLabel?: string,
}

function Input(props: InputProps, ref: React.Ref<HTMLInputElement>) {
	const { label, labelProps, endLabel, ...rest } = props;
	const { className: labelClasses, ...labelInputProps } = labelProps || {};
	const { className, ...inputProps } = rest;
	return (
		<label className={labelClasses} {...labelInputProps}>
			{label &&
				<span className={cn("mb-1 text-sm font-medium block")}>{label}</span>
			}
			<div className="flex flex-row items-center gap-2 bg-white dark:bg-zinc-700 rounded-lg focus-within:ring focus-within:ring-indigo-200 focus-within:ring-opacity-50 focus-within:border-indigo-300">
				<input
					ref={ref}
					autoComplete='off'
					className={cn("w-full rounded-lg p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600 focus:outline-none", className)}
					{...inputProps}
				/>
				{endLabel &&
					<span className="text-sm font-medium mr-4">{endLabel}</span>
				}
			</div>
		</label>
	)
}

export default forwardRef(Input)