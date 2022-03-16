import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PartyInput {
	@Field()
	where: string;

	@Field()
	when: Date;
}
