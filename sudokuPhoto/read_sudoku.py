from imutils.perspective import four_point_transform
from skimage.segmentation import clear_border
import numpy as np
from numpy.typing import NDArray
import imutils
import cv2
import tensorflow as tf
import asyncio


Matrix2D = NDArray[NDArray[np.uint8 | np.float32]]
Matrix3D = NDArray[NDArray[NDArray[np.uint8 | np.float32]]]
# Idc if it doesnt work this way, I want to somehow specify that these are nested, besides the name
SUDOKU_SIZE = 9
CELL_DIMENSIONS = (28, 28)


def find_puzzle(image: Matrix3D) -> tuple[Matrix3D, Matrix2D]:
	blue_kernel_size = (5,5)
	rectangle_shape = (4,2)
	epsilon_factor = 0.02
	if image.shape[2] != 1:
		gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	else:
		gray = image
	blurred = cv2.GaussianBlur(gray, blue_kernel_size, 3)

	thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 17, 7)

	contours = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	contours = imutils.grab_contours(contours)
	contours = sorted(contours, key=cv2.contourArea, reverse=True)
	# initialize a contour that corresponds to the puzzle outline
	sudoku_contour = None
	# loop over the contours
	for c in contours:
		# approximate the contour
		peri = cv2.arcLength(c, True)
		approx = cv2.approxPolyDP(c, epsilon_factor * peri, True)
		# if our approximated contour has four points, then we can
		# assume we have found the outline of the puzzle
		if len(approx) == 4:
			sudoku_contour = approx
			break
	if sudoku_contour is None:
		raise Exception("Sudoku Contour Not Found")

	puzzle = four_point_transform(image, sudoku_contour.reshape(*rectangle_shape))
	warped = four_point_transform(gray, sudoku_contour.reshape(*rectangle_shape))
	return puzzle, warped


def extract_digit(cell: Matrix2D) -> Matrix2D | None:
	min_percentage = 0.03
	# apply automatic thresholding to the cell and then clear any
	# connected borders that touch the border of the cell
	thresh = cv2.threshold(cell, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
	thresh = clear_border(thresh)
	contours = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	contours = imutils.grab_contours(contours)
	# if no contours were found than this is an empty cell
	if len(contours) == 0:
		return None
	# otherwise, find the largest contour in the cell and create a
	# mask for the contour
	largest_contour = max(contours, key=cv2.contourArea)
	mask = np.zeros(thresh.shape, dtype="uint8")
	cv2.drawContours(mask, [largest_contour], -1, 255, -1)

	# compute the percentage of masked pixels relative to the total
	# area of the image
	(height, width) = thresh.shape
	filled_percent = cv2.countNonZero(mask) / float(width * height)
	# if less than min_percentage of the mask is filled then we are looking at
	# noise and can safely ignore the contour
	if filled_percent < min_percentage:
		return None
	# apply the mask to the thresholded cell
	digit = cv2.bitwise_and(thresh, thresh, mask=mask)
	# check to see if we should visualize the masking step
	# return the digit to the calling function
	return digit


def get_cells(warped_image: Matrix2D) -> Matrix3D:
	step_y = warped_image.shape[0] // SUDOKU_SIZE
	step_x = warped_image.shape[1] // SUDOKU_SIZE

	cell_array = []

	for y in range(0, SUDOKU_SIZE):
		for x in range(0, SUDOKU_SIZE):
			start_x = x * step_x
			start_y = y * step_y
			end_x = (x+1) * step_x
			end_y = (y+1) * step_y

			cell = warped_image[start_y: end_y, start_x: end_x]
			cell_array.append(cell)
	return np.array(cell_array)


def get_digits_from_cells(cells_array: Matrix3D, model: tf.keras.models.Sequential) -> list[int]:
	res = []
	for cell in cells_array:
		digit = extract_digit(cell)
		if digit is not None:
			roi = cv2.resize(digit, CELL_DIMENSIONS)
			roi = roi.astype("float32")
			roi = roi.reshape(1, *CELL_DIMENSIONS, 1)
			prediction = model.predict(roi).argmax(axis=1)[0]
			res.append(int(prediction))
			# I want them to be of type int instead of np.int64
		else:
			res.append(0)
	return res


async def read_sudoku(image: Matrix3D, model_path: str) -> list[int]:
	model = tf.keras.models.load_model(model_path)
	_, warped = find_puzzle(image)
	grid_cells = get_cells(warped)
	return get_digits_from_cells(grid_cells, model)


if __name__ == "__main__":
	img = cv2.imread(r"C:\Users\pawli\PycharmProjects\sudokuPhoto\venv\photos\sudoku.png")

	print(asyncio.run(read_sudoku(img, 'digit_recognition_model.h5')))