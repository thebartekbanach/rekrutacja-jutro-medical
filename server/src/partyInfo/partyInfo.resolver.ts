import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PartyInfoInput } from "./dto/partyInfoInput.dto";
import { PartyInfo } from "./partyInfo.entity";
import { PartyInfoService } from "./partyInfo.service";

@Resolver(() => PartyInfo)
export class PartyInfoResolver {
	constructor(private readonly partyService: PartyInfoService) {}

	@Query(() => PartyInfo)
	async partyInfo(): Promise<PartyInfo> {
		return await this.partyService.getInfo();
	}

	@Mutation(() => PartyInfo)
	async savePartyInfo(@Args("info") info: PartyInfoInput): Promise<PartyInfo> {
		return await this.partyService.saveInfo(info);
	}
}
