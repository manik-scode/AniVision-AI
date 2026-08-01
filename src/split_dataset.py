from pathlib import Path
import shutil
import random

random.seed(42)

SOURCE_DIR = Path("../data/PetImages")

DEST_DIR = Path("../data")

TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15

for split in ["train", "validation", "test"]:
    for cls in ["Cat", "Dog"]:
        (DEST_DIR / split / cls).mkdir(parents=True, exist_ok=True)

for cls in ["Cat", "Dog"]:

    images = list((SOURCE_DIR / cls).glob("*.jpg"))
    random.shuffle(images)

    total = len(images)

    train_end = int(total * TRAIN_RATIO)
    val_end = train_end + int(total * VAL_RATIO)

    train_images = images[:train_end]
    val_images = images[train_end:val_end]
    test_images = images[val_end:]

    for img in train_images:
        shutil.copy(img, DEST_DIR / "train" / cls / img.name)

    for img in val_images:
        shutil.copy(img, DEST_DIR / "validation" / cls / img.name)

    for img in test_images:
        shutil.copy(img, DEST_DIR / "test" / cls / img.name)

print("Dataset Split Completed Successfully!")