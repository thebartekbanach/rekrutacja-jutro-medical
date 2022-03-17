import { FC, useState } from "react";
import form from "./styles/form.module.scss";
import button from "../../styles/button.module.scss";
import { useCreateInvitationMutation } from "./api/createInvitationMutation";

interface InvitationAddFormProps {
	isAddingNewInvitationsLocked: boolean;
}

const useInvitationAddFormState = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [addInvitation] = useCreateInvitationMutation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		addInvitation({ personData: { firstName, lastName } });

		setFirstName("");
		setLastName("");
	};

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value);
	};

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
	};

	return {
		firstName,
		lastName,
		handleFirstNameChange,
		handleLastNameChange,
		handleSubmit,
	};
};

export const InvitationAddForm: FC<InvitationAddFormProps> = ({
	isAddingNewInvitationsLocked,
}) => {
	const {
		firstName,
		lastName,
		handleFirstNameChange,
		handleLastNameChange,
		handleSubmit,
	} = useInvitationAddFormState();

	const formStyles = [form["add-form"]];
	if (isAddingNewInvitationsLocked) {
		formStyles.push(form.locked);
	}

	return (
		<div className={formStyles.join(" ")}>
			<form onSubmit={handleSubmit}>
				<header>Add invitation</header>

				<div className={form["add-form-inputs"]}>
					<div>
						<label>First name</label>
						<input
							className={form.input}
							type="text"
							value={firstName}
							onChange={handleFirstNameChange}
							required
						/>
					</div>

					<div>
						<label>Last name</label>
						<input
							className={form.input}
							type="text"
							value={lastName}
							onChange={handleLastNameChange}
							required
						/>
					</div>

					<button type="submit" className={button.button}>
						Invite
					</button>
				</div>
			</form>
		</div>
	);
};
