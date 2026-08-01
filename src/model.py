import torch.nn as nn
import torchvision.models as models

def get_model():
    

    model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

    num_ftrs = model.fc.in_features
    num_classes = 2

    model.fc = nn.Linear(num_ftrs,num_classes)



    for param in model.parameters():
        param.requires_grad = False


    for param in model.fc.parameters():
        param.requires_grad = True

    return model