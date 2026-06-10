#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    vector<int> x(N);
    int maior = 0;

    for (int i = 0; i < N; i++) {
        cin >> x[i];
        maior = max(maior, x[i]);
    }

    for (int j = maior; j >= 1; j--) {
        for (int i = 0; i < N; i++) {
            if (i > 0) cout << ' ';
            cout << (x[i] >= j ? 1 : 0);
        }
    }

    return 0;
}
