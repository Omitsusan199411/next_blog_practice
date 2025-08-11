import { prisma } from "@/lib/prisma" 

export async function getPosts() {
	return await prisma.post.findMany({
		where: { published: true },
		include: {
			author: {
				select: {
					name: true
				}
			}
		},
		orderBy: {
			createdAt: "desc"
		}
	})
}

export async function getPost(id: string) {
	return await prisma.post.findUnique({
		where: { id },
		include: {
			author: {
				select: {
					name: true
				}
			}
		}
	})
}

export async function searchPosts(search: string) {
	const decodedSearch = decodeURIComponent(search)
	const normalizedSearch = decodedSearch.replace(/[\s　]+/g, ' ').trim() // \sは半角スペース、タブ、改行など。+は１文字以上繰り返し。gは全て置換
	const searchWords = normalizedSearch.split(' ').filter((search) => Boolean(search)) // 空文字やnullなどの不要な要素を削除

	const filters = searchWords.map((word) => ({
		OR: [
			{ title: { contains: word } },
			{ content: { contains: word } },
		]
	}))

	return await prisma.post.findMany({
		where: {
			AND: filters
		},
		include: {
			author: {
				select: {
					name: true
				}
			}
		},
		orderBy: {
			createdAt: "desc"
		}
	})

}
