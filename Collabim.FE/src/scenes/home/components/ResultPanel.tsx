import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import { IItem } from '../Home'

interface IProps {
    query: string
    items?: Array<IItem>
}

export const ResultPanel = (props: IProps) => {

    const handleDownloadBtnClick = () =>{
        const downloadLink = document.createElement("a")
        downloadLink.href = URL.createObjectURL(new Blob([JSON.stringify(props.items)],{type: 'application/json'}))
        downloadLink.download = 'result.json'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

    }

    return (
        <>
            {props.items !== undefined ? (
                <div className='p-3'>
                    <h4>Výsledky pro vyhledávání: <i>{props.query}</i></h4>
                    {props.items!.map((item, index) => {
                        return <a href={item.url}
                            target='_blank'
                            key={`${index}-${item.url}`}
                            className='border p-2 mb-1 rounded d-block'>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                        </a>
                    })}
                    <Button onClick={handleDownloadBtnClick}><FontAwesomeIcon icon={faDownload} className="me-1" /> Stáhnout výsledky</Button>
                </div>)
                : <></>}
        </>
    )
}