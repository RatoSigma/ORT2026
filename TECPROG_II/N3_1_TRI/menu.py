from gerenciamento import ProdutoPerecivel, ProdutoNaoPerecivel
produtos = []
while True:
    print("1. Adicionar Produto")
    print("2. Listar Produtos")
    print("3. Atualizar Estoque")
    print("4. Sair")
    escolha = int(input())

    if escolha == 1:
        print("Adicionar Produto")
        print("1. Perecível")
        print("2. Não Perecível")
        escolha = int(input())
        if escolha == 1:
            print("Perecível")
            ID = int(input("ID: "))
            nome = input("Nome: ")
            preco = float(input("Preço: "))
            estoque = int(input("Estoque: "))
            data_validade = input("Data de Validade (DD/MM/AAAA): ")
            lote = input("Lote: ")
            produto = ProdutoPerecivel(ID, nome, preco, estoque, data_validade, lote)
            produtos.append(produto)
        elif escolha == 2:
            print("Não Perecível")
            ID = int(input("ID: "))
            nome = input("Nome: ")
            preco = float(input("Preço: "))
            estoque = int(input("Estoque: "))
            material = input("Material: ")
            peso = float(input("Peso: "))
            produto = ProdutoNaoPerecivel(ID, nome, preco, estoque, material, peso)
            produtos.append(produto)
        else:
            print("Opção Inválida")
    elif escolha == 2: 
        for i in produtos:
            print(str(i))
    elif escolha == 3:
        ID = input("ID: ")
        Q = int(input("Quantidade para ajustar: "))
        for i in range(len(produtos)):
            if produtos[i].id == ID:
                produtos[i].atualizar_estoque(Q)
                print("Estoque atualizado")
        else:
            print("ID não encontrado")
    elif escolha == 4:
        break