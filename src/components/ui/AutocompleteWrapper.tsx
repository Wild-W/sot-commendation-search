import { useEffect, useState } from "react"
import axios from "axios"

import { romanize } from 'romans'

import { Col, Container, Row, Text } from "@nextui-org/react"
import { Autocomplete } from "."

import { Commendation } from "../../ts/interfaces/Commendation.interface"

import classes from "./ui.module.css"

const AutocompleteWrapper = () => {
	const [data, setData] = useState<Commendation[]>([])
	const [selectedCommendation, setSelectedCommendation] = useState<Commendation | null>(null)

	useEffect(() => {
		let xhr = new XMLHttpRequest();

		xhr.open("GET", "data.json", true);
		xhr.responseType = "json";

		xhr.onload = function() {
			if (xhr.status === 200) {
				let jsonData = xhr.response;
				setData(jsonData);
			} else {
				console.error("Failed to load data");
			}
		};

		xhr.send();
	}, [])

	const handleCommendationSelect = (commendation: Commendation) => {
		setSelectedCommendation(commendation)
	}

	return (
		<div className={classes.scrollableContainer}>
			<Container>
				<Row>
					<Col>
						<Text
							h1
							css={{
								textAlign: "center",
								textGradient: "45deg, $blue600 -20%, $pink600 50%",
							}}
						>
							SOT Commendation Search:
						</Text>
					</Col>
				</Row>
				<Row>
					<Col className={classes.autocompleteContainer}>
						<Autocomplete data={data} handleCommendationSelect={handleCommendationSelect} />
					</Col>
				</Row>
				{selectedCommendation && selectedCommendation.timeLimited && (
					<Row>
						<Col className="infoboxtable">
							<Text size="$xl" style={{ fontWeight: 'lighter' }}>🕑 Time-Limited</Text>
						</Col>
					</Row>
				)}
				{selectedCommendation && (
					<Row>
						<Col span={4}>
							<img src={selectedCommendation.imageUrl} alt={selectedCommendation.name} />
							<Text size='$md'>{selectedCommendation.description}</Text>
							{selectedCommendation.gradeRequirements.length !== 0 && (
								<Text h4><br />Grade Requirements:</Text>
							)}
							<ul>
								{selectedCommendation.gradeRequirements.map((requirement, index) => (
									<li key={index}>{romanize(index+1)}: {requirement}</li>
								))}
							</ul>
						</Col>
						<Col span={8}>
							{selectedCommendation && selectedCommendation.rewards.html !== "" && (
								<Row>
									<Col>
										<Text dangerouslySetInnerHTML={{
											__html: selectedCommendation.rewards.html
										}} size='$md' style={{ textAlign: "center" }} />
									</Col>
								</Row>
							)}
							<Row>
								<Col>
									<ul>
										{selectedCommendation.rewards.items.filter((_, index) => index % 2 === 0).map((item, index) => (
											<li key={index}><img src={item.imageUrl} alt={item.name} style={{
												display: "block",
												margin: "auto"
											}}></img><br /><Text size='$md' style={{ textAlign: "center" }}>{item.name}</Text></li>
										))}
									</ul>
								</Col>
								<Col>
									<ul>
										{selectedCommendation.rewards.items.filter((_, index) => index % 2 === 1).map((item, index) => (
											<li key={index}><img src={item.imageUrl} alt={item.name} style={{
												display: "block",
												margin: "auto"
											}}></img><br /><Text size='$md' style={{ textAlign: "center" }}>{item.name}</Text></li>
										))}
									</ul>
								</Col>
							</Row>
						</Col>
					</Row>
				)}
			</Container>
		</div>
	)
}

export default AutocompleteWrapper
