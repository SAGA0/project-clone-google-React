import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Loading } from './Loading'
import { useResultContext } from '../contexts/ResultContextProvider'

export const Results = () => {
    const { results, isLoading, getResults, searchTerm } = useResultContext()
    const location = useLocation()

    useEffect(() => {
        getResults(`${location.pathname}?query=${searchTerm}&gl=us&lr=en&num=20&start=0&sort=relevance`)
    }, [searchTerm, location.pathname])

    if (isLoading) return <Loading />

    switch (location.pathname) {
        case '/search':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
                    {results?.items?.map(({ link, title, snippet }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
                                <p className="text-sm">{snippet.length > 70 ? snippet.substring(0, 70) : snippet}</p>
                            </a>
                        </div>
                    ))}
                </div>
            );
        case '/imagesearch':
            return (
                <div className='flex flex-wrap justify-center items-center'>
                    {results?.items?.map(({ thumbnailImageUrl, originalImageUrl, title }, index) => (
                        <a href={thumbnailImageUrl} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
                            <img src={originalImageUrl} alt={title} loading="lazy" />
                            <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
                        </a>
                    ))}
                </div>
            )
        default:
            break;
    }
}
