import torch 
from torchvision.transforms import transforms
from PIL import Image
from model import get_model
from pathlib import Path
from utils import load_model


transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406],
        std= [0.229,0.224,0.225]
    ),
])



device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = get_model()

model = load_model(model,"models/best_model.pth",device)
model.to(device)

model.eval()

IMG_PATH  = Path("data/test/Cat/6.jpg")
image = Image.open(IMG_PATH).convert("RGB")


input_tensor = transform(image).unsqueeze(0).to(device)

with torch.no_grad():
    output = model(input_tensor)

    probabilities =  torch.nn.functional.softmax(output,dim=1)
    confidence, predicted_idx = torch.max(probabilities,1)


class_names = ["Cat","Dog"]
predicted_class = class_names[predicted_idx.item()]
confidence_score = confidence.item()*100

print(f"Prediction: {predicted_class}")
print(f"Confidence: {confidence_score:.2f}%")
