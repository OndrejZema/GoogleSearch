import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { ResultPanel } from './components/ResultPanel'

export interface IItem{
    url: string 
    title: string 
    description: string
}


export interface IResult {
    items: Array<{url: string, title: string, description: string}>
}


export const Home = () => {

    const [query, setQuery] = React.useState<string>("")
    const [resultQuery, setResultQuery] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const [result, setResult] = React.useState<IResult>()
    const [errorText, setErrorText] = React.useState<string>("")

    React.useEffect(()=>{
        setQuery("")
    }, [resultQuery])

    const handleSearch = async () => {
        try {
            setResultQuery(query)
            setResult(undefined)
            setLoading(true)
            setErrorText("")
            let response = await fetch(`${process.env.REACT_APP_API}?q=${query}`)

            if (!response.ok) {
                throw new Error(`Návratový kód ${response.status}`)
            }
            let result = await response.json()
            setResult(result)
            setLoading(false)
        }
        catch (err: any) {
            console.log(err)
            
            setLoading(false)
            setErrorText(err.toString())
            setQuery(resultQuery)
        }
    }

    return (
        <div>
            <header className='d-flex justify-content-center m-3'>
                <h1>Vzorová práce do Collabimu</h1>
            </header>
            <main>
                <Container >
                    <Row>
                        <Col xs>
                            <Form.Label>Text k vyhledání</Form.Label>
                            <div className='d-flex'>
                                <Form.Control type='text'
                                    className='me-2' value={query}
                                    onChange={(e) => { setQuery(e.target.value) }} 
                                    onKeyDown={(e) => {if(e.key === 'Enter'){handleSearch()}}}
                                    />
                                <Button className='d-flex align-items-center'
                                    onClick={handleSearch}
                                >
                                    <FontAwesomeIcon icon={faSearch} className="me-1" />
                                    Vyhledat
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    {errorText !== "" ? <Row><Col><p className='text-danger mt-2'> {errorText}</p></Col></Row>:<></>}
                    <Row className='mt-3 d-flex justify-content-center'>
                        {loading ? <Spinner /> : <ResultPanel query={resultQuery} items={result?.items}/>}
                    </Row>
                </Container>
            </main>
        </div>
    )
}