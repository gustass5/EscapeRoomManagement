import React from "react";
import { FormField } from "../components/FormField/FormField";
import { FormError } from "./FormError";

export const RoomForm: React.FC<{
	data: {
		name: string;
		description: string;
		questions: { id: null | number; value: string }[];
	};
	errors: Record<"name" | "description" | "questions", string>;
	handleSubmit: (event: React.SyntheticEvent) => void;
	handleNameChange: (event: React.FormEvent<HTMLInputElement>) => void;
	handleDescriptionChange: (event: React.FormEvent<HTMLInputElement>) => void;
}> = ({
	data,
	errors,
	handleSubmit,
	handleNameChange,
	handleDescriptionChange,
	children,
}) => {
	return (
		<form
			id="roomCreationForm"
			className="space-y-6"
			onSubmit={handleSubmit}
		>
			<div className="rounded-md shadow-sm space-y-4">
				<FormField
					identifier="name"
					value={data.name}
					handleChange={handleNameChange}
				>
					Title
				</FormField>
				<FormError error={errors.name} />

				<FormField
					identifier="description"
					value={data.description}
					handleChange={handleDescriptionChange}
				>
					Description
				</FormField>
				<FormError error={errors.description} />
			</div>
			{children}
		</form>
	);
};
