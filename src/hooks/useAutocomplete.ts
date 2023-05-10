import { SetStateAction, useEffect, useState } from "react"

import { Commendation } from "../ts/interfaces/Commendation.interface"

const useAutocomplete = (data: Commendation[], inputSearchRef: HTMLInputElement | null, handleCommendationSelect: (commendation: Commendation) => void) => {
	const [searchedValue, setSearchedValue] = useState("")
	const [suggestions, setSuggestions] = useState<Commendation[]>([])
	const [selectedSuggestion, setSelectedSuggestion] = useState<Commendation | null>(null)
	const [activeSuggestion, setActiveSuggestion] = useState(0)

	useEffect(() => {
		if (inputSearchRef) {
			inputSearchRef.focus()
		}
	}, [])

	const handleChange = (event: { target: { value: SetStateAction<string> } }): void => {
		if (event.target.value !== "") {
			const filteredSuggestions = data.filter(itemData => {
				const value = event.target.value.toString().toUpperCase()
				const name = itemData.name.toUpperCase()

				return value && name.includes(value) && name !== value
			})
			setSearchedValue(event.target.value)
			setSuggestions(filteredSuggestions)
		} else {
			setSearchedValue("")
			setSuggestions([])
			setSelectedSuggestion(null)
			setActiveSuggestion(0)
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "ArrowDown" && activeSuggestion < suggestions.length) {
			setActiveSuggestion(activeSuggestion + 1)
		} else if (event.key === "ArrowUp" && activeSuggestion > 1) {
			setActiveSuggestion(activeSuggestion - 1)
		} else if (event.key === "Enter" && suggestions[activeSuggestion - 1]) {
			setSearchedValue(suggestions[activeSuggestion - 1].name)
			setSelectedSuggestion(suggestions[activeSuggestion - 1])
			setSuggestions([])
			setActiveSuggestion(0)
		}
	}

	const handleClick = (commendation: Commendation) => {
		setSearchedValue(commendation.name)
		setSuggestions([])
		setSelectedSuggestion(commendation)
		setActiveSuggestion(0)
		handleCommendationSelect(commendation)
	}

	return {
		searchedValue, suggestions, selectedSuggestion, activeSuggestion,
		handleChange, handleKeyDown, handleClick
	}
}

export default useAutocomplete
