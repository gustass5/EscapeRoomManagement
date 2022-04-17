import { Page } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import React, { ReactElement } from "react";
import { Button } from "../../components/Button/Button";
import { Panel } from "../../components/Panel";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";

const IndexPage: React.VFC = () => {
	const { rooms } = usePage<
		Page<{
			rooms: {
				id: number;
				name: string;
				description: string;
				access_code: string;
				created_at: string;
			}[];
		}>
	>().props;

	return (
		<Panel
			title="Rooms"
			actions={
				<Button
					className="w-auto text-white bg-pink-700 hover:bg-pink-800"
					href="/rooms/create"
				>
					Create new room
				</Button>
			}
			noPadding={true}
		>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
						>
							Title
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
						>
							Description
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
						>
							Creation date
						</th>
						<th className="w-[0.1%]" />
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{rooms.map(({ id, name, description, created_at }) => (
						<tr key={id} className="h-[59px]">
							<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
								{name}
							</td>
							<td className="px-4 text-sm sm:px-6 text-gray-900">
								{description}
							</td>
							<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
								{created_at.split("T")[0]}
							</td>
							<td className="px-4 text-sm sm:px-6">
								<div className="flex items-center space-x-4">
									<Link
										className="responsive-text-align text-sm font-medium transition duration-150 text-rose-600 hover:text-rose-500"
										href={`/rooms/${id}/edit`}
									>
										Edit
									</Link>
									<button
										className="responsive-text-align text-sm font-medium transition duration-150 text-rose-600 hover:text-rose-500"
										type="button"
									>
										Share
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Panel>
	);
};

(IndexPage as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Rooms">{page}</AuthenticatedLayout>;
};

export default IndexPage;
