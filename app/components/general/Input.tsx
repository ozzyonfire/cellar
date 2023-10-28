import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string,
}

function Input(props: InputProps, ref: React.Ref<HTMLInputElement>) {
	const { label, ...rest } = props;
	return (
		<label>
			<span className="mb-1 text-sm font-medium block">{label}</span>
			<input
				{...rest}
				ref={ref}
				autoComplete='off'
				className="w-full rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600"
			/>
		</label>
	)
}

export default forwardRef(Input)