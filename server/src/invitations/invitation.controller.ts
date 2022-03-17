import { Controller, Get, Header, Param, Render } from "@nestjs/common";
import { PartyInfoService } from "src/party/partyInfo.service";
import { InvitationsService } from "./invitations.service";
import { TicketDto } from "./dto/ticket.dto";

@Controller("invitation")
export class InvitationController {
	constructor(
		private readonly invitationService: InvitationsService,
		private readonly partyInfoService: PartyInfoService,
	) {}

	@Get(":id/ticket")
	@Render("ticket.hbs")
	@Header("Content-Type", "text/html")
	@Header("Content-Disposition", "attachment; filename=ticket.html")
	async getTicket(@Param("id") id: string) {
		const invitation = await this.invitationService.findOne(id);
		const partyInfo = await this.partyInfoService.getInfo();

		const allAcceptedInvitations =
			await this.invitationService.findOnlyAcceptedInvitations();

		const peopleWhoAcceptedInvitations = allAcceptedInvitations
			.filter((invitation) => invitation.id != id)
			.map((invitation) => `${invitation.firstName} ${invitation.lastName}`);

		const model: TicketDto = {
			firstName: invitation.firstName,
			lastName: invitation.lastName,
			where: partyInfo.where,
			when: partyInfo.when.toLocaleString("pl-PL", {
				timeZone: "Europe/Warsaw",
			}),
			peopleWhoAcceptedInvitations,
		};

		return model;
	}
}
