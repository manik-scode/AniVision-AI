import torch
from pathlib import Path
from PIL import Image

from app.model import get_model
from app.utils.preprocess import preprocess_image

# ----------------------------
# Device
# ----------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ----------------------------
# Model Path
# ----------------------------
MODEL_PATH = Path(__file__).resolve().parents[2] / "models" / "best_model.pth"

# ----------------------------
# Load Model Once
# ----------------------------
model = get_model()

model.load_state_dict(
    torch.load(MODEL_PATH, map_location=device)
)

model.to(device)
model.eval()

print("✅ Model Loaded Successfully")

# ----------------------------
# Class Names
# ----------------------------
CLASS_NAMES = {
    0: "Cat",
    1: "Dog"
}


# ----------------------------
# Prediction Function
# ----------------------------
def predict(image: Image.Image):

    image_tensor = preprocess_image(image)
    image_tensor = image_tensor.to(device)

    with torch.no_grad():

        outputs = model(image_tensor)

        probabilities = torch.softmax(outputs, dim=1)

        confidence, predicted = torch.max(probabilities, dim=1)

    class_id = predicted.item()

    return {
        "prediction": CLASS_NAMES[class_id],
        "class_id": class_id,
        "confidence": round(confidence.item() * 100, 2)
    }