from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.predict import router

app = FastAPI(
    title="AniVision AI API",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "https://ani-vision-ai.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "AniVision AI API"
    }