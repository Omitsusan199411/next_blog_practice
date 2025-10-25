import { prisma } from "@/lib/prisma"

export async function getOwnPost(userId: string, postId: string) {
	return await prisma.post.findFirst({
		where: {
			AND: [{ authorId: userId }, { id: postId }],
		},
		select: {
			id: true,
			title: true,
			content: true,
			topImage: true,
			author: true, // postsテーブルとrelation関係であるusersテーブルのデータをjoinして取得
			published: true,
			createdAt: true,
			updatedAt: true,
		},
	})
}
