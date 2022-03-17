import { useRouter } from "next/router";
import { InvitationPage as InvitationPageContent } from "../../modules/invitation";

const InvitationPage = () => {
	const router = useRouter();

	const { id: rawId } = router.query;
	const id = (rawId as string) ?? "";

	return <InvitationPageContent id={id} />;
};

export default InvitationPage;
