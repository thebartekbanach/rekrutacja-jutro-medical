import { gql, useMutation } from "@apollo/client";
import { GET_INVITATION_INFO } from "./getInvitationInfoQuery";

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

interface AcceptOrRejectInvitationData {
	id: string;
}

interface AcceptOrRejectInvitationResult {
	rejectInvitation: {
		id: string;
	};
}

export const useAcceptOrRejectInvitationMutation = () => {
	const [acceptInvitationMutation] = useMutation<
		AcceptOrRejectInvitationResult,
		AcceptOrRejectInvitationData
	>(ACCEPT_INVITATION);

	const [rejectInvitationMutation] = useMutation<
		AcceptOrRejectInvitationResult,
		AcceptOrRejectInvitationData
	>(REJECT_INVITATION);

	const acceptInvitation = (id: string) => {
		return acceptInvitationMutation({
			variables: { id },
			refetchQueries: [GET_INVITATION_INFO],
		});
	};

	const rejectInvitation = (id: string) => {
		return rejectInvitationMutation({
			variables: { id },
			refetchQueries: [GET_INVITATION_INFO],
		});
	};

	return {
		acceptInvitation,
		rejectInvitation,
	};
};
