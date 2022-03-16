import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FC } from "react";
import common from "../../styles/Common.module.scss";
import button from "../../styles/Button.module.scss";

const GET_INVITATION_INFO = gql`
	query ($id: String!) {
		invitation(id: $id) {
			firstName
			status
		}
	}
`;

const ACCEPT_INVITATION = gql`
	mutation ($id: String!) {
		acceptInvitation(id: $id) {
			id
		}
	}
`;

const REJECT_INVITATION = gql`
	mutation ($id: String!) {
		rejectInvitation(id: $id) {
			id
		}
	}
`;

type InvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";

interface InvitationInfo {
	firstName: string;
	status: InvitationStatus;
}

interface GetInvitationInfoQueryResult {
	invitation: InvitationInfo;
}

interface AcceptanceBoxProps {
	invitationId: string;
	currentStatus: InvitationStatus;
}

interface ButtonProps {
	onClick: () => void;

	text: string;
	type?: "danger" | "success";
	forceSelected?: boolean;
	disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
	onClick,
	text,
	type,
	forceSelected,
	disabled,
}) => {
	let classes = [button.button];

	if (type === "danger") {
		classes.push(button.danger);
	}

	if (forceSelected) {
		classes.push(button.selected);
	}

	if (!forceSelected && disabled) {
		classes.push(button.disabled);
	}

	const className = classes.join(" ");

	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
};

const AcceptanceBox: FC<AcceptanceBoxProps> = ({
	invitationId,
	currentStatus,
}) => {
	const [acceptInvitation] = useMutation(ACCEPT_INVITATION);
	const [rejectInvitation] = useMutation(REJECT_INVITATION);

	const handleAccept = () => {
		acceptInvitation({
			variables: { id: invitationId },
			refetchQueries: [GET_INVITATION_INFO],
		});
	};

	const handleReject = () => {
		rejectInvitation({
			variables: { id: invitationId },
			refetchQueries: [GET_INVITATION_INFO],
		});
	};

	let isRejectButtonForceSelected = ["REJECTED", "CANCELLED"].includes(
		currentStatus
	);

	return (
		<div>
			<h2>Will you come?</h2>
			<div>
				<Button
					onClick={handleAccept}
					text="Yes"
					type="success"
					forceSelected={currentStatus === "ACCEPTED"}
				/>{" "}
				<Button
					onClick={handleReject}
					text="No"
					type="danger"
					forceSelected={isRejectButtonForceSelected}
				/>
			</div>
			<h3>You can change your mind up to 5 hours before party!</h3>
		</div>
	);
};

const InvitationPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data } = useQuery<GetInvitationInfoQueryResult>(
		GET_INVITATION_INFO,
		{
			variables: { id },
		}
	);

	const firstName = data?.invitation.firstName ?? "";

	return (
		<main className={common["page-content"]}>
			<h1>{firstName}, you received invitation for my birthday!</h1>
			<AcceptanceBox
				invitationId={id as string}
				currentStatus={data?.invitation.status ?? "PENDING"}
			/>
		</main>
	);
};

export default InvitationPage;
