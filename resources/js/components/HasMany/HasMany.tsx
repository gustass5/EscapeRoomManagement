import { PlusIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { HasManyItem } from "./HasManyItem";
import { HasManyItemInterface } from "./helpers/HasManyInterfaces";

export const HasMany: React.VFC<{
	initialItems?: HasManyItemInterface[];
	setState: (items: HasManyItemInterface[]) => void;
}> = ({ initialItems = [], setState }) => {
	const [items, setItems] = useState<HasManyItemInterface[]>([
		...initialItems,
	]);

	useEffect(() => {
		setState(items);
	}, [items]);

	const updateItem = (index: number, value: string) => {
		const newItems = JSON.parse(JSON.stringify(items));
		newItems[index].value = value;
		setItems(newItems);
	};

	const updateAnswer = (
		questionIndex: number,
		answerIndex: number,
		value: string
	) => {
		const newItems: HasManyItemInterface[] = JSON.parse(
			JSON.stringify(items)
		);
		newItems[questionIndex].answers[answerIndex].value = value;
		setItems(newItems);
	};

	const removeItem = (index: number) => {
		setItems(items.filter((_, itemIndex) => itemIndex !== index));
	};

	return (
		<div className="text-gray-800 border border-gray-50 shadow px-4 py-1 rounded">
			<div className="flex items-center justify-between">
				<div>Questions</div>
				<div>
					<Button
						className="!w-auto text-white bg-pink-700 hover:bg-pink-800"
						handleClick={() => {
							setItems([
								...items,
								{
									id: null,
									value: "",
									answers: [
										{
											value: "",
											isCorrect: true,
										},
										{
											value: "",
											isCorrect: false,
										},
										{
											value: "",
											isCorrect: false,
										},
										{
											value: "",
											isCorrect: false,
										},
									],
								},
							]);
						}}
					>
						<PlusIcon className="h-6 w-4" />
					</Button>
				</div>
			</div>

			<div className="py-4 space-y-4">
				{items.map((item, index) => {
					return (
						<HasManyItem
							key={index}
							index={index}
							value={item.value}
							answers={item.answers}
							updateItem={(event) => {
								updateItem(index, event.target.value);
							}}
							updateAnswer={(event, answerIndex) => {
								updateAnswer(
									index,
									answerIndex,
									event.target.value
								);
							}}
							removeItem={() => {
								removeItem(index);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};
