import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewInvitationInput } from "./dto/newInvitation.input";
import { Invitation, InvitationStatus } from "./invitation.entity";

export class InvitationsService {
	constructor(
		@InjectRepository(Invitation)
		private readonly invitationRepository: Repository<Invitation>,
	) {}

	async findAll(): Promise<Invitation[]> {
		return await this.invitationRepository.find();
	}

	async findOne(id: string): Promise<Invitation> {
		return await this.invitationRepository.findOne(id);
	}

	async create(userInformation: NewInvitationInput): Promise<Invitation> {
		const invitation = new Invitation();

		invitation.firstName = userInformation.firstName;
		invitation.lastName = userInformation.lastName;
		invitation.status = InvitationStatus.PENDING;

		return await this.invitationRepository.save(invitation);
	}

	async acceptInvitation(id: string): Promise<Invitation> {
		const invitation = await this.invitationRepository.findOne(id);

		invitation.status = InvitationStatus.ACCEPTED;
		invitation.statusUpdateDate = new Date();

		return await this.invitationRepository.save(invitation);
	}

	async rejectInvitation(id: string): Promise<Invitation> {
		const invitation = await this.invitationRepository.findOne(id);

		switch (invitation.status) {
			case InvitationStatus.PENDING:
				invitation.status = InvitationStatus.REJECTED;
				break;

			case InvitationStatus.ACCEPTED:
				invitation.status = InvitationStatus.CANCELLED;
				break;

			case InvitationStatus.CANCELLED:
				break;

			case InvitationStatus.REJECTED:
				break;
		}

		invitation.statusUpdateDate = new Date();

		return await this.invitationRepository.save(invitation);
	}

	async delete(id: string): Promise<Invitation> {
		const invitation = await this.invitationRepository.findOne(id);
		await this.invitationRepository.delete(id);
		return invitation;
	}
}
