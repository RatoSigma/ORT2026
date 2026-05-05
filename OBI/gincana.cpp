#include <bits/stdc++.h>
using namespace std;

int main() {
    long long N, M;
    cin >> N >> M;

    long long X = M;
    while (gcd(N, X) != 1) {
        X--;
    }

    cout << X << '\n';
    return 0;
}
