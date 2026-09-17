// ZjZdQlB
#include <bits/stdc++.h>
using namespace std;

int main () {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin>>N;
    string S;
    cin>>S;

    vector<long long> vasco(2*N+1,0);

    long long palmeiras=0;
    vasco[N] = 1;

    for (int i=0; i<N; i++) {
        if (S[i] == '1') palmeiras++;
        else palmeiras--;
        vasco[palmeiras+N]++;
    }

    long long res = 0;
    for (long long cnt : vasco) {
        res += cnt*(cnt-1)/2;
    }

    cout<<res;

    return 0;
}