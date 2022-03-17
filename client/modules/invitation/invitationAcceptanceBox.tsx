import { FC } from "react";
import { useAcceptOrRejectInvitationMutation } from "./api/acceptOrRejectInvitationMutation";
import { InvitationStatus } from "./api/getInvitationInfoQuery";
import { Button } from "./button";

interface AcceptanceBoxProps {
	invitationId: string;
	currentStatus: InvitationStatus;
	modificationsLocked: boolean;
}

export const InvitationAcceptanceBox: FC<AcceptanceBoxProps> = ({
	invitationId,
	currentStatus,
	modificationsLocked,
}) => {
	const { acceptInvitation, rejectInvitation } =
		useAcceptOrRejectInvitationMutation();

	const handleAccept = () => {
		acceptInvitation(invitationId);
	};

	const handleReject = () => {
		rejectInvitation(invitationId);
	};

	const isAcceptedButtonForceSelected = currentStatus === "ACCEPTED";

	const isRejectButtonForceSelected = ["REJECTED", "CANCELLED"].includes(
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
					forceSelected={isAcceptedButtonForceSelected}
					disabled={modificationsLocked}
				/>{" "}
				<Button
					onClick={handleReject}
					text="No"
					type="danger"
					forceSelected={isRejectButtonForceSelected}
					disabled={modificationsLocked}
				/>
			</div>
			<h3>You can change your mind up to 5 hours before the party!</h3>
		</div>
	);
};
