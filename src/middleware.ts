import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth; // NextAuthを初期化。authプロパティをエクススポート

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  	runtime: 'nodejs',
}
