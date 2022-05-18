import {
	ChartPieIcon,
	CheckCircleIcon,
	PuzzleIcon,
} from "@heroicons/react/solid";
import React, { ReactElement, useState } from "react";
import { Card } from "../components/Card/Card";
import { Chart } from "../components/Chart";
import { Panel } from "../components/Panel";
import { AuthenticatedLayout } from "../layout/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";
import { Page } from "@inertiajs/inertia";

import { Radar } from "react-chartjs-2";

const ROOMS_COMPLETED = 5;

const Dashboard: React.VFC = () => {
	const { roomCount, roomsOpened } = usePage<
		Page<{
			roomCount: number;
			roomsOpened: any[];
		}>
	>().props;

	const getChartDataForDay = (day: string) => {
		return roomsOpened.reduce((accumulator, current) => {
			return (
				accumulator +
				current.filter(
					(room) =>
						room.created_at.split("T")[0].split("-")[2] === day
				).length
			);
		}, 0);
	};

	const getChartData = () => {
		return [
			getChartDataForDay("16"),
			getChartDataForDay("17"),
			getChartDataForDay("18"),
			getChartDataForDay("19"),
			getChartDataForDay("20"),
			getChartDataForDay("21"),
		];
	};

	return (
		<React.Fragment>
			<div className="flex space-between space-x-6 mb-6">
				<Card title={`${roomCount}`} description="ROOMS CREATED">
					<PuzzleIcon className="w-20 h-20 text-pink-600" />
				</Card>
				<Card
					title={`${ROOMS_COMPLETED}`}
					description="ROOMS COMPLETED"
				>
					<CheckCircleIcon className="w-20 h-20 text-green-500" />
				</Card>
				<Card
					title={`${Math.floor(
						(ROOMS_COMPLETED / roomCount) * 100
					)}%`}
					description="SUCCESS RATE"
				>
					<ChartPieIcon className="w-20 h-20  text-blue-500" />
				</Card>
			</div>

			<div className="flex mb-6">
				<Panel
					title="Rooms started"
					description="From 2021-05-16 to 2022-05-22"
					className="flex-1"
				>
					<Chart
						labels={[
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
							"Sunday",
						]}
						xAxisLabel="Day"
						yAxisLabel="Rooms"
						stacked={true}
						dataSets={[
							{
								label: "Count",
								data: getChartData(),
								backgroundColor: "rgb(190, 24, 93)",
							},
						]}
					/>
				</Panel>

				<Panel
					title="Spread of submitted answers"
					description="April"
					className=""
				>
					<Radar
						data={{
							labels: [
								"Answer A",
								"Answer B",
								"Answer C",
								"Answer D",
							],
							datasets: [
								{
									label: "Most often selected answers",
									data: [150, 60, 10, 110],
									backgroundColor: "rgba(34, 211, 238, 0.2)",
									borderColor: "rgb(34, 211, 238)",
								},
								{
									label: "Correct answers",
									data: [10, 125, 100, 85],
									backgroundColor: "rgba(74, 222, 128, 0.2)",
									borderColor: "rgb(74, 222, 128)",
								},
							],
						}}
					/>
				</Panel>
			</div>

			<Panel
				title="Monthly submissions"
				description="From 2021-04 to 2022-04"
			>
				<Chart
					labels={[
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December",
						"January",
						"February",
						"March",
						"April",
					]}
					xAxisLabel="Months"
					yAxisLabel="Submissions"
					stacked={true}
					dataSets={[
						{
							label: "Submissions",
							data: [14, 23, 4, 18, 20, 12, 8, 23, 9, 12, 15, 9],
							backgroundColor: "rgb(190, 24, 93)",
						},
					]}
				/>
			</Panel>
		</React.Fragment>
	);
};

(Dashboard as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Dashboard">{page}</AuthenticatedLayout>;
};

export default Dashboard;
