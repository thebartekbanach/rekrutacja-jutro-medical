import { Controller, Get, Header, Param } from "@nestjs/common";
import { PartyInfoService } from "src/party/partyInfo.service";
import { InvitationsService } from "./invitations.service";

@Controller("invitation")
export class InvitationController {
	constructor(
		private readonly invitationService: InvitationsService,
		private readonly partyInfoService: PartyInfoService,
	) {}

	@Get(":id/ticket")
	@Header("Content-Type", "text/html")
	@Header("Content-Disposition", "attachment; filename=ticket.html")
	async getTicket(@Param("id") id: string): Promise<string> {
		const invitation = await this.invitationService.findOne(id);
		const partyInfo = await this.partyInfoService.getInfo();
		const acceptedInvitations =
			await this.invitationService.findOnlyAcceptedInvitations();

		const acceptedInvitationsHtmlList = acceptedInvitations
			.map(
				(invitation) =>
					`<li>${invitation.firstName} ${invitation.lastName}</li>`,
			)
			.join("");

		const html = `
			<html>
				<body>
					<h1>
						This is valid invitation ticket for:
						${invitation.firstName} ${invitation.lastName}
					</h1>
					<h2>Party information:</h2>
					<ul>
						<li>Where: ${partyInfo.where}</li>
						<li>When: ${partyInfo.when}</li>
					</ul>
					<h2>List of people who accepted invitations:</h2>
					<ul>
						${acceptedInvitationsHtmlList}
					</ul>
				</body>
			</html>
		`;

		return html;
	}
}
