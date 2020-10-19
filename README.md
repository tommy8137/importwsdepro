## 開發流程
### Init
1. fork project https://gitlab.devpack.cc/e-procure-wsd/wi-procurement
2. clone own porject: `git clone git@gitlab.devpack.cc:[username]/wi-procurement.git`
3. in your git project, add remote: `git remote add upstream git@gitlab.devpack.cc:e-procure-wsd/wi-procurement.git`
4. write code!
### Contribute
1. Commit
2. Before push, rebase: `git pull --rebase upstream master`
3. Resolve conflict if have
3. Push code `git push`
4. create merage request

## CICD Settings
### Runners
- Shared Runners: Enable shared Runners
- Specific Runners: #204 (DIND 198 Runner), #205 (DIND 199 Runner)

### Environment variables 


| Key | Value | Usage |
| -------- | -------- | -------- |
| CERT_PRIVATE_KEY     | 另外提供  | HTTPS Key |
| CERT_PUBLIC_KEY1     | 另外提供  | HTTPS Key |
| CERT_PUBLIC_KEY2     | 另外提供  | HTTPS Key |
| DOCKER_PASSWORD     | 開機密碼  | docker push 需要 |
| DOCKER_USERNAME     | 個人email  | docker push 需要 |
| IS_BACKEND     | true/false  | 是否執行後端CICD流程 |
| IS_FRONTEND     | true/false  | 是否執行前端CICD流程 |
| VM_DEV_PASSWORD     | 另外提供  | dev:deploy的VM密碼 |
| VM_PORT     | [自行設定](https://gitlab.devpack.cc/e-procure-wsd/wi-procurement/issues/7)  | dev:deploy的Web Port |


