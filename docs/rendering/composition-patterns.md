# サーバーとクライアントの構成パターン

いつ Server Component にして、いつ Client Component にするか？

- [対応表](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

- できるだけ Server Component を使用して、ツリー末端コンポーネントで必要なものだけ Client Component にしたほうが、クライアントの JS バンドルサイズが小さくなるためパフォーマンスが良い。

## API リクエストの自動的なメモ化

- サーバーコンポーネントでは `useContext`を使用できない。ではどうやってデータを共有するのか？
  - --> Next.js では、`fetch` でリクエストされた場合、API リクエストを自動でメモ化することで、無駄なリクエストをなくせる。

## Server only の使用

- サーバーサイドでのみ使用されることを想定したモジュールに対しては `server-only`ライブラリを使用するとよい。
- このパッケージが`import`されたモジュールがクライアントサイドに含まれるとエラーがスローされる

### 使い方

```sh
npm install server-only
```

```ts
export async function getData() {
  const res = await fetch("https://external-service.com/data", {
    headers: {
      authorization: process.env.API_KEY,
    },
  });

  return res.json();
}
```

## use client ディレクティブの無いサードパーティライブラリについて

- `useState`などが使用されているが、`use client` ディレクティブの設定されていないコンポーネントをサーバーコンポーネントで使おうとするとエラーになる。この場合は、ラッパーのクライアントコンポーネントを一旦挟むのがよい。

### 例

```ts
// acme-carousel は直接 Server component で使用できないため、ラッパーコンポーネントを作成する
"use client";

import { Carousel } from "acme-carousel";

export default Carousel;
```

```ts
// ラッパーコンポーネントをサーバーコンポーネントで呼び出す
import Carousel from "./carousel";

export default function Page() {
  return (
    <div>
      <p>View pictures</p>

      {/*  Works, since Carousel is a Client Component */}
      <Carousel />
    </div>
  );
}
```
