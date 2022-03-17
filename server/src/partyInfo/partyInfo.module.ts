import { Module } from "@nestjs/common";
import { PartyInfoResolver } from "./partyInfo.resolver";
import { PartyInfoService } from "./partyInfo.service";

@Module({
	providers: [PartyInfoResolver, PartyInfoService],
})
export class PartyInfoModule {}
