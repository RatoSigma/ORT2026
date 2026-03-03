class celular:
    def __init__(self, marca, modelo, bateria=100):
        self.marca = marca
        self.modelo = modelo
        self.bateria = bateria

    def usar(celular):
        print("Usando o celular...")
        celular.bateria-=10

class pessoa:
    def __init__(self, nome, dinheiro=0):
        self.nome = nome
        self.dinheiro = dinheiro
    def trabalhar(pessoa):
        pessoa.dinheiro+=50
        print("Trabalhei!")
    def gastar(pessoa):
        pessoa.dinheiro-=20
        print("Gastei!")