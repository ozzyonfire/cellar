'use client'
import { useOutsideClick } from "@/lib/utils";
import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";
import { Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "./Button";

export default function AuthMenu() {
	const { data: session } = useSession();
	const [menuOpen, setMenuOpen] = useState(false);
	const ref = useOutsideClick(() => {
		setMenuOpen(false);
	})

	if (!session) {
		return (
			<styled.div display="flex" gap={2} alignItems="center">
				<p className="text-sm">Not signed in.</p>
				<Button size="sm" title="Sign in" onClick={() => signIn()} />
			</styled.div>
		)
	} else {
		return (
			<styled.div position="relative" ml={3}>
				<div>
					<button
						data-active={menuOpen ? 'true' : undefined}
						// "bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						className={css({
							bg: 'transparent',
							display: 'flex',
							fontSize: 'sm',
							rounded: 'full',
							cursor: 'pointer',
							_active: {
								ring: 2,
								ringOffset: 1,
								ringColor: 'indigo.500',
								outlineStyle: 'solid',
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

				<Transition
					show={menuOpen}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<div
						ref={ref}
						// className={cn("hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-black ring-1 ring-black dark:ring-gray-800 ring-opacity-5", menuOpen && "block")}
						className={css({
							display: 'block',
							transformOrigin: 'top right',
							position: 'absolute',
							right: 0,
							mt: 2,
							w: 48,
							rounded: 'md',
							shadow: 'lg',
							py: 1,
							bg: 'white',
							_osDark: {
								bg: 'black',
								ring: 'gray.800',
							},
							ring: 1,
							ringColor: 'black',
						})}
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
								_hover: {
									_osDark: 'gray.100',
									base: 'gray.900',
								},
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
								_hover: {
									_osDark: 'gray.100',
									base: 'gray.900',
								},
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
								_hover: {
									_osDark: 'gray.100',
									base: 'gray.900',
								},
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
				</Transition>
			</styled.div>
		)
	}
}