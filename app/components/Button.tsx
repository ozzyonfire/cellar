import { ButtonHTMLAttributes } from "react"
import { css } from "@/styled-system/css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	variant?: 'primary' | 'secondary'
}

export default function Button(props: ButtonProps) {
	const { title, variant = 'primary' } = props;

	return (
		<div className={css({
			fontSize: 16,
			display: 'flex',
			gap: 1,
		})}>
			{/* <button className="bg-green-500 hover:bg-green-600 shadow-sm text-zinc-50 font-bold py-2 px-4 border-b-4 border-r-4 border-green-700 rounded-md border-t-2 border-l-2 border-t-green-400 border-l-green-400 hover:border-green-800 hover:border-t-green-500 hover:border-l-green-500 active:bg-green-800 active:border-green-700 active:border-b-2 active:border-r-2 active:text-zinc-200 active:translate-x-[2px] active:translate-y-[2px] transition-all duration-75">
				{title}
			</button> */}
			<button className={css({
				color: 'zinc.50',
				bg: 'green.500',
				transition: 'all 75ms',
				shadow: 'sm',
				fontWeight: 'bold',
				py: 2,
				px: 4,
				borderRadius: 'md',
				borderWidth: 2,
				borderBottomWidth: 4,
				borderRightWidth: 4,
				borderColor: 'green.400',
				borderBottomColor: 'green.700',
				borderRightColor: 'green.700',
				_hover: {
					color: 'zinc.100',
					bg: 'green.600',
					borderColor: 'green.500',
					borderBottomColor: 'green.800',
					borderRightColor: 'green.800',
				},
				_active: {
					color: 'zinc.50',
					bg: 'green.800',
					borderColor: 'green.700',
					borderBottomColor: 'green.900',
					borderRightColor: 'green.900',
					transform: 'translate(2px, 2px)',
					borderBottomWidth: 2,
					borderRightWidth: 2,
				},
			})}>
				{title}
			</button>
		</div>
	)
}