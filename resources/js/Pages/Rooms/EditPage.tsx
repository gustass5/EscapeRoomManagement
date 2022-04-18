import React, { ReactElement } from "react";
import { Page } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";

import { HasMany } from "../../components/HasMany/HasMany";
import { Button } from "../../components/Button/Button";
import { Panel } from "../../components/Panel";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";
import { RoomForm } from "../../widgets/RoomForm";
import { QuestionInterface } from "../../helpers/RoomInterfaces";

const EditPage: React.FC = () => {
	const { room, questions } = usePage<
		Page<{
			room: {
				id: number;
				name: string;
				description: string;
			};
			questions: { id: number; question: string }[];
		}>
	>().props;

	const { data, setData, post, processing, errors } = useForm<{
		name: string;
		description: string;
		questions: QuestionInterface[];
	}>({
		name: room.name,
		description: room.description,
		questions: questions.map((question) => ({
			id: question.id,
			value: question.question,
		})),
	});

	function handleSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		post(`/rooms/${room.id}/edit`);
	}

	return (
		<Panel
			title="Update room"
			footer={
				<Button
					type="submit"
					className="!w-auto text-white bg-pink-700 hover:bg-pink-800"
					disabled={processing}
					form="roomCreationForm"
				>
					Update
				</Button>
			}
		>
			<RoomForm
				data={data}
				errors={errors}
				handleSubmit={handleSubmit}
				handleNameChange={(event: React.FormEvent<HTMLInputElement>) =>
					setData("name", event.target.value.toString())
				}
				handleDescriptionChange={(
					event: React.FormEvent<HTMLInputElement>
				) => setData("description", event.target.value.toString())}
			>
				<HasMany
					initialItems={data.questions}
					setState={(
						questions: { id: null | number; value: string }[]
					) => {
						setData("questions", questions);
					}}
				/>
			</RoomForm>
		</Panel>
	);
};

(EditPage as any).layout = (page: ReactElement) => {
	return (
		<AuthenticatedLayout title="Create new room">
			{page}
		</AuthenticatedLayout>
	);
};

export default EditPage;
