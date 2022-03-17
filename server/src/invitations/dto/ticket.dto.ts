// This is view model used in ticket.hbs file
export interface TicketDto {
	// Person info who ticket is for
	firstName: string;
	lastName: string;

	// Information about the party
	where: string;
	when: string;

	// List of people names who already accepted invitations
	peopleWhoAcceptedInvitations: string[];
}
