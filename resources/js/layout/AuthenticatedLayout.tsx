import React, { Fragment } from "react";
import { Inertia } from "@inertiajs/inertia";

import { Menu, Transition } from "@headlessui/react";
import {
	BellIcon,
	HomeIcon,
	UserGroupIcon,
	PuzzleIcon,
	CalendarIcon,
	ChartBarIcon,
} from "@heroicons/react/outline";
import { Head } from "@inertiajs/inertia-react";

interface AuthenticatedLayoutInterface {
	title: string;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutInterface> = ({
	title,
	children,
}) => {
	const user = {
		name: "Tom Cook",
		email: "tom@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	};

	const navigation = [
		{ name: "Dashboard", href: "#", current: true, icon: HomeIcon },
		{ name: "Students", href: "#", current: false, icon: UserGroupIcon },
		{ name: "Rooms", href: "#", current: false, icon: PuzzleIcon },
		{ name: "Calendar", href: "#", current: false, icon: CalendarIcon },
		{ name: "Reports", href: "#", current: false, icon: ChartBarIcon },
	];

	const userNavigation = [
		{ name: "Your Profile", href: "#" },
		{ name: "Settings", href: "#" },
	];

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	function handleLogout(event) {
		event.preventDefault();
		Inertia.post("/logout");
	}

	return (
		<>
			<Head title={title} />
			<div className="flex h-screen bg-gray-50">
				<aside className="h-full w-[300px] bg-gray-800">
					<img
						className="w-48 mx-auto py-6"
						src="/images/ROC-Tilburg-logo.png"
						alt="ROC-Tilburg-logo"
					/>

					<nav className="flex flex-col mx-2 space-y-2">
						{navigation.map((navigationItem) => {
							const Icon = navigationItem.icon;
							return (
								<a
									key={navigationItem.name}
									href={navigationItem.href}
									className={classNames(
										navigationItem.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={
										navigationItem.current
											? "page"
											: undefined
									}
								>
									<Icon
										className="h-6 w-6"
										aria-hidden="true"
									/>
									<div>{navigationItem.name}</div>
								</a>
							);
						})}
					</nav>
				</aside>

				<main className="flex flex-col h-full w-full">
					<header className="bg-white shadow">
						<div className="h-16  ml-4 flex items-center justify-end md:ml-6">
							<div className="flex items-center justify-center mx-8">
								<button
									type="button"
									className="p-1 rounded-full text-gray-400 hover:text-gray-500"
								>
									<span className="sr-only">
										View notifications
									</span>
									<BellIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</button>

								{/* Profile dropdown */}
								<Menu as="div" className="ml-3 relative">
									<div>
										<Menu.Button className="max-w-xs bg-gray-300 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-white">
											<span className="sr-only">
												Open user menu
											</span>
											<img
												className="h-8 w-8 rounded-full"
												src={user.imageUrl}
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											{userNavigation.map((item) => (
												<Menu.Item key={item.name}>
													{({ active }) => (
														<a
															href={item.href}
															className={classNames(
																active
																	? "bg-gray-100"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															{item.name}
														</a>
													)}
												</Menu.Item>
											))}

											<Menu.Item key="sign-out">
												{({ active }) => (
													<form
														onSubmit={handleLogout}
													>
														<button
															type="submit"
															className={classNames(
																active
																	? "bg-gray-100"
																	: "",
																"block w-full text-left px-4 py-2 text-sm text-gray-700"
															)}
														>
															Sign out
														</button>
													</form>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</header>

					<div className="w-full py-6 sm:px-6 lg:px-8">
						{children}
					</div>
				</main>
			</div>
		</>
	);
};
