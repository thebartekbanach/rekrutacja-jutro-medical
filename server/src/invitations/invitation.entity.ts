import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum InvitationStatus {
	PENDING = 1,
	ACCEPTED = 2,
	REJECTED = 3,
	CANCELLED = 4,
}

// register graphql enum type
registerEnumType(InvitationStatus, {
	name: "InvitationStatus",
});

@Entity()
@ObjectType()
export class Invitation {
	@PrimaryGeneratedColumn()
	@Field(() => ID, { description: "The unique identifier of the invitation" })
	id: string;

	@Column()
	@Field({ description: "The first name of the person invited to the party" })
	firstName: string;

	@Column()
	@Field({ description: "The last name of the person invited to the party" })
	lastName: string;

	@Column({ default: InvitationStatus.PENDING })
	@Field(() => InvitationStatus, {
		description:
			"The status of the invitation, can be one of: PENDING, ACCEPTED, REJECTED, CANCELLED",
	})
	status: InvitationStatus;

	@Column({ nullable: true })
	@Field({
		nullable: true,
		description:
			"Time when the person changed the status of his/her invitation, updates every time for status acceptance / rejection",
	})
	statusUpdateDate?: Date;
}
