'''
# First Class Functions
-> In computer science, a programming language is said to have first-class functions if it treats functions as first-class citizens.

# First Class Citizens
-> In programming language design,
a first-class citizen (also type, object, entity, or value) in a given programming language is an entity which supports all the operations available to other entities.
These operations typically include being passed as an argument, returned from a function, modified, and assigned to a variable.
'''

# What we are used to do with functions:
def square(x):
    return x*x

f = square(5)
print(square) # Output: <function square at 0x000001A73F4371F0>
print(f) # Output: 25

# What we can do now:
f = square # We're assigning the algorithm of the function "square" to the "f" variable BUT WITHOUT EXECUTING IT.
# Parathesis "()" means that we're executing the function!
