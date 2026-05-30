#include <bits/stdc++.h>
using namespace std;

int L, C;
vector<string> mapa;
vector<vector<bool>> visitado;

int dr[] = {-1, 1, 0, 0};
int dc[] = {0, 0, -1, 1};

int final_r, final_c;

void dfs(int r, int c) {
    visitado[r][c] = true;
    
    final_r = r;
    final_c = c;
    
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        
        if (nr >= 0 && nr < L && nc >= 0 && nc < C) {
            if (mapa[nr][nc] == 'H' && !visitado[nr][nc]) {
                dfs(nr, nc);
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    if (!(cin >> L >> C)) return 0;
    
    mapa.resize(L);
    visitado.assign(L, vector<bool>(C, false));
    
    int start_r = -1, start_c = -1;
    
    for (int i = 0; i < L; i++) {
        cin >> mapa[i];
        for (int j = 0; j < C; j++) {
            if (mapa[i][j] == 'o') {
                start_r = i;
                start_c = j;
            }
        }
    }
    
    if (start_r != -1 && start_c != -1) {
        dfs(start_r, start_c);
    }
    
    cout << final_r + 1 << " " << final_c + 1 << "\n";
    
    return 0;
}
