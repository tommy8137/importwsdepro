這個Helper主要是用來判斷使用者事不是閒置一段時間，     
如果閒置太久，就把它登出    
所以你可以把它掛到Component上就可以了    
通常是掛到PrivateRoute去用，改得最少(因為只有登入的狀態需要判斷需不需要登出)


```js
import IdleDetectHelper from '~~features/IdleDetectHelper/IdleDetectHelper';
export default IdleDetectHelper(PrivateRoute);
```