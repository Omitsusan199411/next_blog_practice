import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import Link from "next/link";
import Setting from "./Setting";
import { auth } from "@/auth";

export default async function PrivateHeader() {
	const session = await auth();
	if (!session?.user?.email) throw new Error("不正なリクエストです")

	return (
		<header className="border-b bg-blue-200">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							{/* 本来、shadcn/uiのNavigationMenuLinkとNext.jsのLinkを併用すると<a>タグが二重で生成されてしまうため、asChildを使用して<a>タグを１つにマージする。 これによりshadcn/uiのNavigationMenuLinkの機能を利用しつつ、Next.jsのLinkの機能（リンク先のプリフェッチ）を利用できる。 */}
							<NavigationMenuLink asChild>
								<Link href="/dashboard" className="font-bold text-xl">
									管理ページ
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Setting session={session} />
			</div>
		</header>
	)
}
