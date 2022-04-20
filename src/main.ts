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

console.log(application);
