# DB Migrate v1.1


## Introduction

將指定資料夾的Schema Migrate至目標DB

## Quick Create

### 建立 Common Migrate 範本

```
$ ./dbhelper.sh -u create -n your_file_name -p common
```

### 建立 WT Migrate 範本

```
$ ./dbhelper.sh -u create -n your_file_name -p wt
```

### 建立 WSD Migrate 範本

```
$ ./dbhelper.sh -u create -n your_file_name -p wsd
```

## Usage

### Create Migrate SQL

```
$ ./dbhelper.sh -u create -n your_file_name -p migrate_dir_path
```

### Exec Migrate

```
$ ./dbhelper.sh -u migrate -s env_name -p migrate_dir_path
```

### command parameter

- -u | --use
    - create: 建立db schema
    - migrate: 將schema migrate至db，根據-s參數決定migrate至哪一個db
- -s | --stage
    - migrate至哪一個環境，預設為dev，環境列表請參考資料夾中的config.json
- -p | --path
    - 指定schema要建立路徑
    - 僅接受三種值：
        - common：僅放入schema的架構變動相關的sql（欄位變更、新增或刪除table、view等）
        - wt：放置wt的資料insert、修改相關的sql
        - wsd:放置wsd的資料insert、修改相關的sql
- -n | --name
         - 指定schema檔案名稱
- -v | --version
         - 指定rollback檔案名稱

### more example

#### Create
```
sh dbhelper.sh -u create -n test -p common
```

#### Migrate
```
sh dbhelper.sh -u migrate -s dev -p wt
```
#### Down

```
sh dbhelper.sh -u down -s dev -p wt
```
```
sh dbhelper.sh -u down -s dev -p wt -v  20190426035003-eedm-price-batch-function.js
```
