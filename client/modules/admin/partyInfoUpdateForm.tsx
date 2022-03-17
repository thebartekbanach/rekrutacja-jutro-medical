import { DatePicker } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import form from "./styles/form.module.scss";
import button from "../../styles/button.module.scss";
import { useUpdatePartyInfoMutation } from "./api/updatePartyInfoMutation";

interface PartyInfoUpdateFormProps {
	serverStoredWhere: string;
	serverStoredWhen: Date;
}

const usePartyInfoUpdateState = ({
	serverStoredWhere,
	serverStoredWhen,
}: PartyInfoUpdateFormProps) => {
	const [updatePartyInfo] = useUpdatePartyInfoMutation();

	const [where, setWhere] = useState(serverStoredWhere);
	const [when, setWhen] = useState(serverStoredWhen);

	useEffect(() => {
		setWhere(serverStoredWhere);
		setWhen(serverStoredWhen);
	}, [serverStoredWhere, serverStoredWhen]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updatePartyInfo({ info: { where, when: when.toString() } });
	};

	const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWhere(e.target.value);
	};

	const handleDateChange = (date: moment.Moment | null) => {
		setWhen(date?.toDate() ?? new Date());
	};

	return {
		where,
		when: moment(when),
		handleSubmit,
		handlePlaceChange,
		handleDateChange,
	};
};
export const PartyInfoUpdateForm: FC<PartyInfoUpdateFormProps> = (props) => {
	const { where, when, handleSubmit, handlePlaceChange, handleDateChange } =
		usePartyInfoUpdateState(props);

	return (
		<div className={form["add-form"]}>
			<form onSubmit={handleSubmit}>
				<header>Party info</header>

				<div className={form["add-form-inputs"]}>
					<div>
						<label>Place</label>
						<input
							className={form.input}
							type="text"
							value={where}
							onChange={handlePlaceChange}
							required
						/>
					</div>

					<div style={{ marginBottom: 20 }}>
						<label>When</label>
						<DatePicker
							showTime
							value={moment(when)}
							onChange={handleDateChange}
						/>
					</div>

					<button type="submit" className={button.button}>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};
