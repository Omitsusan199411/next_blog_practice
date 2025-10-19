// データベースには画像ファイルのパスを保存する。画像ファイル自体はpublic/imagesフォルダに保存する

import { writeFile } from "fs/promises";
import path from "path";

export async function saveImage(file: File): Promise<string | null> {
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
