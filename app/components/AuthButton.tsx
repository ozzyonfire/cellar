'use client'
import { cn, useOutsideClick } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { styled } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";
import Button from "./Button";

export default function AuthMenu() {
	const { data: session } = useSession();
	const [menuOpen, setMenuOpen] = useState(false);
	const ref = useOutsideClick(() => {
		setMenuOpen(false);
	})

	if (!session) {
		return (
			<styled.div display="flex" gap={1}>
				<p>Not signed in.</p>
				<Button title="Sign in" onClick={() => signIn()} />
			</styled.div>
		)
	} else {
		return (
			<styled.div position="relative" ml={3}>
				<div>
					<button
						// "bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						className={css({
							bg: 'white',
							display: 'flex',
							fontSize: 'sm',
							rounded: 'full',
							_focus: {
								outline: 'none',
								ring: 2,
								ringOffset: 2,
								ringColor: 'indigo.500',
							},
						})}
						id="user-menu"
						aria-haspopup="true"
						onClick={() => setMenuOpen(true)}
					>
						<span className={css({
							srOnly: true,
						})}>Open user menu</span>
						<img
							// "h-8 w-8 rounded-full"
							className={css({
								h: 8,
								w: 8,
								rounded: 'full',
							})}
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
					<styled.a
						href="#"
						display="block"
						px={4}
						py={2}
						fontSize={"sm"}
						color={{
							base: 'gray.700',
							_osDark: 'gray.300',
						}}
						bg={{
							base: 'gray-200',
							_osDark: 'gray-800',
						}}
						role="menuitem"
					>
						Your Profile
					</styled.a>

					<styled.a
						href="#"
						display="block"
						px={4}
						py={2}
						fontSize={"sm"}
						color={{
							base: 'gray.700',
							_osDark: 'gray.300',
						}}
						bg={{
							base: 'gray-200',
							_osDark: 'gray-800',
						}}
						role="menuitem"
					>
						Settings
					</styled.a>

					<styled.a
						cursor="pointer"
						onClick={() => signOut()}
						href="#"
						display="block"
						px={4}
						py={2}
						fontSize={"sm"}
						color={{
							base: 'gray.700',
							_osDark: 'gray.300',
						}}
						bg={{
							base: 'gray-200',
							_osDark: 'gray-800',
						}}
						role="menuitem"
					>
						Sign out
					</styled.a>
				</div>
			</styled.div>
		)
	}
}