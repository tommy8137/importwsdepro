# Cable FFC 公式說明

---

## F.成品總價 = A.材料費 + B.二次加工費 + C.零件費 + D.運包 + E.管銷&利潤10%

---

### A.材料費
> = FFC尺寸(L) * (FFC尺寸(W)+FFC尺寸(邊料)) * (材料單價(Price/m²)/1000000) * (1+LossRate)

>> 問題:
>> - HB: 0.07 (無沖型)
>> - MGE: 0.0.069 (無沖型)


- FFC尺寸(L): 使用者輸入
- FFC尺寸(Ｗ): (PIN數+1)*PITCH
  - PIN數: 使用者輸入
  - PITCH: 使用者輸入
- FFC尺寸(邊料): 2+ 沖型(次) * (1.25*2)

- 沖型(次): 使用者輸入(0/1)

- 材料單價(Price/m²): 26.6

- LossRate: 3%

>> 問題:
>> - PITCH: 0.5 => 50%
>> - PITCH: 1.0 => 6%~8%

---

### B.二次加工費
> 組裝(sec) + 折彎(次) + 印刷(面) + 沖型(次) + 金手指掛鍍(鍍金）/次+ 停止線(條)

- 組裝(sec): 組裝秒數 / 60 * USD/min

  - 組裝秒數: 84
  - USD/min: 0.45

>> USD/min 會定期維護？

- 折彎(次): 次數 ＊ U/P
  - 次數: 使用者輸入
  - U/P: 0.0080

>> 問題:
>> - MGE: 0.00855
>> - HT: 0.0088

- 印刷(面): 面數 ＊ U/P
  - 面數: 使用者輸入
  - U/P: 0.0060

>> 問題:
>> - HB: 0.006~0.008
>> - MGE: 0.014

- 沖型(次): 次數 ＊ U/P
  - 次數: 使用者輸入(0/1)
  - U/P: 0.0160

>> 問題:
>> - MGE: 0.017
>> - HT:

- 金手指掛鍍(鍍金）/次: 次數 ＊ U/P
  - 次數: 使用者輸入
  - U/P: PIN數 * (PITCH * 0.6) * 5 * 0.00017(USD/mm2?) * 2

備註（問題）：
```
Hamburg:
1根pin腳約估是USD0.0005
以總長150mm為一個比,超過會漲幅15%
=>0.00017 USD/mm2

MGE:
0.000333 USD/平方mm

HT:

ps:金手指長度為定數?
MGE: 依照板端CONN SPEC規定,目前DT產品我司工程告知已沒有使用FFC,NB常用為3~5mm

```

- 停止線(條): 條數 ＊ U/P
  - 條數: 使用者輸入
  - U/P: 0.0080

備註（問題）：
```
HT:
```

### C.零件費
> Al foil + 補強板 + Label + 導電布 + 背膠1 + 背膠2

- Al foil: 用量 * U/P * (( Al foil(L) +6) * (FFC尺寸(W) + 6) / 1000000) * (1 + lossRate)

  - 用量: 使用者輸入
  - U/P: 2.97
  備註（問題）：
  ```
  Al foil: 1.47 USD/m²
  Adhesive DS T5: 1.5 USD/m²
  ```
  - Al foil(L): 使用者輸入
  - FFC尺寸(W): 上方變數
  - lossRate: 1.5%

- 補強板: 用量 * U/P * (補強板(L) / 1000000) * (1 + lossRate)

  - 用量: 使用者輸入
  - U/P: 2.6090
  - 補強板(L): 使用者輸入
  - lossRate: 1.5%

- Label: 用量 * U/P * (1 + lossRate)

  - 用量: 使用者輸入
  - U/P: 0.0010
  - lossRate: 1.5%


- 導電布: 用量 * U/P * (導電布(L) / 1000000) * (1 + lossRate)

  - 用量: 使用者輸入
  - U/P: 17.0000
  - 導電布(L): 使用者輸入
  - lossRate: 1.5%

- 背膠1: 用量 * U/P * (背膠1(L)*背膠1(W)!L8/1000000) * (1 + lossRate)

  - 用量: 使用者輸入
  - U/P: 1.5000
  - 背膠1(L): 使用者輸入
  - 背膠1(W): 使用者輸入
  - lossRate: 1.5%


- 背膠2: 用量 * U/P * (背膠2(L)*背膠2(W)!L8/1000000) * (1 + lossRate)

  - 用量: 使用者輸入
  - U/P: 1.5000
  - 背膠2(L): 使用者輸入
  - 背膠2(W): 使用者輸入
  - lossRate: 1.5%


### D.運包
> 0.02

### E.管銷&利潤10%
> A.材料費 * 0.1
