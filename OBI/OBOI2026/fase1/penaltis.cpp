// ZjZdQlB
#include <bits/stdc++.h>
using namespace std;

int main () {
    // barsemlona é foda
    int N, v1, v2, d1, d2;
    cin>>N>>v1>>v2>>d1>>d2;
    
    bool barsemlona = (N-d1)>v2;
    bool ladrilhas = (N-d2)>v1;

    cout<<(barsemlona ? "S" : "N") << "\n";
    cout<<(ladrilhas ? "S" : "N");

    return 0;
}