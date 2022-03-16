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
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field(() => InvitationStatus)
	@Column({ default: InvitationStatus.PENDING })
	status: InvitationStatus;

	@Field({ nullable: true })
	@Column({ nullable: true })
	statusUpdateDate?: Date;
}
