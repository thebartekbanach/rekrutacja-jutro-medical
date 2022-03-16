import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PartyInput } from "./dto/partyInput.dto";
import { Party } from "./party.entity";
import { PartyService } from "./party.service";

@Resolver(() => Party)
export class PartyResolver {
	constructor(private readonly partyService: PartyService) {}

	@Query(() => Party)
	async partyInfo(): Promise<Party> {
		return await this.partyService.getInfo();
	}

	@Mutation(() => Party)
	async savePartyInfo(@Args("info") info: PartyInput): Promise<Party> {
		return await this.partyService.saveInfo(info);
	}
}
