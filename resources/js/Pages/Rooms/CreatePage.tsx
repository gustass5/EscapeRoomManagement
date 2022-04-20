import { useForm } from "@inertiajs/inertia-react";
import React, { ReactElement } from "react";
import { HasMany } from "../../components/HasMany/HasMany";
import { Button } from "../../components/Button/Button";
import { Panel } from "../../components/Panel";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";
import { RoomForm } from "../../widgets/RoomForm";
import { QuestionInterface } from "../../helpers/RoomInterfaces";

const CreatePage: React.FC = () => {
	const { data, setData, post, processing, errors } = useForm<{
		name: string;
		description: string;
		questions: QuestionInterface[];
	}>({
		name: "",
		description: "",
		questions: [],
	});

	function handleSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		post("/rooms/create");
	}

	return (
		<Panel
			title="Create new room"
			footer={
				<Button
					type="submit"
					className="!w-auto text-white bg-pink-700 hover:bg-pink-800"
					disabled={processing}
					form="roomCreationForm"
				>
					Create
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
					setState={(questions: QuestionInterface[]) => {
						setData("questions", questions);
					}}
				/>
			</RoomForm>
		</Panel>
	);
};

(CreatePage as any).layout = (page: ReactElement) => {
	return (
		<AuthenticatedLayout title="Create new room">
			{page}
		</AuthenticatedLayout>
	);
};

export default CreatePage;
