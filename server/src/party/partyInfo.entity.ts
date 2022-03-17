import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PartyInfo {
	@Field()
	where: string;

	@Field()
	when: Date;
}
