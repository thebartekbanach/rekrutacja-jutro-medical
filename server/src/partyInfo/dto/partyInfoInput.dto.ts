import { Field, InputType } from "@nestjs/graphql";

@InputType({
	description: "Updated information about the place and time of party",
})
export class PartyInfoInput {
	@Field({ description: "The name of the place where the party is held" })
	where: string;

	@Field({ description: "The time when party will start" })
	when: Date;
}
