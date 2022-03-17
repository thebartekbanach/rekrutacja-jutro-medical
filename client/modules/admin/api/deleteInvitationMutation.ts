import { gql, useMutation } from "@apollo/client";
import { INVITATIONS_AND_PARTY_INFO_QUERY } from "./invitationsAndPartyInfoQuery";

const DELETE_INVITATION = gql`
	mutation ($id: String!) {
		deleteInvitation(id: $id) {
			id
		}
	}
`;

interface DeleteInvitationMutationData {
	id: string;
}

interface DeleteInvitationMutationResult {
	deleteInvitation: {
		id: string;
	};
}

export const useDeleteInvitationMutation = () => {
	const [mutate, ...rest] = useMutation<
		DeleteInvitationMutationResult,
		DeleteInvitationMutationData
	>(DELETE_INVITATION);

	const deleteInvitation = (variables: DeleteInvitationMutationData) => {
		return mutate({
			variables,
			refetchQueries: [INVITATIONS_AND_PARTY_INFO_QUERY],
		});
	};

	return [deleteInvitation, ...rest] as const;
};
