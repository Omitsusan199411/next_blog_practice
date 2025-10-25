// データベースには画像ファイルのパスを保存する。画像ファイル自体はpublic/imagesフォルダに保存する

import { writeFile } from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function saveImage(file: File): Promise<string | null> {
	const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === "true";

	if (useSupabase) {
		return await saveImageToSupabase(file);
	} else {
		return await saveImageToLocal(file);
	}

}

export async function saveImageToLocal(file: File): Promise<string | null> {
	const buffer = Buffer.from(await file.arrayBuffer()) // 画像ファイルのarrayBufferを取り出してBufferに変換
	const fileName = `${Date.now()}_${file.name}`; // 保存する画像ファイル名を作成
	const uploadDir = path.join(process.cwd(), "public/images"); // 画像をアップロードするフォルダパスを作成

	try {
		const filePath = path.join(uploadDir, fileName); // 保存するファイルパスを作成
		await writeFile(filePath, buffer); // 作成したファイルパスにbufferを書き込む
		return `/images/${fileName}`; // 保存した画像ファイルのURLパスを返す
	} catch (error) {
		console.error("画像保存エラー:", error);
		return null;
	}
}

export async function saveImageToSupabase(file: File): Promise<string | null> {
	const fileName = `${Date.now()}_${file.name}`;
	const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!;
	const { error } = await supabase.storage.from(bucketName).upload(fileName, file, {
		cacheControl: "3600",
		upsert: false
	});

	if (error) {
		console.error("Upload failed:", error.message);
		return null
	}

	// 返り値の例
	// {
	//   data: {
	//     publicUrl: "https://xxx/storage/v1/object/public/images/photo.jpg"
	//   }
	// }
	const { data: publicUrlData } = await supabase.storage.from(bucketName).getPublicUrl(fileName); // supabaseのストレージの指定のバケットにアクセスして、指定したファイル名のパスを取得して、publicUrlDataに格納する。このとき、dataという変数で

	return publicUrlData.publicUrl;
}
