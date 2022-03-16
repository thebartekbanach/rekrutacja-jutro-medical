import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartyService } from "src/party/party.service";
import { InvitationController } from "./invitation.controller";
import { Invitation } from "./invitation.entity";
import { InvitationsResolver } from "./invitations.resolver";
import { InvitationsService } from "./invitations.service";

@Module({
	imports: [TypeOrmModule.forFeature([Invitation])],
	providers: [InvitationsResolver, InvitationsService, PartyService],
	controllers: [InvitationController],
})
export class InvitationsModule {}
