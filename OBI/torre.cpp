#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, maior = 0;
    cin >> N;

    vector<vector<int>> tabuleiro(N, vector<int>(N));
    vector<int> soma_linha(N, 0), soma_coluna(N, 0);

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cin >> tabuleiro[i][j];
            soma_linha[i] += tabuleiro[i][j];
            soma_coluna[j] += tabuleiro[i][j];
        }
    }


    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            int total = soma_linha[i] + soma_coluna[j] - 2 * tabuleiro[i][j];
            maior = max(maior, total);
        }
    }

    cout << maior;

    return 0;
}
