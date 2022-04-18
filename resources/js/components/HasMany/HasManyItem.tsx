import React from "react";

export const HasManyItem: React.VFC<{
	index: number;
	value: string;
	updateItem: (event: any, index: number) => void;
}> = ({ index, value, updateItem }) => (
	<div>
		<input
			type="text"
			name="question"
			value={value}
			className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
			onChange={(event) => {
				updateItem(event, index);
			}}
		/>
	</div>
);
