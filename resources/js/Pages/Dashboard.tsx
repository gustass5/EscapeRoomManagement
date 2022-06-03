import { CheckCircleIcon, ClockIcon, PuzzleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import { Card } from "../components/Card/Card";
import { Panel } from "../components/Panel";
import { Chart as ChartComponent } from "../components/Chart";
import { AuthenticatedLayout } from "../layout/AuthenticatedLayout";

import { Doughnut, Chart } from "react-chartjs-2";

const ROOMS_COMPLETED = 5;
const AVERAGE_TIME = 18;

const GARAGES_CREATED = [2, 1, 2, 3, 4, 5, 6];
const LABORATORIES_CREATED = [2, 2, 6, 4, 2, 3, 1];

const GARAGE_LABELS = ["Demo Room", "Engineering", "Biology"];

const LABORATORY_LABELS = ["Mathematics", "Robotics", "Geography"];

const GARAGE_TIMES = [9, 17, 10];

const LABORATORY_TIMES = [23, 27, 25];

const Dashboard: React.VFC = () => {
	return (
		<React.Fragment>
			<div className="flex space-between space-x-6 mb-6">
				<Card title={`100`} description="TOTAL ROOMS CREATED">
					<PuzzleIcon className="w-20 h-20 text-pink-600" />
				</Card>
				<Card
					title={`${ROOMS_COMPLETED}`}
					description="TOTAL ROOMS COMPLETED"
				>
					<CheckCircleIcon className="w-20 h-20 text-green-500" />
				</Card>
				<Card
					title={`${AVERAGE_TIME} min`}
					description="AVERAGE TIME SPENT PER ROOM"
				>
					<ClockIcon className="w-20 h-20  text-blue-500" />
				</Card>
			</div>

			<div className="flex mb-6 space-x-6">
				<Panel
					title="Rooms started"
					description="From 2021-05-16 to 2022-05-22"
					className="flex-1"
				>
					<ChartComponent
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
						stacked={false}
						dataSets={[
							{
								label: "Garage",
								data: GARAGES_CREATED,
								backgroundColor: "rgba(190, 24, 93, 0.8)",
							},
							{
								label: "Laboratory",
								data: LABORATORIES_CREATED,
								backgroundColor: "rgba(53, 162, 235, 0.8)",
							},
						]}
					/>
				</Panel>

				<Panel
					title="Rooms started"
					description="From 2021-05-16 to 2022-05-22"
					className="flex-none"
				>
					<Doughnut
						data={{
							labels: ["Garages", "Laboratories"],
							datasets: [
								{
									label: "Created this week",
									data: [
										GARAGES_CREATED.reduce(
											(sum, next) => sum + next,
											0
										),
										LABORATORIES_CREATED.reduce(
											(sum, next) => sum + next,
											0
										),
									],
									backgroundColor: [
										"rgba(190, 24, 93, 0.9)",
										"rgba(53, 162, 235, 0.9)",
									],
									borderColor: [
										"rgba(255, 99, 132, 1)",
										"rgba(54, 162, 235, 1)",
									],
									borderWidth: 1,
								},
							],
						}}
					/>
				</Panel>
			</div>

			<div className="flex flex-col space-y-6">
				<Panel
					title="Average time spent"
					description="Average time to complete each room of type - garage"
					className="relative h-[480px] w-full"
					contentStyling="h-[400px]"
				>
					<Chart
						type="bar"
						data={{
							labels: GARAGE_LABELS,
							datasets: [
								{
									type: "line" as const,
									label: "Total average (min)",
									borderColor: "rgb(255, 99, 132)",
									borderWidth: 2,
									fill: false,
									data: GARAGE_LABELS.map(
										(_) => AVERAGE_TIME
									),
								},
								{
									type: "bar" as const,
									label: "Average time (min)",
									backgroundColor: "rgba(190, 24, 93, 0.9)",
									data: GARAGE_TIMES,
									borderColor: "white",
									borderWidth: 2,
								},
							],
						}}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							plugins: {
								legend: { position: "right" },
							},
						}}
					/>
				</Panel>

				<Panel
					title="Average time spent"
					description="Average time to complete each room of type - laboratory"
					className="relative h-[480px] w-full"
					contentStyling="h-[400px]"
				>
					<Chart
						type="bar"
						data={{
							labels: LABORATORY_LABELS,
							datasets: [
								{
									type: "line" as const,
									label: "Average of all rooms (min)",
									borderColor: "rgb(255, 99, 132)",
									borderWidth: 2,
									fill: false,
									data: LABORATORY_LABELS.map(
										(_) => AVERAGE_TIME
									),
								},
								{
									type: "bar" as const,
									label: "Average time (min)",
									backgroundColor: "rgba(53, 162, 235, 0.9)",
									data: LABORATORY_TIMES,
								},
							],
						}}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							plugins: {
								legend: { position: "right" },
							},
						}}
					/>
				</Panel>
			</div>
		</React.Fragment>
	);
};

(Dashboard as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Dashboard">{page}</AuthenticatedLayout>;
};

export default Dashboard;
