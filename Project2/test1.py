import numpy as np

inputs = [1.0,2.0,3.0,2.5]
weights = [0.2, 0.8, -0.5, 1.0]
bias = 2.0

output = np.dot(inputs, weights) # OUTPUT: 4.8 (bias included)
# = (1*0.2) + (2*0.8) + (3*-0.5) + (2.5*1) -> Vector Dot product != Cross product!

# BUT VERY SOON ORDER WILL MATTER SO YOU WANT TO CHANGE TO THIS: np.dot(weights, inputs)

output += bias

# DOING DOT PRODUCT WITH A LAYER OF NEURONS
# In this case, 3 neurons receiving output from 4 different other neurons
#   inputs = [1.0, 2.0, 3.0, 2.5]
weights =  [[0.2, 0.8, -0.5, 1.0],
            [0.5, -0.91, 0.26, -0.5],
            [-0.26, -0.27, 0.17, 0.87]]
# weights = matrix containing vectors.
bias = [2, 3, 0.5]

# Let`s illustrate WHY weights NEEDS TO BE FIRST IN np.dot() FUNC.

output = np.dot(weights, inputs) #OUTPUT: [4.8   1.21  2.385] (bias included) WITH "np.dot(weights, inputs)".
# (0.2*1) + (0.8*2) + (-0.5*3) + (1.0*2.5) = 2.8 and so on...

# OUTPUT ("np.dot(inputs, weights)") = ValueError: shapes (4,) and (3,4) not aligned: 4 (dim 0) != 3 (dim 0)

print(output+bias)
