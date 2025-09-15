// 認証ロジックを実行、管理するファイル
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod"; 
import { prisma}  from "@/lib/prisma";
import bcryptjs from "bcryptjs";

async function getUser(email: string) { // prismaを使ってユーザーを取得
	return await prisma.user.findUnique({
		where: { email: email}
	})
}

export const { auth, signIn, signOut, handlers} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z.object(
					{
						email: z.string().email(),
						password: z.string().min(8),
					}
				)
				.safeParse(credentials); // credentialsに対して、safeParseでバリデーションを実行（バリデーションに失敗してもエラーをスローせずに結果のオブジェクトを返す）

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(email); // ユーザーを取得
					if (!user) return null;
					const passwordsMatch = await bcryptjs.compare(password, user.password); // パスワードの照合
					if (passwordsMatch) return user; // パスワードが一致した場合はユーザーを返す
				}
				return null; // パスワードが一致しない場合はnullを返す
			}
		}) // メールアドレス/パスワードを使ったカスタム認証を有効化（サインイン機能の追加）
	]
});
