// NextAuthが使用する認証用の設定ファイル
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
	pages: {
		signIn: "/login", // 認証されていない場合のリダイレクト先
	},
	providers: [], // providersオプションは、さまざまなログインオプションを列挙する配列
	callbacks: {
		authorized: async ({ auth, request: { nextUrl } }) => {
			// authorizedコールバックは、リクエストがNext.jsミドルウェアを含むページへのアクセスを許可されているかどうかを確認する。authにはユーザーのセッションが含まれる。requestにはユーザーからの受信リクエストを受け取る
			const isLoggedIn = !!auth?.user // ユーザーがログインしているかどうかを確認
			const isOnDashboard =
				nextUrl.pathname.startsWith("/dashboard") ||
				nextUrl.pathname.startsWith("/manage") // ログインが必要なURLを指定
			if (isOnDashboard) {
				if (isLoggedIn) return true
				return Response.redirect(new URL("/login", nextUrl))
			} else if (isLoggedIn && nextUrl.pathname === "/login") {
				// 既にログインしている、かつloginページにアクセスした場合は、dashboardにリダイレクト
				return Response.redirect(new URL("/dashboard", nextUrl))
			}
			return true
		},
	},
} satisfies NextAuthConfig
