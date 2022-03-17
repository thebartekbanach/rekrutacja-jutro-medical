import { useRouter } from "next/router";
import { FC } from "react";
import common from "../../styles/common.module.scss";
import { useGetInvitationInfoQuery } from "./api/getInvitationInfoQuery";
import { DownloadTicketButton } from "./downloadTicketButton";
import { InvitationAcceptanceBox } from "./invitationAcceptanceBox";

interface InvitationPageProps {
	id: string;
}

export const InvitationPage: FC<InvitationPageProps> = ({ id }) => {
	const { data } = useGetInvitationInfoQuery(id);

	const firstName = data?.invitation.firstName ?? "";
	const invitationAccepted = data?.invitation.status === "ACCEPTED";

	return (
		<main className={common["page-content"]}>
			<h1>{firstName}, you just got an invitation for my birthday!</h1>
			<InvitationAcceptanceBox
				invitationId={id as string}
				currentStatus={data?.invitation.status ?? "PENDING"}
				modificationsLocked={
					data?.isInvitationModificationLocked ?? true
				}
			/>
			<DownloadTicketButton
				invitationId={id}
				enabled={invitationAccepted}
			/>
		</main>
	);
};
