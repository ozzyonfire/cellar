import { cn } from "@/lib/utils"
import Link from "next/link"
import AuthMenu from "./AuthButton"
import { styled } from "@/styled-system/jsx"
import { css, cva } from "@/styled-system/css"
export function NavItem(props: {
	children: React.ReactNode
	href?: string
	active?: boolean
}) {
	const { href = "#", children, active } = props

	const baseStyles = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
	const buttonStyles = "border-transparent text-gray-500 dark:text-gray-100 hover:text-gray-700 hover:dark:text-gray-400 hover:border-gray-300";
	const activeStyles = "border-indigo-500 dark:border-indigo-200 dark:text-indigo-300 text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-500 hover:border-indigo-700";

	const classes = cn(baseStyles, buttonStyles, active && activeStyles);

	const button = cva({
		base: {
			transition: 'all 75ms',
			display: 'inline-flex',
			alignItems: 'center',
			px: 1,
			pt: 1,
			fontSize: 'sm',
			fontWeight: 'medium',
			borderColor: 'transparent',
			borderBottomWidth: 2,
			color: 'gray.500',
			_osDark: {
				color: 'gray.300',
			},
			_hover: {
				color: 'gray.700',
				_osDark: {
					color: 'gray.100',
					borderColor: 'gray.700',
				},
				borderColor: 'gray.300',
			}
		},
		variants: {
			active: {
				true: {
					color: 'indigo.600',
					borderColor: 'indigo.500',
					_osDark: {
						color: 'indigo.300',
						borderColor: 'indigo.300',
					},
					_hover: {
						color: 'indigo.700',
						borderColor: 'indigo.700',
						_osDark: {
							color: 'indigo.200',
							borderColor: 'indigo.200',
						},
					}
				}
			}
		}
	});

	return (
		<Link
			href={href}
			// className={css({
			// 	base: {
			// 		display: 'inline-flex',
			// 		alignItems: 'center',
			// 		px: 1,
			// 		pt: 1,
			// 		borderBottomWidth: 2,
			// 		fontSize: 'sm',
			// 		fontWeight: 'medium',
			// 		borderColor: 'transparent',
			// 	}
			// })}
			className={button({
				active: active,
			})}
		>
			{children}
		</Link>
	)
}

export default function Nav(props: {
	children?: React.ReactNode
}) {

	const navItems = [{
		title: "Dashboard",
		link: "/dashboard"
	}, {
		title: 'Batches',
		link: '/batches',
		active: true
	}, {
		title: 'Reports',
		link: '/reports'
	}]

	return (
		<styled.nav
			bg={{
				base: 'white',
				_osDark: 'zinc.950',
			}}
			shadow={{
				base: 'sm',
				_osDark: 'none',
			}}
		>
			<styled.div maxW="7xl" mx="auto" px={{
				base: 4,
				sm: 6,
				lg: 8,
			}}>
				<styled.div display="flex" h={16} justifyContent="space-between">
					<styled.div display="flex">
						<styled.div flexShrink={0} display="flex" alignItems="center">
							<styled.h1 color={{
								base: 'gray.900',
								_osDark: 'zinc.50',
							}} fontFamily="mono" fontWeight="semibold">🍷🍺 Cellar</styled.h1>
						</styled.div>
						<styled.div display={{
							base: 'none',
							sm: 'flex',
						}} sm={{
							ml: 6,
							gap: 8,
						}}>
							{navItems.map(navItem => {
								return <NavItem key={navItem.link} href={navItem.link} active={navItem.active}>{navItem.title}</NavItem>
							})}
						</styled.div>
					</styled.div>
					{/* <div className="hidden sm:ml-6 sm:flex sm:items-center"> */}
					<div className={css({
						base: {
							display: 'none',
						},
						sm: {
							display: 'flex',
							ml: 6,
							alignItems: 'center',
						}
					})}
					>
						<AuthMenu />
					</div>
					<styled.div
						mr={-2}
						display={{
							base: 'flex',
							sm: 'none',
						}} alignItems="center"
					// className="-mr-2 flex items-center sm:hidden"
					>
						<button
							// className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							className={css({
								bg: 'white',
								p: 2,
								rounded: 'md',
								color: 'gray.400',
								_hover: {
									color: 'gray.500',
								},
								_focus: {
									outline: 'none',
									ring: 2,
									ringOffset: 2,
									ringColor: 'indigo.500',
								},
							})}
						>
							<span className={css({ srOnly: true })}>Open main menu</span>
							<svg
								// className="h-6 w-6"
								className={css({
									h: 6,
									w: 6,
								})}
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
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</styled.div>
				</styled.div>
			</styled.div>
			{/* 
			<styled.div hidden>
				<div className="px-2 pt-2 pb-3 space-y-1">
					<a
						href="#"
						className="bg-indigo-50 border-indigo-500 text-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
					>
						Dashboard
					</a>

					<a
						href="#"
						className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 block px-3 py-2 rounded-md text-base font-medium"
					>
						Wines
					</a>

					<a
						href="#"
						className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 block px-3 py-2 rounded-md text-base font-medium"
					>
						Reports
					</a>
				</div>
			</styled.div> */}
		</styled.nav >
	)
}