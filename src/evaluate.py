import torch 
import torch.nn as nn
from dataset import validation_loader
from model import get_model

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = get_model()

model.load_state_dict(torch.load("models/best_model.pth"))
model.to(device)
model.eval()
criterion = nn.CrossEntropyLoss()

running_loss = 0.0
total= 0
correct = 0

with torch.no_grad():
    for images,labels in validation_loader:

        images = images.to(device)
        labels = labels.to(device)

        outputs = model(images)

        loss = criterion(outputs,labels)
        running_loss += loss.item() * images.size(0)

        _,prediction = torch.max(outputs,1)
        total+= labels.size(0)
        correct += (prediction==labels).sum().item()


val_loss = running_loss/total
val_accuracy = correct/total

print(f"Validation Loss: {val_loss:.4f}")
print(f"Validation Accuracy: {val_accuracy*100:.2f}%")