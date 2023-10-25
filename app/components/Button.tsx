import { ButtonHTMLAttributes } from "react"
import { css, cx } from "@/styled-system/css";
import { ColorPalette, token } from "@/styled-system/tokens";

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number
	}
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	variant?: 'primary' | 'secondary'
	color?: ColorPalette
}

export default function Button(props: ButtonProps) {
	const { title, variant = 'primary', color = 'green', className } = props;

	return (
		<div className={css({
			fontSize: 16,
			display: 'flex',
			gap: 1,
		})}>
			{/* <button className="bg-green-500 hover:bg-green-600 shadow-sm text-zinc-50 font-bold py-2 px-4 border-b-4 border-r-4 border-green-700 rounded-md border-t-2 border-l-2 border-t-green-400 border-l-green-400 hover:border-green-800 hover:border-t-green-500 hover:border-l-green-500 active:bg-green-800 active:border-green-700 active:border-b-2 active:border-r-2 active:text-zinc-200 active:translate-x-[2px] active:translate-y-[2px] transition-all duration-75">
				{title}
			</button> */}
			<button
				style={{
					'--color-400': token(`colors.${color}.400`),
					'--color-500': token(`colors.${color}.500`),
					'--color-600': token(`colors.${color}.600`),
					'--color-700': token(`colors.${color}.700`),
					'--color-800': token(`colors.${color}.800`),
					'--color-900': token(`colors.${color}.900`),
				}}
				className={cx(css({
					color: 'zinc.800',
					bg: 'var(--color-500)',
					transition: 'all 75ms',
					shadow: 'sm',
					fontWeight: 'bold',
					py: 2,
					px: 4,
					borderRadius: 'md',
					borderWidth: 2,
					borderBottomWidth: 4,
					borderRightWidth: 4,
					borderColor: 'var(--color-400)',
					borderBottomColor: 'var(--color-700)',
					borderRightColor: 'var(--color-700)',
					_hover: {
						color: 'zinc.900',
						bg: 'var(--color-600)',
						borderColor: 'var(--color-500)',
						borderBottomColor: 'var(--color-800)',
						borderRightColor: 'var(--color-800)',
					},
					_active: {
						color: 'zinc.50',
						bg: 'var(--color-800)',
						borderColor: 'var(--color-700)',
						borderBottomColor: 'var(--color-900)',
						borderRightColor: 'var(--color-900)',
						transform: 'translate(2px, 2px)',
						borderBottomWidth: 2,
						borderRightWidth: 2,
						marginBottom: '2px',
						transition: 'margin 0ms'
					},
				}), className)}>
				{title}
			</button>
		</div>
	)
}