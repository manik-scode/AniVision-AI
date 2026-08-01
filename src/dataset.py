from torchvision import datasets
from torchvision import transforms
from torch.utils.data import DataLoader

train_transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    ),

])

test_transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    ),

])

train_dataset = datasets.ImageFolder(
    "./data/train",
    transform=train_transform
)

validation_dataset = datasets.ImageFolder(
    "./data/validation",
    transform=test_transform
)

test_dataset = datasets.ImageFolder(
    "./data/test",
    transform=test_transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True
)

validation_loader = DataLoader(
    validation_dataset,
    batch_size=32,
    shuffle=False
)

test_loader = DataLoader(
    test_dataset,
    batch_size=32,
    shuffle=False
)

print(train_dataset.class_to_idx)

print(len(train_dataset))

print(len(validation_dataset))

print(len(test_dataset))

print(train_dataset.class_to_idx)