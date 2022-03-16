import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewInvitationInput {
	@Field()
	firstName: string;

	@Field()
	lastName: string;
}
