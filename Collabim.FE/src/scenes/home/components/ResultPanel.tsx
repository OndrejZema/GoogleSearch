import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'

interface IProps {
    query: string
    items?: Array<string>
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
                        return <a href={item}
                            target='_blank'
                            key={`${index}-${item}`}
                            className='border p-2 mb-1 rounded d-block'>
                            {item}
                        </a>
                    })}
                    <Button onClick={handleDownloadBtnClick}><FontAwesomeIcon icon={faDownload} className="me-1" /> Stáhnout výsledky</Button>
                </div>)
                : <></>}
        </>
    )
}