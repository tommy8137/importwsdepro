### PartList 元件
  - PartlistContextProvider
  - PartListForm
  - PartListMenu

1. 使用PartlistContextProvider 把 component 包起來 

舉例來說: 我想要在 PartListModal 裡面使用 PartList 元件，就要在 <PartListModal /> 包上 <PartlistContextProvider></PartlistContextProvider>

```
import { PartlistContextProvider } from '~~elements/PartlistForm'

<PartlistContextProvider>
  <PartListModal {...props} />
</PartlistContextProvider>
```

2. PartListForm 初始化

舉例來說: PartListModal 把 api 回傳的 partItemValues 放到 initial_data

```
const [contextValue, dispatch] = useContextValue();
useEffect(() => {
  dispatch({ type: 'SET_INITIALDATA', initialData: partItemValues.partlist_value });
}, [partItemValues, partItemLayout]);
```

3. 其他： 更多的 reducer 值可以在 PartlistContextProvider 裡面找到。

舉例來說: 我想要變更 submitTimes。
```
const [contextValue, dispatch] = useContextValue();
dispatch({ type: 'SET_SUBMIT_TIMES', submitTimes: submitTimes + 1 });
```

