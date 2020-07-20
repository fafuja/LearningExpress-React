def factorial(num):
  if(num == 1):
      return 1
  print('Factoring {}'.format(num))
  return num * factorial(num - 1)

factorial(10)
factorial(12)
