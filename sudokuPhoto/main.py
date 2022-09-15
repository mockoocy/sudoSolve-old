from fastapi import FastAPI, UploadFile, status, HTTPException
from starlette.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from read_sudoku import read_sudoku
app = FastAPI()
origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def hello(img):
    return await read_sudoku(img, "digit_recognition_model.h5")


@app.post("/api/postImage")
async def get_image(image: UploadFile) -> list[int]:
    contents = await image.read()
    try:
        img = cv2.imdecode(np.frombuffer(contents, dtype="uint8"), 0)
        img = img.reshape(*img.shape, 1)
    except AttributeError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid file type")
    digits = await read_sudoku(img, "digit_recognition_model.h5")
    print(digits)
    # I don't really know why do I have to do this comprehension, but ok.
    return digits


@app.get("/api")
def root():
    return {
        "Hello":"Bitches"
    }

