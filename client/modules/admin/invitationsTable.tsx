import { FC } from "react";
import { useDeleteInvitationMutation } from "./api/deleteInvitationMutation";
import { InvitationInfo } from "./api/invitationsAndPartyInfoQuery";
import table from "./styles/table.module.scss";

const handleInvitationLinkCopyToClipboard = (id: string) => () => {
	navigator.clipboard.writeText(`${window.location.origin}/invitation/${id}`);
	alert("Link copied to clipboard!");
};

interface InvitationTableRowProps {
	invitation: InvitationInfo;
	onDelete: () => void;
}

const InvitationTableRow: FC<InvitationTableRowProps> = ({
	invitation: { id, firstName, lastName, status, statusUpdateDate },
	onDelete: handleDelete,
}) => {
	const lastUpdateOrEmpty = statusUpdateDate
		? new Date(statusUpdateDate).toLocaleString()
		: "Not answered yet";

	return (
		<tr>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{status}</td>
			<td>{lastUpdateOrEmpty}</td>
			<td>
				<button onClick={handleInvitationLinkCopyToClipboard(id)}>
					Copy link
				</button>{" "}
				<button onClick={handleDelete}>Delete</button>
			</td>
		</tr>
	);
};

interface InvitationTableProps {
	invitations: InvitationInfo[];
}

export const InvitationsTable: FC<InvitationTableProps> = ({ invitations }) => {
	const [deleteInvitation] = useDeleteInvitationMutation();

	const handleDelete = (id: string) => () => {
		deleteInvitation({ id });
	};

	const renderedInvitationData = invitations.map((invitation) => (
		<InvitationTableRow
			key={invitation.id}
			invitation={invitation}
			onDelete={handleDelete(invitation.id)}
		/>
	));

	return (
		<>
			<h1>Invitations list</h1>
			<table className={table["invitations-table"]}>
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
		</>
	);
};
