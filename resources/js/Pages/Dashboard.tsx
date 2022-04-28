import React, { ReactElement } from "react";
import { Chart } from "../components/Chart";
import { Panel } from "../components/Panel";
import { AuthenticatedLayout } from "../layout/AuthenticatedLayout";

const Dashboard: React.VFC = () => {
	return (
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
					"January 2022",
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
	);
};

(Dashboard as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Dashboard">{page}</AuthenticatedLayout>;
};

export default Dashboard;
