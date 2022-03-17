import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PartyInfoInput {
	@Field()
	where: string;

	@Field()
	when: Date;
}
