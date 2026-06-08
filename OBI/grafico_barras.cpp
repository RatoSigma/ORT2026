#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    int nums[N];
    int maior=0

    for (int i=0; i<N; i++) {
        cin>>nums[i];
        if (nums[i]>nums[i-1]) {
            maior=nums[i];
        }
    }
    cout<<maior;
 
    return 0;
}