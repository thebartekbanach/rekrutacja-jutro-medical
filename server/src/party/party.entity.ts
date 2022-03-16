import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Party {
	@Field()
	where: string;

	@Field()
	when: Date;
}
