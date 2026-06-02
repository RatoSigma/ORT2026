#include <bits/stdc++.h>
using namespace std;

int N, M;
vector<string> matriz;
vector<vector<bool>> AT;
vector<vector<bool>> VI;

int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

bool dfs(int x, int y) {
    VI[x][y] = true;
    bool boom = AT[x][y];
    
    for (int i = 0; i < 4; ++i) {
        int nx = x + dx[i];
        int ny = y + dy[i];
        
        if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
            if (matriz[nx][ny] == '#' && !VI[nx][ny]) {
                bool boom2 = dfs(nx, ny);
                if (!boom2) {
                    boom = false;
                }
            }
        }
    }
    
    return boom;
}

int main() {
    ios_base::sync_with_stdio(false);

    cin.tie(NULL);
    
    if (!(cin >> N >> M)) {
        return 0;
    }    
    
    matriz.resize(N);
    for (int i = 0; i < N; ++i) {
        cin >> matriz[i];
    }
    
    AT.assign(N, vector<bool>(M, false));
    VI.assign(N, vector<bool>(M, false));
    
    int K;
    cin >> K;
    for (int i = 0; i < K; ++i) {
        int r, c;
        cin >> r >> c;
        AT[r - 1][c - 1] = true;
    }
    
    int res = 0;
    
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < M; ++j) {
            if (matriz[i][j] == '#' && !VI[i][j]) {
                if (dfs(i, j)) {
                    res++;
                }
            }
        }
    }
    
    cout << res << "\n";
    
    return 0;
}
