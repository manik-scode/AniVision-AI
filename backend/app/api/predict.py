import time

from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image

from app.services.inference import predict

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


@router.post("")  # Yahan se slash hata diya hai taaki /predict par direct match ho
async def predict_image(file: UploadFile = File(...)):

    start = time.perf_counter()

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image."
        )

    image = Image.open(file.file)

    result = predict(image)

    end = time.perf_counter()

    return {
        "label": result["prediction"],
        "confidence": result["confidence"],
        "predictionTimeMs": round((end - start) * 1000, 2),
    }