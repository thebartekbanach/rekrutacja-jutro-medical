import Head from "next/head";
import { AdminPage as AdminPageContent } from "../../modules/admin";

const AdminPage = () => {
	return (
		<>
			<Head>
				<title>Panel - Invitation list</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminPageContent />
		</>
	);
};

export default AdminPage;
