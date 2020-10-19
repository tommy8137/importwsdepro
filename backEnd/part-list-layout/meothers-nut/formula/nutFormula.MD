# Nut 疑難雜症

## 成品總價 =  A.材料費 + B.成型費 + C.加工費 + D.全檢包裝運輸 + E.管銷10%

### A. 材料費

-  A.材料費 = 材料單價 * partWeight / 1000

  - 材料單價 = 查表得來
  - partWeight = partWeightD1 + partWeightD2 - partWeightD3
    - partWeightD1 = 3.14 * (d1外徑 /2) ^ 2  * d1高 * 密度 / 1000
    - partWeightD2 = 3.14 * (d2直徑) ^ 2  * d1高 * 密度 / 1000
    - partWeightD2 = 3.14 * (OD內徑) ^ 2  * 內徑高 * 密度 / 1000

### B. 成型費

- B. 成型費 = 成型加工費用(攻牙) / 成型費(攻牙) 一般產能 * ( 1 + 成型費(攻牙) Loss Rate)

  - 成型加工費用(攻牙) = from DB
  - 成型費(攻牙) 一般產能 = from DB
  - 成型費(攻牙) Loss Rate = from DB

### C. 加工費

- C. 加工費 = 電鍍加工費 + 熱處理加工費 

  - 電鍍加工費 = partWeight *  電鍍處理單價  / 1000
  - 熱處理加工費用 = partWeight *  熱處理單價  / 1000

    - 電鍍處理單價 = From DB
    - 熱處理單價 = From DB

### D.全檢包裝運輸

- D.全檢包裝運輸 = From DB


### E.管銷10%

- E.管銷10% ＝ (B.成型費 + C.加工費) * 0.1