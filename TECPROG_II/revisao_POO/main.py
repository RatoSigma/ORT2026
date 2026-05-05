from classes import disciplina
from classes import aluno
from classes import professor

# 1. Criando a estrutura base
matematica = disciplina("Matemática", 80)
# 2. Criando o aluno e o professor, e compondo com a disciplina
aluno1 = aluno("Ricardo", "ricardo@gmail.com", matematica)
prof1 = professor("Salustiano", "salustiano@gmail.com", matematica)
# 3. Testando encapsulamento e lógica
aluno1.adicionar_nota(8.5)
aluno1.adicionar_nota(12) # Deve barrar!
# 4. Testando métodos mágicos
print(aluno1)
print(f"Notas registradas: {len(aluno1)}")
prof1.trabalhar()