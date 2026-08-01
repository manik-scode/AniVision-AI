from PIL import Image
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])


def preprocess_image(image: Image.Image):
    """
    Convert uploaded PIL image into a tensor
    ready for ResNet18 inference.
    """

    image = image.convert("RGB")

    tensor = transform(image)

    tensor = tensor.unsqueeze(0)

    return tensor