// ログイン処理を実行するためのサーバーアクション（auth.tsのsignIn関数を呼び出して認証ロジックを実行させるためのファイル）
"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		// 'credentials'はauth.tsで定義したCredentialsプロバイダーを指定する識別子
		// NextAuthは複数の認証プロバイダー（Google、GitHub、メール/パスワードなど）をサポートしており、
		// どのプロバイダーを使用するかを第1引数で指定する
		// この'credentials'は、auth.tsの providers: [Credentials({ ... })] に対応している
		await signIn("credentials", {
			...Object.fromEntries(formData), // formDataオブジェクトをjavascriptのオブジェクトに変換する
			redirect: false, // NextAuthの自動リダイレクトを無効化する。（dashboardにリダイレクトさせるため）
		})

		redirect("/dashboard")
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "メールアドレスまたはパスワードが正しくありません"
				default:
					return "エラーが発生しました。"
			}
		}
		throw error
	}
}
