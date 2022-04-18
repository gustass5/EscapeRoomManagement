import { PlusIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { HasManyItem } from "./HasManyItem";

export const HasMany: React.VFC<{
	initialItems?: { id: null | number; value: string }[];
	setState: (items: { id: null | number; value: string }[]) => void;
}> = ({ initialItems = [], setState }) => {
	const [items, setItems] = useState<{ id: null | number; value: string }[]>([
		...initialItems,
	]);

	useEffect(() => {
		setState(items);
	}, [items]);

	const updateItem = (index: number, value: string) => {
		const newItems = [...items];
		newItems[index].value = value;
		setItems(newItems);
	};

	return (
		<div>
			<div className="flex items-center justify-between bg-gray-50 shadow px-4 py-1 rounded">
				<div>Questions</div>
				<div>
					<Button
						className="!w-auto text-white bg-pink-700 hover:bg-pink-800"
						handleClick={() => {
							setItems([...items, { id: null, value: "" }]);
						}}
					>
						<PlusIcon className="h-6 w-4" />
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				{items.map((item, index) => {
					return (
						<HasManyItem
							key={index}
							index={index}
							value={item.value}
							updateItem={(event, index) => {
								updateItem(index, event.target.value);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};
