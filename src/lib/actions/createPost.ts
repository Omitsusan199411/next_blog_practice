"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { saveImage } from "@/utils/image"
import { postSchema } from "@/validations/posts"
import { redirect } from "next/navigation"

type ActionState = {
	success: boolean
	errors: Record<string, string[]>
}

export async function createPost(
	prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	// フォームの情報を取得する
	const title = formData.get("title") as string
	const content = formData.get("content") as string
	const topImageInput = formData.get("topImage")
	const topImage = topImageInput instanceof File ? topImageInput : null // topImageInputがFileクラスのインスタンスかどうかを確認

	// バリデーションを実行する
	const validationResult = postSchema.safeParse({ title, content, topImage })
	if (!validationResult.success) {
		return {
			success: false,
			errors: validationResult.error.flatten().fieldErrors,
		}
	}

	// 画像を保存する
	const imageUrl = topImage ? await saveImage(topImage) : null
	if (topImage && !imageUrl) {
		return {
			success: false,
			errors: { topImage: ["画像の保存に失敗しました"] },
		}
	}

	// DBに保存する
	const session = await auth()
	const userId = session?.user?.id
	if (!session?.user?.email || !userId) {
		throw new Error("不正なリクエストです")
	}

	await prisma.post.create({
		data: {
			title,
			content,
			topImage: imageUrl,
			published: true,
			authorId: userId,
		},
	})

	redirect("/dashboard")
}
