import { gql, useQuery } from "@apollo/client";

export const GET_INVITATION_INFO = gql`
	query ($id: String!) {
		invitation(id: $id) {
			firstName
			status
		}
		isInvitationModificationLocked
	}
`;

interface GetInvitationInfoData {
	id: string;
}

export type InvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";

interface GetInvitationInfoResult {
	invitation: {
		firstName: string;
		status: InvitationStatus;
	};
	isInvitationModificationLocked: boolean;
}

export const useGetInvitationInfoQuery = (id: string) => {
	return useQuery<GetInvitationInfoResult, GetInvitationInfoData>(
		GET_INVITATION_INFO,
		{
			variables: { id },
		}
	);
};
