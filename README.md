# 開発環境
- devcontainerを使って開発することを前提としている
	- ローカルとコンテナでバインドマウントしているが、コンテナ環境にのみnode_modulesが作られるため、ローカル環境を参照しているエディタ上で型エラーが出る。この解決策として、devcontainerを用いてエディタがコンテナのコードを参照するようにしてエディタ上に表示される型エラーを消す

## devcontainer起動方法
1. `cmd + shift + p`でコマンドパレットを開く
2. `Dev Containers: Reopen in Container`で検索し、選択する
