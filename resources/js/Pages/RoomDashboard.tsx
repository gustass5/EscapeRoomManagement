import {
	CheckCircleIcon,
	ClockIcon,
	InformationCircleIcon,
	PuzzleIcon,
	SortAscendingIcon,
	SortDescendingIcon,
} from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import { Card } from "../components/Card/Card";
import { Panel } from "../components/Panel";
import { AuthenticatedLayout } from "../layout/AuthenticatedLayout";

const ROOMS_COMPLETED = 25;

const submissions = [
	{
		id: 0,
		name: "Mr. Kadagys",
		count: 15,
		time: "9 min",
		created_at: "2022-05-01T12:00:00",
	},
	{
		id: 1,
		name: "Mr. Domantas",
		count: 1,
		time: "90 min",
		created_at: "2022-05-01T12:00:00",
	},
	{
		id: 2,
		name: "Ponas Armintas",
		count: 10,
		time: "15 min",
		created_at: "2022-05-01T12:00:00",
	},
	{
		id: 3,
		name: "Mr. Krabs",
		count: 10,
		time: "12 min",
		created_at: "2022-05-01T12:00:00",
	},
	{
		id: 4,
		name: "Anonymous",
		count: 13,
		time: "22 min",
		created_at: "2022-05-01T12:00:00",
	},
	{
		id: 5,
		name: "Anonymous",
		count: 15,
		time: "16 min",
		created_at: "2022-05-01T12:00:00",
	},
	{
		id: 6,
		name: "Anonymous",
		count: 11,
		time: "15 min",
		created_at: "2022-05-01T12:00:00",
	},
	{
		id: 7,
		name: "Anonymous",
		count: 5,
		time: "10 min",
		created_at: "2022-05-01T12:00:00",
	},
];

const RoomDashboard: React.VFC = () => {
	return (
		<React.Fragment>
			<div className="flex space-between space-x-6 mb-6">
				<Card title={`Demo Room`} description="GARAGE">
					<InformationCircleIcon className="w-20 h-20 text-blue-500" />
				</Card>
				<Card title={`17 min`} description="AVERAGE TIME">
					<ClockIcon className="w-20 h-20  text-blue-500" />
				</Card>
				<Card title={`9 min`} description="FASTEST TIME">
					<SortAscendingIcon className="w-20 h-20 text-green-500" />
				</Card>
			</div>

			<div className="flex space-between space-x-6 mb-6">
				<Card title={`35`} description="ROOMS STARTED">
					<PuzzleIcon className="w-20 h-20 text-pink-600" />
				</Card>
				<Card
					title={`${ROOMS_COMPLETED}`}
					description="ROOMS COMPLETED"
				>
					<CheckCircleIcon className="w-20 h-20 text-green-500" />
				</Card>
				<Card title={`90 min`} description="LONGEST TIME">
					<SortDescendingIcon className="w-20 h-20 text-red-600" />
				</Card>
			</div>

			<Panel title="Submissions" noPadding={true}>
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Name
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Correct asnwers count
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Completion time
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Submission date
							</th>
							<th className="w-[0.1%]" />
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{submissions.map(
							({ id, name, count, time, created_at }) => (
								<tr key={id} className="h-[59px]">
									<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
										{name}
									</td>
									<td className="px-4 text-sm sm:px-6 text-gray-900">
										{count} / 15
									</td>
									<td className="px-4 text-sm sm:px-6 text-gray-900 font-medium">
										{time}
									</td>
									<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
										{created_at.split("T")[0]}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</Panel>
		</React.Fragment>
	);
};

(RoomDashboard as any).layout = (page: ReactElement) => {
	return (
		<AuthenticatedLayout title="RoomDashboard">{page}</AuthenticatedLayout>
	);
};

export default RoomDashboard;
