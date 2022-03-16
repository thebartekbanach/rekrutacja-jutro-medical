import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartyService } from "src/party/party.service";
import { Invitation } from "./invitation.entity";
import { InvitationsResolver } from "./invitations.resolver";
import { InvitationsService } from "./invitations.service";

@Module({
	imports: [TypeOrmModule.forFeature([Invitation])],
	providers: [InvitationsResolver, InvitationsService, PartyService],
})
export class InvitationsModule {}
