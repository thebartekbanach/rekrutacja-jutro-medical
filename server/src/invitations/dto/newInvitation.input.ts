import { Field, InputType } from "@nestjs/graphql";

@InputType({
	description:
		"Information about person invited to the party used to create new invitation",
})
export class NewInvitationInput {
	@Field({ description: "The first name of the person invited to the party" })
	firstName: string;

	@Field({ description: "The last name of the person invited to the party" })
	lastName: string;
}
