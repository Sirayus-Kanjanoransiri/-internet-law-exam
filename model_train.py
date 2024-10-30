import tensorflow as tf
import matplotlib.pyplot as plt
import re

# กำหนด path
data_train_directory = r"C:\Users\My Nb\Desktop\Codes\PYTHON\image\Fruit-Images\Training"
data_test_directory = r"C:\Users\My Nb\Desktop\Codes\PYTHON\image\Fruit-Images\Test"

train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    data_train_directory,
    labels="inferred",
    image_size=(224, 224),             
    batch_size=32,                   
    shuffle=True,                          
    seed=42
)
test_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    data_test_directory,
    image_size=(224, 224)
)

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation="relu",
                           input_shape=(224, 224, 3)),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation="relu"),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(len(train_dataset.class_names),
                          activation="softmax")
])

model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])

model.fit(train_dataset, epochs=1, verbose=0)

_, test_acc = model.evaluate(test_dataset, verbose=0)
print("ความแม่นยำ:", round(test_acc * 100, 2), "%")

model.save("fruit_detection.h5")

