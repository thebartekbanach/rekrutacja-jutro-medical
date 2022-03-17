import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Information about the place and time of party" })
export class PartyInfo {
	@Field({ description: "The name of the place where the party is held" })
	where: string;

	@Field({ description: "The time when party will start" })
	when: Date;
}
