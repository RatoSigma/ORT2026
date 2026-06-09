#include <bits/stdc++.h>
using namespace std;

int altura, largura;
int grade[205][205];
bool visitado[205][205];

int deslocamento_x[] = {-1, 1, 0, 0};
int deslocamento_y[] = {0, 0, -1, 1};

int bfs(int inicio_i, int inicio_j) {
    queue<pair<int, int>> fila;
    fila.push({inicio_i, inicio_j});
    visitado[inicio_i][inicio_j] = true;
    int cor = grade[inicio_i][inicio_j];
    int tamanho = 0;

    while (!fila.empty()) {
        pair<int, int> p = fila.front();
        fila.pop();
        int linha = p.first;
        int coluna = p.second;
        tamanho++;

        for (int i = 0; i < 4; i++) {
            int nova_linha = linha + deslocamento_x[i];
            int nova_coluna = coluna + deslocamento_y[i];

            if (nova_linha >= 0 && nova_linha < altura && nova_coluna >= 0 && nova_coluna < largura) {
                if (!visitado[nova_linha][nova_coluna] && grade[nova_linha][nova_coluna] == cor) {
                    visitado[nova_linha][nova_coluna] = true;
                    fila.push({nova_linha, nova_coluna});
                }
            }
        }
    }
    return tamanho;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    if (!(cin >> altura >> largura)) return 0;

    for (int i = 0; i < altura; i++) {
        for (int j = 0; j < largura; j++) {
            cin >> grade[i][j];
            visitado[i][j] = false;
        }
    }

    int menor_area = altura * largura + 1;

    for (int i = 0; i < altura; i++) {
        for (int j = 0; j < largura; j++) {
            if (!visitado[i][j]) {
                int area_atual = bfs(i, j);
                if (area_atual < menor_area) {
                    menor_area = area_atual;
                }
            }
        }
    }

    cout << menor_area << "\n";

    return 0;
}
