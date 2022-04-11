import { useForm } from "@inertiajs/inertia-react";
import React, { ReactElement } from "react";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField/FormField";
import { Panel } from "../../components/Panel";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";
import { FormError } from "../../widgets/FormError";

const CreatePage: React.FC = () => {
	const { data, setData, post, processing, errors } = useForm({
		name: "",
		description: "",
	});

	function handleSubmit(event) {
		event.preventDefault();
		post("/login");
	}

	return (
		<Panel
			title="Create new room"
			footer={
				<Button
					className="!w-auto text-white bg-pink-700 hover:bg-pink-800"
					type="submit"
					disabled={processing}
				>
					Create
				</Button>
			}
		>
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="rounded-md shadow-sm space-y-4">
					<FormField
						identifier="name"
						value={data.name}
						handleChange={(event) =>
							setData("name", event.target.value.toString())
						}
					>
						Title
					</FormField>
					<FormError error={errors.name} />

					<FormField
						identifier="description"
						value={data.description}
						handleChange={(event) =>
							setData(
								"description",
								event.target.value.toString()
							)
						}
					>
						Description
					</FormField>
					<FormError error={errors.description} />
				</div>
			</form>
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
