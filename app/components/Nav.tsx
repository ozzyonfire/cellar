import { cn } from "@/lib/utils"
import Link from "next/link"
import AuthMenu from "./AuthButton"

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

	return (
		<Link
			href={href}
			className={classes}
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
		<nav className="bg-white dark:bg-zinc-950 shadow dark:shadow-none">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<h1 className="font-mono font-semibold">🍷🍺 Cellar</h1>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							{navItems.map(navItem => {
								return <NavItem key={navItem.link} href={navItem.link} active={navItem.active}>{navItem.title}</NavItem>
							})}
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<AuthMenu />
					</div>
					<div className="-mr-2 flex items-center sm:hidden">
						<button className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
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
					</div>
				</div>
			</div>

			<div className="hidden sm:hidden">
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
			</div>
		</nav>
	)
}