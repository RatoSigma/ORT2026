// ZjZdQlB
#include <bits/stdc++.h>
using namespace std;

int main () {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    long long fat[21];
    fat[0] = 1;
    for (int i=1; i<=20; i++) {
        fat[i] = fat[i-1] * i;
    }

    int T;
    cin>>T;

    while (T--) {
        long long N, K;
        cin>>N>>K;

        K--;

        vector<int> av;
        for (int i=1; i<=N; i++) av.push_back(i);

        vector<int> res;
        for (int i=N; i>=1; i--) {
            long long block = fat[i-1];
            long long idx = K/block;
            K = K%block;

            res.push_back(av[idx]);
            av.erase(av.begin() + idx);
        }

        for (int i=0; i<res.size();i++) {
            cout<<res[i]<<(i+1<res.size() ? ' ' : '\n');
        }
    }

    return 0;
}