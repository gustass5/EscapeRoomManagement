import React from "react";
import { FormField } from "../components/FormField/FormField";
import { FormError } from "./FormError";

export const RoomForm: React.FC<{
	// $$ Move into interface and from create page
	data: {
		name: string;
		description: string;
		questions: { id: null | number; value: string }[];
	};
	errors: Record<"name" | "description" | "questions", string>;
	// $$ Rast event type
	handleSubmit: (event: any) => void;
	handleNameChange: (event: any) => void;
	handleDescriptionChange: (event: any) => void;
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
