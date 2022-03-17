import { useInvitationsAndPartyInfoQuery } from "./api/invitationsAndPartyInfoQuery";
import { InvitationAddForm } from "./invitationAddBox";
import { InvitationsTable } from "./invitationsTable";
import common from "../../styles/common.module.scss";
import { PartyInfoUpdateForm } from "./partyInfoUpdateForm";

export const AdminPage = () => {
	const { data } = useInvitationsAndPartyInfoQuery();

	const invitations = data?.invitations ?? [];
	const isAddingNewInvitationsLocked =
		data?.isInvitationModificationLocked ?? true;
	const partyInfoData = data?.partyInfo ?? { where: "", when: new Date() };

	return (
		<main className={common["page-content"]}>
			<InvitationsTable invitations={invitations} />
			<InvitationAddForm
				isAddingNewInvitationsLocked={isAddingNewInvitationsLocked}
			/>
			<PartyInfoUpdateForm
				serverStoredWhere={partyInfoData.where}
				serverStoredWhen={partyInfoData.when}
			/>
		</main>
	);
};
