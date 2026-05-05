class disciplina:
    def __init__(self, nome, carga_horaria):
        self.nome = nome
        self.carga_horaria = carga_horaria
    def __str__(self):
        return self.nome
    
class pessoa:
    def __init__(self, nome, email):
        self.__nome = nome
        self.__email = email
    @property
    def nome(self):
        return self.__nome
    @property
    def email(self):
        return self.__email

class aluno(pessoa):
    def __init__(self, nome, email, disciplina):
        super().__init__(nome, email)
        self.__notas = []
        self.__disciplina = disciplina
    def adicionar_nota(self, nota):
        if nota < 0 or nota > 10:
            print("Erro")
        else:
            self.__notas.append(nota)
    def __str__(self):
        return f"{self.nome} - {self.email} - {self.__disciplina}"
    def __len__(self):
        return len(self.__notas)

class professor(pessoa):
    def __init__(self, nome, email, disciplina):
        super().__init__(nome, email)
        self.__disciplina = disciplina

    def trabalhar(self):
        print(f"O professor {self.nome} ensina {self.__disciplina}")

