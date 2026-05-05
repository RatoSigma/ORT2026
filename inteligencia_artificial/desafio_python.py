"""
PARTE 1: O Pesquisador (Teoria - 0,3 Pontos)
Pesquisem na internet e respondam às perguntas abaixo com as palavras da dupla.
1. O que é Inteligência Artificial (de forma resumida)? 
R: É a capacidade de um sistema ou um computador executar tarefas que normalmente exigiriam inteligência humana. 
2. Qual é a diferença entre "Machine Learning" (Aprendizado de Máquina) e a "IA Simbólica" (como Árvores de Decisão e Máquinas de Estado usadas em videogames)? 
R: O Aprendizado de Máquina é uma abordagem que permite aos sistemas aprenderem com dados, enquanto a IA Simbólica é mais como um conjunto de regras predefinidas.
3. Dê um exemplo de um jogo famoso que possui uma IA muito inteligente e explique o que os inimigos ou NPCs fazem que os torna tão espertos. 
R: Bons exemplos são os jogos da franquia Pokémon, onde os inimigos são controlados por IAs de diferentes níveis que tem o dever de se adaptar à situação da 
batalha em tempo real com os movesets predefinidos de seus pokemons. 
"""

"""
PARTE 2: O Lógico (Prática com Lambda - 0,3 Pontos)
O primeiro passo de uma IA é perceber o ambiente. Imagine que o nosso NPC escaneou a área e encontrou uma lista de inimigos, mas ele só quer focar nos inimigos fracos.
Abram o seu editor de código Python (VS Code ou pycharm) e resolvam o problema abaixo:
O Problema: Vocês têm uma lista de inimigos. Cada inimigo é uma tupla com o Nome e a Vida (HP).
"""

inimigos = [
    ("Goblin", 30),
    ("Orc", 85),
    ("Slime", 15),
    ("Dragão", 500),
    ("Lobo", 40)
]

"""
A Missão: Use a função filter() combinada com uma função lambda para criar uma nova lista chamada inimigos_fracos. 
Essa lista deve conter apenas os inimigos que têm menos de 50 de HP.
"""

# Resposta:
fracos = list(filter(lambda x: x[1] < 50, inimigos))
print(fracos)

"""
PARTE 3: O Estrategista (Prática com Recursividade - 0,4 Pontos)
Agora que o NPC viu os inimigos, ele precisa tomar uma decisão. Uma das formas mais antigas e eficientes de IA é a Árvore de Decisão (uma estrutura que faz perguntas de Sim/Não até chegar numa ação).
O Problema: Temos o "Cérebro" do NPC guardado em um Dicionário (Dictionary) aninhado no Python.
"""

cerebro_npc = {
    "pergunta": "O inimigo está perto?",
    "sim": {
        "pergunta": "Minha vida está menor que 50?",
        "sim": "Ação: Usar poção de cura e fugir!",
        "nao": "Ação: Atacar com a espada!"
    },
    "nao": {
        "pergunta": "Eu tenho flechas?",
        "sim": "Ação: Atirar com o arco!",
        "nao": "Ação: Se esconder na moita!"
    }
}

"""
A Missão: Crie uma função recursiva chamada pensar(no).
A função deve receber um "nó" (um pedaço do dicionário).
Se o nó for apenas um texto (string), significa que é uma Ação! A função deve imprimir (print) a ação e parar.
Se o nó for um dicionário, a função deve imprimir a "pergunta" e usar a função input() para pedir ao jogador para digitar "sim" ou "nao".
Baseado na resposta do usuário, a função deve chamar a si mesma (recursividade), passando a próxima parte do cérebro (no["sim"] ou no["nao"]).
"""

def pensar(no):
    if type(no) == str:
        print(no)   
    else:
        pergunta = no["pergunta"]
        resposta = input(pergunta + " (sim ou não:) ")
        if resposta == "sim":
            pensar(no["sim"])
        else:
            pensar(no["nao"])

str_teste = "legal"

pensar(str_teste)
pensar(cerebro_npc)
