from googlesearch import search

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from requests.exceptions import HTTPError
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
        return {"items": [i for i in search(q, sleep_interval=5)]}    
    except HTTPError as err:
        raise HTTPException(status_code=err.response.status_code) 
    except:
        raise HTTPException(status_code=500) 
@app.get("/api/test")
def get_test():
    return {"msg": "test"}