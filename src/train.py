import torch
import torch.nn as nn
import torch.optim as optim
from dataset import train_loader
from model import get_model
from pathlib import Path
from utils import save_model

MODEL_DIR = Path("models")
MODEL_DIR.mkdir(exist_ok=True)

model = get_model()

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.fc.parameters() ,lr=0.001,)


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

num_epoch = 10
best_loss = float("inf")
train_losses = []
train_accuracies = []

for epoch in range(num_epoch):

    model.train()
    running_loss = 0.0
    correct = 0
    total = 0 
    for images,labels in train_loader:
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs,labels)

        loss.backward()

        optimizer.step()

        running_loss+=loss.item()*images.size(0)

        _,precdiction = torch.max(outputs,1)
        correct += (precdiction==labels).sum().item()
        total+= labels.size(0)

    epoch_loss = running_loss / len(train_loader.dataset)
    train_accuracy = correct / total

    train_losses.append(epoch_loss)
    train_accuracies.append(train_accuracy)
    print(
    f"Epoch {epoch + 1}/{num_epoch} | "
    f"Loss: {epoch_loss:.4f} | "
    f"Accuracy: {train_accuracy*100:.2f}%"
)
    if epoch_loss < best_loss:
        best_loss = epoch_loss
        save_model(model, MODEL_DIR / "best_model.pth")
        print("✅ Best Model Saved")
    


torch.save(
    {
        "train_losses": train_losses,
        "train_accuracies": train_accuracies,
    },
    MODEL_DIR / "history.pth",
)

print("✅ Training History Saved")