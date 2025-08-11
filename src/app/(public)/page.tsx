import React from "react";
import { getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"

type SearchParams = {
	search?: string
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
	const resolvedSearchParams = await searchParams
	const query = resolvedSearchParams.search || ""
	// const posts = await getPosts() as Post[]

	const posts = query ? await searchPosts(query) : await getPosts()

	return (
		<>
			<div className="container mx-auto px-4 py-8" >
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.length === 0 ? (
						<div className="col-span-full text-center text-gray-500">
							検索結果がありません
						</div>
					) : (
						posts.map((post: Post) => (
							<PostCard key={post.id} post={post} />
						))
					)}
				</div>
			</div>
		</>
	)
}
