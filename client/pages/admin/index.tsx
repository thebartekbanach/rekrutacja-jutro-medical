import styles from "../../styles/Admin.module.scss";
import button from "../../styles/Button.module.scss";
import common from "../../styles/Common.module.scss";
import { FC, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DatePicker } from "antd";
import moment from "moment";

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
	isAddingNewInvitationsLocked: boolean;
}

const InvitationAddForm: FC<InvitationAddFormProps> = ({
	onSubmit,
	isAddingNewInvitationsLocked,
}) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onSubmit(firstName, lastName);

		setFirstName("");
		setLastName("");
	};

	const formStyles = [styles["invitation-add-form"]];
	if (isAddingNewInvitationsLocked) {
		formStyles.push(styles["locked"]);
	}

	return (
		<div className={formStyles.join(" ")}>
			<form onSubmit={handleSubmit}>
				<header>Add invitation</header>

				<div className={styles["invitation-add-form-inputs"]}>
					<div>
						<label>First name</label>
						<input
							className={styles.input}
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>

					<div>
						<label>Last name</label>
						<input
							className={styles.input}
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
	isInvitationModificationLocked: boolean;
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

const GET_PARTY_INFO = gql`
	query {
		partyInfo {
			where
			when
		}
		isInvitationModificationLocked
	}
`;

const UPDATE_PARTY_INFO = gql`
	mutation ($info: PartyInput!) {
		savePartyInfo(info: $info) {
			where
			when
		}
	}
`;

interface PartyInfo {
	where: string;
	when: Date;
}

interface PartyInfoQueryResult {
	partyInfo: PartyInfo;
	isInvitationModificationLocked: boolean;
}

interface PartyInfoUpdateFormProps {
	storedWhere: string;
	storedWhen: Date;

	onUpdate: (where: string, when: Date) => void;
}

const PartyInfoUpdateForm: FC<PartyInfoUpdateFormProps> = ({
	storedWhere,
	storedWhen,
	onUpdate,
}) => {
	const [where, setWhere] = useState(storedWhere);
	const [when, setWhen] = useState(storedWhen);

	useEffect(() => {
		setWhere(storedWhere);
		setWhen(storedWhen);
	}, [storedWhere, storedWhen]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onUpdate(where, when);
	};

	return (
		<div className={styles["invitation-add-form"]}>
			<form onSubmit={handleSubmit}>
				<header>Party info</header>

				<div className={styles["invitation-add-form-inputs"]}>
					<div>
						<label>Place</label>
						<input
							className={styles.input}
							type="text"
							value={where}
							onChange={(e) => setWhere(e.target.value)}
							required
						/>
					</div>

					<div style={{ marginBottom: 20 }}>
						<label>When</label>
						<DatePicker
							showTime
							value={moment(when)}
							onChange={(date) =>
								setWhen(date?.toDate() ?? new Date())
							}
						/>
					</div>

					<button type="submit" className={button.button}>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

const AdminPage = () => {
	const { data } = useQuery<GetInvitationsQueryResult>(GET_ALL_INVITATIONS);
	const [createInvitation] = useMutation(CREATE_INVITATION);
	const [deleteInvitation] = useMutation(DELETE_INVITATION);

	const { data: partyInfoData } =
		useQuery<PartyInfoQueryResult>(GET_PARTY_INFO);
	const [updatePartyInfo] = useMutation(UPDATE_PARTY_INFO);

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

	const updatePartyInfoHandler = (where: string, when: Date) => {
		updatePartyInfo({
			variables: {
				info: {
					where,
					when,
				},
			},
			refetchQueries: [GET_PARTY_INFO],
		});
	};

	const isAddingNewInvitationsLocked =
		partyInfoData?.isInvitationModificationLocked ?? true;

	return (
		<main className={common["page-content"]}>
			<h1>Invitations list</h1>
			<InvitationsTable
				invitations={data?.invitations ?? []}
				onDelete={deleteInvitationHandler}
			/>
			<InvitationAddForm
				onSubmit={createInvitationHandler}
				isAddingNewInvitationsLocked={isAddingNewInvitationsLocked}
			/>
			<PartyInfoUpdateForm
				storedWhere={partyInfoData?.partyInfo.where ?? ""}
				storedWhen={partyInfoData?.partyInfo.when ?? new Date()}
				onUpdate={updatePartyInfoHandler}
			/>
		</main>
	);
};

export default AdminPage;
