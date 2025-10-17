'use sever'

import { registerSchema } from "@/validations/user"
import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

type ActionState = {
	success: boolean,
	errors: Record<string, string[]>
}

// バリデーションの結果、失敗した場合の処理
function handleValidationError(error: any): ActionState {
	// zodの仕様でパスワード一致確認のエラー（refine((data) => data.password === data.confirmPassword）はformErrorsで渡ってくるので注意！
	const { fieldErrors, formErrors } = error.flatten();

	// formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
	if (formErrors.length > 0) {
		return {
			success: false, errors: { ...fieldErrors, confirmPassword: formErrors }
		}
	}
	return {
		success: false, errors: fieldErrors
	}
}

// カスタムエラー
function handleError(customErrors: Record<string, string[]>): ActionState {
	return {
		success: false, errors: customErrors
	}
}


export async function createUser(
	prevState: ActionState,
	formData: FormData
): Promise<ActionState> {
	// フォームから渡ってきた情報を取得して、javascriptのオブジェクトに変換する（registerSchemaでバリデーションを実行するため）
	const rawFormData = Object.fromEntries(
		["name", "email", "password", "confirmPassword"].map((field) => [
			field,
			formData.get(field) as string
		])
	) as Record<string, string>


	// バリデーション
	const validationResult = registerSchema.safeParse(rawFormData)

	if (!validationResult.success) {
		return handleValidationError(validationResult.error)
	}

	// DBにメールアドレスが存在しているか確認
	const existingUser = await prisma.user.findUnique({
		where: {
			email: rawFormData.email
		}
	})

	// メールアドレスがすでに登録されている場合はエラーを返す
	if (existingUser) {
		return handleError(
			{
				email: ["このメールアドレスはすでに登録されています。"]
			}
		)
	}

	// パスワードをハッシュ化
	const hashedPassword = await bcryptjs.hash(rawFormData.password, 12)

	// DBに登録
	await prisma.user.create(
		{
			data: {
				name: rawFormData.name,
				email: rawFormData.email,
				password: hashedPassword,
			}
		}
	)

	// dashboardにリダイレクト
	await signIn('credentials', {
		...Object.fromEntries(formData),
		redirect: false,
	})

	redirect('/dashboard');
}
