import torch
import torch.nn as nn
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)

from dataset import test_loader
from model import get_model
from utils import load_model

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = get_model()
model = load_model(model, "models/best_model.pth", device)

criterion = nn.CrossEntropyLoss()

running_loss = 0.0
correct = 0
total = 0
all_labels = []
all_predictions = []
with torch.no_grad():

    for images, labels in test_loader:

        images = images.to(device)
        labels = labels.to(device)

        outputs = model(images)

        loss = criterion(outputs, labels)

        running_loss += loss.item() * images.size(0)

        _, predicted = torch.max(outputs, 1)
        all_labels.extend(labels.cpu().numpy())
        all_predictions.extend(predicted.cpu().numpy())

        correct += (predicted == labels).sum().item()

        total += labels.size(0)

test_loss = running_loss / total


print(f"Test Loss: {test_loss:.4f}")
print(f"Accuracy : {accuracy_score(all_labels, all_predictions):.4f}")
print(f"Precision: {precision_score(all_labels, all_predictions):.4f}")
print(f"Recall   : {recall_score(all_labels, all_predictions):.4f}")
print(f"F1 Score : {f1_score(all_labels, all_predictions):.4f}")

print("\nConfusion Matrix")
print(confusion_matrix(all_labels, all_predictions))

print("\nClassification Report")
print(classification_report(all_labels, all_predictions, target_names=["Cat", "Dog"]))