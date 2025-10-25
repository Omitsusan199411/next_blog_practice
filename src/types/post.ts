export type Post = {
	id: string
	title: string
	content: string
	topImage: string | null
	published: boolean
	authorId: string
	author: {
		name: string
	}
	createdAt: Date
	updatedAt: Date
}

export type PostCardProps = { post: Post }
