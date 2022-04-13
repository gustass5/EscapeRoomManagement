import React from "react";

import {
	BellIcon,
	HomeIcon,
	UserGroupIcon,
	PuzzleIcon,
	CalendarIcon,
	ChartBarIcon,
} from "@heroicons/react/outline";
import { Head } from "@inertiajs/inertia-react";
import { classNames } from "../helpers/classNames";
import { UserMenu } from "../components/UserMenu";

interface AuthenticatedLayoutInterface {
	title: string;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutInterface> = ({
	title,
	children,
}) => {
	const navigation = [
		{
			name: "Dashboard",
			href: "/dashboard",
			current: true,
			icon: HomeIcon,
		},
		{ name: "Rooms", href: "/rooms", current: false, icon: PuzzleIcon },
		{ name: "Students", href: "#", current: false, icon: UserGroupIcon },
		{ name: "Calendar", href: "#", current: false, icon: CalendarIcon },
		{ name: "Reports", href: "#", current: false, icon: ChartBarIcon },
	];

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

								<UserMenu />
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
