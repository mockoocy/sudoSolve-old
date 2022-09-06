import numpy as np
from numpy.typing import NDArray
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import pandas as pd
from collections import Counter
import tensorflow as tf

from read_sudoku import Matrix2D, Matrix3D, CELL_DIMENSIONS

TEST_SIZE = .2
VALIDATION_SIZE = .2
# Our train / test / validation split is (64/20/16)%
DATASET_PATH = './TMNIST_Data.csv'


def prepare_data() -> tuple[Matrix2D, NDArray]:
    with open(DATASET_PATH) as temp_dataset:
        df = pd.read_csv(temp_dataset)
        a = df.where(~df['names'].str.contains('Italic'))
        # Italic fonts will probably skew the data a bit
        a = a[a['names'].notnull()]
        dataset = a.to_numpy()
        images_array = np.array([i[2:].reshape(*CELL_DIMENSIONS) for i in dataset], dtype="float64")
        # Dataset contains 786 columns of data. 0:font name | 1:displayed number | 2->end: pixel data of 28x28 image
        labels_array = np.array([i[1] for i in dataset], dtype="uint8")
    return images_array, labels_array


def display_data_distribution(data: NDArray[int], figsize: tuple[int, int]):
    print(data)
    occurrences_count = Counter(data)
    occurrences_sorted = sorted(occurrences_count.items())
    x_axis_values = len(occurrences_sorted)
    y_axis_values = [occurrences for _, occurrences in occurrences_sorted]
    plt.figure(figsize=figsize)
    plt.bar(range(x_axis_values), y_axis_values)
    plt.title("No of images for each label")
    plt.xlabel("Label")
    plt.ylabel("No. of images")
    plt.show()


def deepen(array: Matrix2D) -> Matrix3D:
    return array.reshape(*array.shape, 1)


def create_model() -> tf.keras.models.Sequential:
    return tf.keras.models.Sequential([
        # Image augmentation to produce slight differences in our data and prevent overwriting
        tf.keras.layers.Rescaling(scale=1./255, input_shape=(*CELL_DIMENSIONS, 1)),
        tf.keras.layers.RandomZoom(0.1),
        tf.keras.layers.RandomRotation(0.04),
        tf.keras.layers.RandomTranslation(width_factor=0.15, height_factor=0.10),

        tf.keras.layers.Conv2D(128, (3, 3), 1, activation=tf.nn.relu),
        tf.keras.layers.MaxPooling2D(),

        tf.keras.layers.Conv2D(256, (3, 3), 1, activation=tf.nn.relu),
        tf.keras.layers.MaxPooling2D(),

        tf.keras.layers.Conv2D(128, (3, 3), 1, activation=tf.nn.relu),
        tf.keras.layers.MaxPooling2D(),

        tf.keras.layers.Flatten(),

        tf.keras.layers.Dense(256, activation="relu"),
        tf.keras.layers.Dense(10, activation="softmax")

    ])


if __name__ == "__main__":
    images, labels = prepare_data()
    X_train, X_test, y_train, y_test = train_test_split(images, labels, test_size=TEST_SIZE)
    X_train, X_validation, y_train, y_validation = train_test_split(X_train, y_train, test_size=VALIDATION_SIZE)
    X_train = deepen(X_train)
    X_test = deepen(X_test)
    X_validation = deepen(X_validation)
    model = create_model()
    model.compile(
        optimizer="adam",
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )
    model.fit(X_train, y_train, epochs=50, validation_data=(X_validation, y_validation))
    model.save("digit_recognition_model.h5")

    model.evaluate(X_test, y_test)
    y_predicted = model.predict(X_test)
    y_predicted_labels = [np.argmax(i) for i in y_predicted]
    confusion_matrix = tf.math.confusion_matrix(labels=y_test, predictions=y_predicted_labels)
    print(confusion_matrix)
