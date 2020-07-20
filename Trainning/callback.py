# Callback
'''
In computer programming, a callback, also known as a "call-after" function,
is any executable code that is passed as an argument to other code; that other code is expected to call back (execute) the argument at a given time.
'''
def PrintName(name):
    print("Your name is {}".format(name))

def GetName(func):
    name = input("Type your name:")
    PrintName(name)

GetName(PrintName)
