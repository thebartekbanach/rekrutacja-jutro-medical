import { gql, useMutation } from "@apollo/client";
import { INVITATIONS_AND_PARTY_INFO_QUERY } from "./invitationsAndPartyInfoQuery";

const CREATE_INVITATION_MUTATION = gql`
	mutation ($personData: NewInvitationInput!) {
		createInvitation(for: $personData) {
			id
		}
	}
`;

interface CreateInvitationMutationData {
	personData: {
		firstName: string;
		lastName: string;
	};
}

interface CreateInvitationMutationResult {
	createInvitation: {
		id: string;
	};
}

export const useCreateInvitationMutation = () => {
	const [mutate, ...rest] = useMutation<
		CreateInvitationMutationResult,
		CreateInvitationMutationData
	>(CREATE_INVITATION_MUTATION);

	const createInvitation = (variables: CreateInvitationMutationData) => {
		return mutate({
			variables,
			refetchQueries: [INVITATIONS_AND_PARTY_INFO_QUERY],
		});
	};

	return [createInvitation, ...rest] as const;
};
