import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PostDropDownMenu({postId}: {postId: string}) {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="px-2 py-1 border rounded-md cursor-pointer">
					•••
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48">
					<DropdownMenuItem asChild>
						<Link href={`manage/posts/${postId}`} className="cursor-pointer">
							詳細
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={`manage/posts/${postId}/edit`} className="cursor-pointer">
							編集
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="text-red-600">
						<Link href={`manage/posts/delete/${postId}`} className="cursor-pointer">
							削除
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
