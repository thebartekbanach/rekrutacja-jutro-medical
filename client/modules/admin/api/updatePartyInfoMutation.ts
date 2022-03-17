import { gql, useMutation } from "@apollo/client";
import { INVITATIONS_AND_PARTY_INFO_QUERY } from "./invitationsAndPartyInfoQuery";

const UPDATE_PARTY_INFO = gql`
	mutation ($info: PartyInfoInput!) {
		savePartyInfo(info: $info) {
			where
			when
		}
	}
`;

interface UpdatePartyInfoData {
	info: {
		where: string;
		when: string;
	};
}

interface UpdatePartyInfoResult {
	savePartyInfo: {
		where: string;
		when: string;
	};
}

export const useUpdatePartyInfoMutation = () => {
	const [mutate, ...rest] = useMutation<
		UpdatePartyInfoResult,
		UpdatePartyInfoData
	>(UPDATE_PARTY_INFO);

	const updatePartyInfo = (variables: UpdatePartyInfoData) => {
		return mutate({
			variables,
			refetchQueries: [INVITATIONS_AND_PARTY_INFO_QUERY],
		});
	};

	return [updatePartyInfo, ...rest] as const;
};
