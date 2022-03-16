import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewInvitationInput } from "./dto/newInvitation.input";
import { Invitation } from "./invitation.entity";
import { InvitationsService } from "./invitations.service";

@Resolver(() => Invitation)
export class InvitationsResolver {
	constructor(private readonly invitationService: InvitationsService) {}

	@Query(() => [Invitation])
	async invitations(): Promise<Invitation[]> {
		return await this.invitationService.findAll();
	}

	@Query(() => Invitation)
	async invitation(@Args("id") id: string): Promise<Invitation> {
		return await this.invitationService.findOne(id);
	}

	@Mutation(() => Invitation)
	async createInvitation(
		@Args("for") invitation: NewInvitationInput,
	): Promise<Invitation> {
		return await this.invitationService.create(invitation);
	}

	@Mutation(() => Invitation)
	async acceptInvitation(@Args("id") id: string): Promise<Invitation> {
		return await this.invitationService.acceptInvitation(id);
	}

	@Mutation(() => Invitation)
	async rejectInvitation(@Args("id") id: string): Promise<Invitation> {
		return await this.invitationService.rejectInvitation(id);
	}

	@Mutation(() => Invitation)
	async deleteInvitation(@Args("id") id: string): Promise<Invitation> {
		return await this.invitationService.delete(id);
	}
}
