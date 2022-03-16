import styles from "../../styles/Admin.module.scss";
import button from "../../styles/Button.module.scss";
import common from "../../styles/Common.module.scss";
import { FC, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

interface InvitationInfo {
	id: string;
	firstName: string;
	lastName: string;
	status: string;
	statusUpdateDate?: string;
}

interface InvitationTableRowProps {
	invitation: InvitationInfo;
	onDelete: (id: string) => void;
}

const InvitationTableRow: FC<InvitationTableRowProps> = ({
	invitation: { id, firstName, lastName, status, statusUpdateDate },
	onDelete,
}) => {
	const lastUpdateOrEmpty = statusUpdateDate
		? new Date(statusUpdateDate).toLocaleString()
		: "Not answered yet";

	const handleDelete = () => {
		onDelete(id);
	};

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(
			`${window.location.origin}/invitation/${id}`
		);

		alert("Link copied!");
	};

	return (
		<tr>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{status}</td>
			<td>{lastUpdateOrEmpty}</td>
			<td>
				<button onClick={handleCopyToClipboard}>Copy link</button>{" "}
				<button onClick={handleDelete}>Delete</button>
			</td>
		</tr>
	);
};

interface InvitationTableProps {
	invitations: InvitationInfo[];
	onDelete: (id: string) => void;
}

const InvitationsTable: FC<InvitationTableProps> = ({
	invitations,
	onDelete,
}) => {
	const renderedInvitationData = invitations.map((invitation) => (
		<InvitationTableRow
			key={invitation.id}
			invitation={invitation}
			onDelete={onDelete}
		/>
	));

	return (
		<table className={styles["invitations-table"]}>
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Current status</th>
					<th>Last update</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>{renderedInvitationData}</tbody>
		</table>
	);
};

interface InvitationAddFormProps {
	onSubmit: (firstName: string, lastName: string) => void;
}

const InvitationAddForm: FC<InvitationAddFormProps> = ({ onSubmit }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onSubmit(firstName, lastName);

		setFirstName("");
		setLastName("");
	};

	return (
		<div className={styles["invitation-add-form"]}>
			<form id="book-creation-form" onSubmit={handleSubmit}>
				<header>Add invitation</header>

				<div className={styles["invitation-add-form-inputs"]}>
					<div>
						<label>First name</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>

					<div>
						<label>Last name</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
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

const GET_ALL_INVITATIONS = gql`
	query {
		invitations {
			id
			firstName
			lastName
			status
			statusUpdateDate
		}
	}
`;

interface GetInvitationsQueryResult {
	invitations: InvitationInfo[];
}

const CREATE_INVITATION = gql`
	mutation ($personData: NewInvitationInput!) {
		createInvitation(for: $personData) {
			id
		}
	}
`;

const DELETE_INVITATION = gql`
	mutation ($id: String!) {
		deleteInvitation(id: $id) {
			id
		}
	}
`;

const AdminPage = () => {
	const { data } = useQuery<GetInvitationsQueryResult>(GET_ALL_INVITATIONS);
	const [createInvitation] = useMutation(CREATE_INVITATION);
	const [deleteInvitation] = useMutation(DELETE_INVITATION);

	const createInvitationHandler = (firstName: string, lastName: string) => {
		createInvitation({
			variables: {
				personData: {
					firstName,
					lastName,
				},
			},
			refetchQueries: [GET_ALL_INVITATIONS],
		});
	};

	const deleteInvitationHandler = (id: string) => {
		deleteInvitation({
			variables: {
				id,
			},
			refetchQueries: [GET_ALL_INVITATIONS],
		});
	};

	return (
		<main className={common["page-content"]}>
			<h1>Invitations list</h1>
			<InvitationsTable
				invitations={data?.invitations ?? []}
				onDelete={deleteInvitationHandler}
			/>
			<InvitationAddForm onSubmit={createInvitationHandler} />
		</main>
	);
};

export default AdminPage;
