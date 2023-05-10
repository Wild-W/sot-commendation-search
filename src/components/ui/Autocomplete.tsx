import { useEffect, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import { Card, Col, Input, Row, Text, User } from "@nextui-org/react";

import { Commendation } from "../../ts/interfaces/Commendation.interface";

import useAutocomplete from "../../hooks/useAutocomplete";

import classes from "./ui.module.css";

interface Props {
	data: Commendation[];
	handleCommendationSelect: (commendation: Commendation) => void;
}

const Autocomplete = ({ data, handleCommendationSelect }: Props) => {
	const inputSearchRef = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (inputSearchRef.current) {
			inputSearchRef.current.focus();
		}
	}, []);

	const {
		searchedValue,
		suggestions,
		selectedSuggestion,
		activeSuggestion,
		handleChange,
		handleKeyDown,
		handleClick,
	} = useAutocomplete(data, inputSearchRef.current, handleCommendationSelect);

	// Function to calculate row height based on content
	const getItemSize = (index: number) => {
		const commendation = suggestions[index];
		const baseHeight = 50;
		const textHeight = (Math.ceil(commendation.description.length / 50) * 24)
			+ (commendation.rewards.items.length > 0 || commendation.rewards.doubloons > 0 ? 24 : 0);

		return (textHeight > baseHeight ? textHeight : baseHeight);
	};

	return (
		<div className={classes.autocomplete}>
			<Input
				bordered
				labelPlaceholder='Search Commendations'
				size='xl'
				value={searchedValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				ref={inputSearchRef}
				color='secondary'
				onBlur={() => {
					setTimeout(() => setIsFocused(false), 100);
				}}
				onFocus={() => setIsFocused(true)}
			/>

			{isFocused && searchedValue.length ? (
				<Card css={{ marginTop: "0.5rem" }}>
					<Card.Body css={{ padding: "0" }}>
						{!suggestions.length && !selectedSuggestion?.name.length ? (
							<Row className={classes.itemListNot}>
								<Col>
									<Text>Nothing found</Text>
								</Col>
							</Row>
						) : (
							<List
								height={200}
								itemCount={suggestions.length}
								itemSize={getItemSize}
								width="100%"
							>
								{({ index, style }) => {
									const commendation = suggestions[index];
									return (
										<Row
											key={index}
											className={`${classes.itemList} ${index === activeSuggestion - 1 ? classes.activeItem : ""}`}
											onClick={() => handleClick(commendation)}
											style={style}
										>
											<Col>
												<User src={commendation.imageUrl} name={commendation.name} squared />
											</Col>
											<Col span={8}>
												<Text size='$sm'>{commendation.description}</Text>
												<Text size='$xs'>{
													(commendation.rewards.doubloons === 0 ? ""
													: `+${commendation.rewards.doubloons} doubloons`)
													+ (commendation.rewards.items.length === 0 ? ""
													: ` • ${commendation.rewards.items.length} item${commendation.rewards.items.length === 1 ? ""
													: "s"
													}`)
												}</Text>
											</Col>
										</Row>
									);
								}}
							</List>
						)}
					</Card.Body>
				</Card>
			) : (
				// Empty card so "0" doesn't get printed below search bar
				<Card css={{ marginTop: "0.5rem" }}>
					<Card.Body css={{ padding: "0" }} />
				</Card>
			)}

			<Text size="$xs">Commendation: {selectedSuggestion?.name}</Text>
		</div>
	);
};

export default Autocomplete;
