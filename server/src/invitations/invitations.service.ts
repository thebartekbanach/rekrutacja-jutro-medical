import { InjectRepository } from "@nestjs/typeorm";
import { PartyInfoService } from "src/partyInfo/partyInfo.service";
import { Repository } from "typeorm";
import { NewInvitationInput } from "./dto/newInvitation.input";
import { Invitation, InvitationStatus } from "./invitation.entity";

export class InvitationsService {
	constructor(
		@InjectRepository(Invitation)
		private readonly invitationRepository: Repository<Invitation>,
		private readonly partyInfoService: PartyInfoService,
	) {}

	async isInvitationModificationLocked(): Promise<boolean> {
		const partyInfo = await this.partyInfoService.getInfo();

		const partyDate = partyInfo.when;
		const now = new Date();

		return partyDate.getTime() - now.getTime() < 5 * 60 * 60 * 1000;
	}

	async findAll(): Promise<Invitation[]> {
		return await this.invitationRepository.find();
	}

	async findOnlyAcceptedInvitations(): Promise<Invitation[]> {
		return await this.invitationRepository.find({
			where: { status: InvitationStatus.ACCEPTED },
		});
	}

	async findOne(id: string): Promise<Invitation> {
		const invitation = await this.invitationRepository.findOne(id);

		if (invitation === undefined) {
			throw new Error("Invitation not found");
		}

		return invitation;
	}

	async create(userInformation: NewInvitationInput): Promise<Invitation> {
		if (await this.isInvitationModificationLocked()) {
			throw new Error(
				"Creating invitations is not possible due to the short response time for the user",
			);
		}

		const invitation = new Invitation();

		invitation.firstName = userInformation.firstName;
		invitation.lastName = userInformation.lastName;
		invitation.status = InvitationStatus.PENDING;

		return await this.invitationRepository.save(invitation);
	}

	async acceptInvitation(id: string): Promise<Invitation> {
		if (await this.isInvitationModificationLocked()) {
			throw new Error(
				"Accepting invitations is not possible due to the short response time for the user",
			);
		}

		const invitation = await this.findOne(id);

		invitation.status = InvitationStatus.ACCEPTED;
		invitation.statusUpdateDate = new Date();

		return await this.invitationRepository.save(invitation);
	}

	async rejectInvitation(id: string): Promise<Invitation> {
		if (await this.isInvitationModificationLocked()) {
			throw new Error(
				"Rejecting invitations is not possible due to the short response time for the user",
			);
		}

		const invitation = await this.findOne(id);

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
		const invitation = await this.findOne(id);
		await this.invitationRepository.delete(id);
		return invitation;
	}
}
