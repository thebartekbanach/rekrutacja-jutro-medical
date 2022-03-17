import { FC } from "react";

interface DownloadTicketButtonProps {
	invitationId: string;
	enabled: boolean;
}

export const DownloadTicketButton: FC<DownloadTicketButtonProps> = ({
	invitationId,
	enabled,
}) => {
	return (
		<a
			href={`/api/invitation/${invitationId}/ticket`}
			target="_blank"
			rel="noreferrer"
			style={{
				pointerEvents: enabled ? "all" : "none",
				opacity: enabled ? 1 : 0.2,
			}}
		>
			Download ticket
		</a>
	);
};
