"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPost } from "@/lib/actions/createPost"
import "highlight.js/styles/github.css" // コードハイライト用のスタイル
import React, { useActionState, useState } from "react"
import ReactMarkdown from "react-markdown"
import TextareaAutosize from "react-textarea-autosize"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

export default function CreatePage() {
	const [content, setContent] = useState("")
	const [contentLength, setContentLenth] = useState(0)
	const [preview, setPreview] = useState(false)
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value
		setContent(value)
		setContentLenth(value.length)
	}
	const [state, formAction] = useActionState(createPost, {
		success: false,
		errors: {},
	})

	return (
		<div className="container mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">
				新規記事投稿（Markdown対応）
			</h1>
			<form action={formAction} className="space-y-4">
				<div>
					<Label htmlFor="title">タイトル</Label>
					<Input
						id="title"
						name="title"
						placeholder="タイトルを入力してください"
						className="mt-2"
					/>
					{state.errors.title && (
						<p className="text-red-500 text-sm mt-1">
							{state.errors.title.join(",")}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="topImage">トップ画像</Label>
					<Input
						type="file"
						id="topImage"
						name="topImage"
						accept="image/*"
						className="mt-2"
					/>
					{state.errors.topImage && (
						<p className="text-red-500 text-sm mt-1">
							{state.errors.topImage.join(",")}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="content">内容（Markdown）</Label>
					<TextareaAutosize
						id="content"
						name="content"
						className="w-full border p-2 mt-2"
						placeholder="Markdown形式で入力してください"
						minRows={8}
						value={content}
						onChange={handleContentChange}
					/>
					{state.errors.content && (
						<p className="text-red-500 text-sm mt-1">
							{state.errors.content.join(",")}
						</p>
					)}
				</div>
				<div className="text-right text-sm text-gray-500 mt-1">
					現在の文字数：{contentLength}
				</div>
				<div>
					<Button
						type="button"
						onClick={() => setPreview((preview) => !preview)}
					>
						{preview ? "プレビューを閉じる" : "プレビューを表示"}
					</Button>
				</div>
				{preview && (
					<div className="border p-4 bg-gray-50 prose max-w-none">
						{/* skipHtmlはHTMLスキップを無効化、 unwrapDisallowedはMarkdownの改行を解釈 */}
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeHighlight]}
							skipHtml={false}
							unwrapDisallowed={true}
						>
							{content}
						</ReactMarkdown>
					</div>
				)}
				<Button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-md"
				>
					登録する
				</Button>
			</form>
		</div>
	)
}
