import { Party } from "./party.entity";
import * as fs from "fs";

export class PartyService {
	private async reinitializeDataFileIfNotAvail(): Promise<void> {
		try {
			await fs.promises.access("party.json", fs.constants.F_OK);
		} catch (e) {
			// initial date with current date + 7 days
			const initialDate = new Date();
			initialDate.setDate(initialDate.getDate() + 7);

			await fs.promises.writeFile(
				"party.json",
				JSON.stringify({
					where: "Here!",
					when: initialDate,
				}),
			);
		}
	}

	async getInfo(): Promise<Party> {
		await this.reinitializeDataFileIfNotAvail();

		const partyRawData = await fs.promises.readFile("party.json");
		const partyJson = JSON.parse(partyRawData.toString());

		const partyInfo = new Party();
		partyInfo.where = partyJson.where;
		partyInfo.when = new Date(partyJson.when);

		return partyInfo;
	}

	async saveInfo(party: Party): Promise<Party> {
		const partyData = JSON.stringify(party);
		await fs.promises.writeFile("party.json", partyData);
		return party;
	}
}
