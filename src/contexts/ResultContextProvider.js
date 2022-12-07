import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('Elon Musk')

    const getResults = async (url) => {
        setIsLoading(true)

        const response = await fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '33031b42b4msh6e3da2a6cf504c5p105382jsnbdf7a4012e7e',
                'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
            }
        })

        const data = await response.json();

        setResults(data);
        setIsLoading(false);
    }


    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext)