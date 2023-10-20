'use client'
import { cn, useOutsideClick } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthMenu() {
	const { data: session } = useSession();
	const [menuOpen, setMenuOpen] = useState(false);
	const ref = useOutsideClick(() => {
		setMenuOpen(false);
	})

	if (!session) {
		return (
			<div className="flex gap-1">
				<p>Not signed in.</p>
				<button className="dark:text-white bg-slate-600 rounded-sm p-2" onClick={() => signIn()}>Sign in</button>
			</div>
		)
	} else {
		return (
			<div className="ml-3 relative">
				<div>
					<button
						className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						id="user-menu"
						aria-haspopup="true"
						onClick={() => setMenuOpen(true)}
					>
						<span className="sr-only">Open user menu</span>
						<img
							className="h-8 w-8 rounded-full"
							src={session.user?.image || ""}
							alt={session.user?.name || ""}
						/>
					</button>
				</div>

				<div
					ref={ref}
					className={cn("hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-black ring-1 ring-black dark:ring-gray-800 ring-opacity-5", menuOpen && "block")}
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="user-menu"
				>
					<a
						href="#"
						className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
						role="menuitem"
					>
						Your Profile
					</a>

					<a
						href="#"
						className="block px-4 py-2 text-sm text-gray-700  dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
						role="menuitem"
					>
						Settings
					</a>
					<a
						onClick={() => signOut()}
						className="block px-4 py-2 text-sm text-gray-700  dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer"
						role="menuitem"
					>
						Sign out
					</a>
				</div>
			</div>
		)
	}
}