from datetime import datetime

class Produto:
    def __init__(self, id, nome, preco, estoque):
        if id is None:
            raise ValueError("Sem ID")
        if preco < 0:
            raise ValueError("Preço < 0")
        if estoque < 0:
            raise ValueError("Estoque < 0")
        self.__id = id
        self.__nome = nome
        self.__preco = float(preco)
        self.__estoque = int(estoque)

    @property
    def get_id(self): return self.__id
    @property
    def get_nome(self): return self.__nome
    @property
    def get_preco(self): return self.__preco
    @property
    def get_estoque(self): return self.__estoque

    def atualizar_estoque(self, quantidade):
        novo_estoque = self.__estoque + quantidade
        if novo_estoque < 0:
            raise ValueError("Estoque < 0")
        self.__estoque = novo_estoque

    def __str__(self):
        return f"ID: {self.__id}, Nome: {self.__nome}, Preço: R${self.__preco:.2f}, Estoque: {self.__estoque}"

class ProdutoPerecivel(Produto):
    def __init__(self, id, nome, preco, estoque, data_validade, lote):
        super().__init__(id, nome, preco, estoque)
        self.__data_validade = datetime.strptime(data_validade, '%d/%m/%Y').date()
        self.__lote = lote
    def __str__(self):
        return f"Data de Validade: {self.__data_validade}, Lote: {self.__lote}"


class ProdutoNaoPerecivel(Produto):
    def __init__(self, id, nome, preco, estoque, material, peso):
        super().__init__(id, nome, preco, estoque)
        self.__material = material
        self.__peso = float(peso)
    def __str__(self):
        return f"Material: {self.__material}, Peso: {self.__peso}"
