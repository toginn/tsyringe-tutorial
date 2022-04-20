# TSyringe のチュートリアル

TSyringe の動作のチュートリアルです。

### 起動方法

```bash
npm i
npm run start
```

### 実行結果

コンテナから呼び出したインスタンスを出力します。

```bash
コンテナからApplicationを呼び出し→
Application { database: DatabaseImpl {} }
```

### ソースコード

src/main.ts の中身になります。

```typescript
import "reflect-metadata";
import { container, inject, injectable } from "tsyringe";

interface Database {}

class DatabaseImpl implements Database {}

// Step1/3 DIパターンを使うクラスにデコレータを付ける
@injectable()
class Application {
  constructor(@inject("Database") private database: Database) {}
}

// Step2/3 インターフェースの実装クラスを登録する
container.register<Database>("Database", {
  useClass: DatabaseImpl,
});

// Step3/3 コンテナからインスタンスを取得する
const application = container.resolve(Application);

console.log("コンテナからApplicationを呼び出し→");
console.log(application);
```
