import React from "react";

import { XIcon } from "@heroicons/react/outline";

export const HasManyItem: React.VFC<{
	index: number;
	value: string;
	updateItem: (event: any, index: number) => void;
	removeItem: (index: number) => void;
}> = ({ index, value, updateItem, removeItem }) => (
	<div className="relative">
		<input
			type="text"
			name="question"
			value={value}
			className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
			onChange={(event) => {
				updateItem(event, index);
			}}
		/>
		<XIcon
			onClick={() => {
				removeItem(index);
			}}
			className="absolute inset-y-0 right-0 h-5 w-5 m-2 cursor-pointer hover:text-pink-800"
		/>
	</div>
);
