import { forwardRef } from "react";

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
	label?: string,
}

function Textarea(props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>) {
	const { label, ...rest } = props;
	return (
		<label>
			{label &&
				<span className="mb-1 text-sm font-medium block">{label}</span>
			}
			<textarea
				{...rest}
				ref={ref}
				autoComplete='off'
				className="w-full rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 bg-white dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600 focus:outline-none"
			/>
		</label>
	)
}

export default forwardRef(Textarea)