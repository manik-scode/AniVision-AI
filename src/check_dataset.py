from pathlib import Path

dataset_path = Path("../data/PetImages")

cat_count = len(list((dataset_path / "Cat").glob("*.jpg")))
dog_count = len(list((dataset_path / "Dog").glob("*.jpg")))

print(f"Cat Images : {cat_count}")
print(f"Dog Images : {dog_count}")
print(f"Total Images : {cat_count + dog_count}")