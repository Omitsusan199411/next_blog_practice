'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import DeletePostDialog from "./DeletePostDialog"
import { useState } from "react"

export default function PostDropDownMenu({postId}: {postId: string}) {
	const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
	const [ showDeleteDialog, setShowDeleteDialog ] = useState(false);

	const handleDeleteDialogChange = (open: boolean) => {
		setShowDeleteDialog(open);
		if (!open) {
			setIsDropdownOpen(false);
		}
	}

	return (
		<>
		{/* open={isDropdownOpen} は現在のドロップダウンメニューの開閉状態を表す*/}
		{/* ドロップダウンが開かれた時にonOpenChange関数の引数としてtrueが渡される。閉じるとfalseが渡される */}
			<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
					<DropdownMenuItem className="text-red-600" onSelect={() => { 
						setIsDropdownOpen(false); // 削除を選択するとドロップダウンメニューを閉じる
						setShowDeleteDialog(true); // 削除ダイアログを表示する
					}}>
						<Link href={`manage/posts/delete/${postId}`} className="cursor-pointer">
							削除
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{showDeleteDialog && (
				<DeletePostDialog postId={postId} isOpen={showDeleteDialog} onOpenChange={handleDeleteDialogChange} />
			)}
		</>
	)
}
