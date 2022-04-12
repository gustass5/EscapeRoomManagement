import React, { ReactElement } from "react";
import { AuthenticatedLayout } from "../layout/AuthenticatedLayout";

const Dashboard: React.VFC = () => {
	return (
		<div className="px-4 py-6 sm:px-0">
			<div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
		</div>
	);
};

(Dashboard as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Dashboard">{page}</AuthenticatedLayout>;
};

export default Dashboard;
