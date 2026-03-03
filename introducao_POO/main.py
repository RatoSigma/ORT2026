from classes import celular
from classes import pessoa

c1=celular("Xiaomi", "J5")
c2=celular("Nokia", 18, 67)
pessoa=pessoa("Walter")

print(c1.marca)
print(c2.bateria)

celular.usar(c1)
celular.usar(c1)
print(c1.bateria)

pessoa.trabalhar()
pessoa.trabalhar()
pessoa.gastar()
print(pessoa.dinheiro)