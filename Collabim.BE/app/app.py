from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from requests.exceptions import HTTPError
from googlesearch import search


app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/api/search")
def get_search(q: str = ""):
    try:
        return {"items": [{"url": i.url, "title": i.title, "description": i.description} for i in search(q)]}    
    except HTTPError as err:
        raise HTTPException(status_code=err.response.status_code) 
    except:
        raise HTTPException(status_code=500) 