import { PartyInfo } from "./partyInfo.entity";
import * as fs from "fs";

export class PartyInfoService {
	private getInitialDataFileContents(): PartyInfo {
		// initial date with current date + 7 days
		const initialDate = new Date();
		initialDate.setDate(initialDate.getDate() + 7);
		return {
			where: "Here!",
			when: initialDate,
		};
	}

	private async reinitializeDataFile(): Promise<PartyInfo> {
		console.log("Reinitializing party.json data file");
		const initialContents = this.getInitialDataFileContents();
		return this.saveInfo(initialContents);
	}

	private async reinitializeDataFileIfNotAvail(): Promise<void> {
		try {
			await fs.promises.access("party.json", fs.constants.F_OK);
		} catch (e) {
			await this.reinitializeDataFile();
		}
	}

	async getInfo(): Promise<PartyInfo> {
		await this.reinitializeDataFileIfNotAvail();

		let partyJson: Record<string, string>;
		const partyInfo = new PartyInfo();

		try {
			const partyRawData = await fs.promises.readFile("party.json");
			partyJson = JSON.parse(partyRawData.toString());
		} catch (e) {
			console.log(`Data file reading error: ${e}`);
			return await this.reinitializeDataFile();
		}

		try {
			const rawDate = Date.parse(partyJson.when);
			if (isNaN(rawDate)) {
				throw new Error("Date is not valid");
			}

			partyInfo.where = partyJson.where;
			partyInfo.when = new Date(rawDate);

			if (partyInfo.where === undefined || partyInfo.where.trim() === "") {
				throw new Error("Party place not found in party.json");
			}
		} catch (e) {
			console.log(`Data file parsing error: ${e}`);
			return await this.reinitializeDataFile();
		}

		return partyInfo;
	}

	async saveInfo(party: PartyInfo): Promise<PartyInfo> {
		if (party.where === "") {
			throw new Error("Party place is required");
		}

		const partyData = JSON.stringify(party);
		await fs.promises.writeFile("party.json", partyData);
		return party;
	}
}
