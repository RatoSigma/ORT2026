# === Mini Aula de Matrizes em Python ===

# 1. O que é uma matriz?
# Em Python, uma matriz geralmente é representada como uma lista de listas.
# Cada lista interna representa uma linha da matriz.

print("--- 1. Criando e Exibindo uma Matriz ---")
matriz = [
    [1, 2, 3],  # Linha 0
    [4, 5, 6],  # Linha 1
    [7, 8, 9]   # Linha 2
]

# Exibindo a matriz de forma formatada (linha por linha)
for linha in matriz:
    print(linha)

print("\n--- 2. Acessando Elementos ---")
# Para acessar, usamos matriz[linha][coluna] (lembrando que os índices começam em 0)
elemento = matriz[1][2] # Linha 1 (segunda linha), Coluna 2 (terceira coluna) -> 6
print(f"Elemento na linha 1, coluna 2: {elemento}")

print("\n--- 3. Modificando Elementos ---")
# Podemos alterar o valor de um elemento acessando sua posição
matriz[0][0] = 99
print("Matriz após alterar o elemento [0][0] para 99:")
for linha in matriz:
    print(linha)

print("\n--- 4. Percorrendo (Iterando) sobre uma Matriz ---")
# Usamos a função len() para descobrir o tamanho
num_linhas = len(matriz)
num_colunas = len(matriz[0]) # Tamanho da primeira linha

print(f"A matriz tem {num_linhas} linhas e {num_colunas} colunas.")

# Dois loops 'for' aninhados (um dentro do outro) são usados para percorrer a matriz
for i in range(num_linhas):
    for j in range(num_colunas):
        print(f"matriz[{i}][{j}] = {matriz[i][j]}")

print("\n--- 5. Criando uma Matriz Dinamicamente ---")
# Como criar uma matriz 3x4 preenchida com zeros usando List Comprehension
linhas_vazias = 3
colunas_vazias = 4
matriz_zeros = [[0 for _ in range(colunas_vazias)] for _ in range(linhas_vazias)]

print("Matriz 3x4 de zeros:")
for linha in matriz_zeros:
    print(linha)
