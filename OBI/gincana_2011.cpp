#include <iostream>
#include <vector>

using namespace std;

vector<int> papai;

int find(int x) {
    if (papai[x] == x) {
        return x;
    }
    return papai[x] = find(papai[x]);
}

void juntar(int a, int b) {
    papai[find(a)] = find(b);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    papai.resize(n + 1);
    for (int i = 1; i <= n; i++) {
        papai[i] = i;
    }

    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        juntar(a, b);
    }

    int times = 0;
    for (int i = 1; i <= n; i++) {
        if (find(i) == i) {
            times++;
        }
    }

    cout << times << '\n';
    return 0;
}
