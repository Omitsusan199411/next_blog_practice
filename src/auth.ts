// 認証ロジックを実行、管理するファイル
import { authConfig } from "@/auth.config"
import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

async function getUser(email: string) {
	// prismaを使ってユーザーを取得
	return await prisma.user.findUnique({
		where: { email: email },
	})
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig, // auth.config.tsの設定内容を取り込む
	providers: [
		Credentials({
			async authorize(credentials) {
				// 引数のcredentialsはログインフォームから送られてきたデータ（メールアドレスとパスワード）
				const parsedCredentials = z
					.object({
						email: z.string().email(),
						password: z.string().min(8),
					})
					.safeParse(credentials) // credentialsに対して、safeParseでバリデーションを実行（バリデーションに失敗してもエラーをスローせずに結果のオブジェクトを返す）

				if (parsedCredentials.success) {
					// バリデーションに成功した場合は、メールアドレスからユーザー情報を取得し、パスワードを照合する
					const { email, password } = parsedCredentials.data
					const user = await getUser(email) // ユーザーをDBから取得
					if (!user) return null
					const passwordsMatch = await bcryptjs.compare(
						password,
						user.password,
					) // パスワードの照合。ハッシュ化された状態で比較
					if (passwordsMatch) return user // パスワードが一致した場合はユーザーを返す
				}
				return null // パスワードが一致しない場合はnullを返す
			},
		}), // メールアドレス/パスワードを使ったカスタム認証を有効化（サインイン機能の追加）
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user) {
				session.user.id = (token.id || token.sub) as string
				session.user.name = token.name ?? ""
				session.user.email = token.email ?? ""
			}
			return session
		},
	},
})
