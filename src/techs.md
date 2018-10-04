# 使っている技術

Rapunzelは主に次の技術を使って開発されています。
その他のライブラリ等については`package.json`を見てください。

## TypeScript

JavaScriptで開発するのはしんどいが、その資産は使いたいのでTypeScriptを採用しました。

## React

最も使い慣れているので採用しました。

## Styled Components

最も使い慣れているので採用しました。他の候補としてはStylus/CSSModulesがありました。

## MobX

Reduxでもよかったのですが、なんとなく試してみたかったのでMobXを採用しました。

## BrowserFS

開発コストを他に依存しつつ多階層ファイルシステムを使うために採用しました。

## Remark

使いなれているので採用しました。型定義ファイルがないのが惜しいですが。

## CodeMirror

使い慣れているので採用しました。MonacoEditorに変えようか検討しています。

## Microsoft Office Ui Fabric

UIデザインが苦手なのでなんらかのCSSフレームワークを使いたかった。GitHubのPrimerやMaterialUIも候補に入っていたが、ちょっと使ってみたかったので特に強い理由はないがOffice-ui-fabricを採用しました。

## Webpack

他に特に選択肢もなく採用しました。ちなみに、始めてWebpack4を使ったが、そこまで新しい知識は必要なかった。

## ServiceWorker

WorkboxPluginを使ってキャッシュするために使用しました。

## Jest

他のテストフレームワークをあまり使えないので採用しました。
