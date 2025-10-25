"use client"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchBox() {
	const [search, setSearch] = useState("")
	const [debouncedSearch, setDebouncedSearch] = useState("")
	const router = useRouter()

	// デバウンス設定
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search)
		}, 500)

		return () => clearTimeout(timer)
	}, [search])

	// debouncedSearchが更新されたら実行
	useEffect(() => {
		if (debouncedSearch.trim()) {
			router.push(`/?search=${debouncedSearch.trim()}`)
		} else {
			router.push("/")
		}
	}, [debouncedSearch, router])

	return (
		<>
			<Input
				placeholder="記事を検索..."
				className="w-[200px] lg:w-[300px]"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</>
	)
}
