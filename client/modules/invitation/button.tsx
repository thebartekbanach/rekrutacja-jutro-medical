import { FC } from "react";
import button from "../../styles/button.module.scss";

interface ButtonProps {
	onClick: () => void;

	text: string;
	type?: "danger" | "success";
	forceSelected?: boolean;
	disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
	onClick,
	text,
	type,
	forceSelected,
	disabled,
}) => {
	let classes = [button.button];

	if (type === "danger") {
		classes.push(button.danger);
	}

	if (forceSelected) {
		classes.push(button.selected);
	}

	if (!forceSelected && disabled) {
		classes.push(button.disabled);
	}

	const className = classes.join(" ");

	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
};
