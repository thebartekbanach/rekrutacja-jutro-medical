import { gql, useQuery } from "@apollo/client";

export const INVITATIONS_AND_PARTY_INFO_QUERY = gql`
	query {
		invitations {
			id
			firstName
			lastName
			status
			statusUpdateDate
		}

		partyInfo {
			where
			when
		}

		isInvitationModificationLocked
	}
`;

export interface InvitationInfo {
	id: string;
	firstName: string;
	lastName: string;
	status: string;
	statusUpdateDate?: string;
}

export interface PartyInfo {
	where: string;
	when: Date;
}

interface InvitationsAndPartyInfoQueryResult {
	invitations: InvitationInfo[];
	partyInfo: PartyInfo;
	isInvitationModificationLocked: boolean;
}

export const useInvitationsAndPartyInfoQuery = () => {
	return useQuery<InvitationsAndPartyInfoQueryResult>(
		INVITATIONS_AND_PARTY_INFO_QUERY
	);
};
