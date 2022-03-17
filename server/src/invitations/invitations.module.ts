import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartyInfoService } from "src/party/partyInfo.service";
import { InvitationController } from "./invitation.controller";
import { Invitation } from "./invitation.entity";
import { InvitationsResolver } from "./invitations.resolver";
import { InvitationsService } from "./invitations.service";

@Module({
	imports: [TypeOrmModule.forFeature([Invitation])],
	providers: [InvitationsResolver, InvitationsService, PartyInfoService],
	controllers: [InvitationController],
})
export class InvitationsModule {}
