"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//14버전에서부터는 navigation을 이용해야 한다

export default function Update() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const router = useRouter();
	const params = useParams();
	const id = params.id;
	useEffect(() => {
		fetch(`http://localhost:9999/topics/` + id)
			.then((resp) => resp.json())
			.then((result) => {
				setTitle(result.title);
				setBody(result.body);
			});
	}, []);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const title = e.target.title.value;
				const body = e.target.body.value;
				//서버로 데이터를 보내서 옵션 값을 추가하려는 것이므로 옵션 값이 필요
				const options = {
					method: "PATCH",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ title, body }),
				};
				fetch(process.env.NEXT_PUBLIC_API_URL + `topics/` + id, options)
					.then((res) => res.json())
					.then((result) => {
						console.log(result);
						const lastid = result.id;
						router.push(`/read/${lastid}`);
						router.refresh();
					});
			}}
		>
			<p>
				<input
					type="text"
					name="title"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</p>
			<p>
				<textarea
					name="body"
					placeholder="body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				></textarea>
			</p>
			<p>
				<input type="submit" value="Update" />
			</p>
		</form>
	);
}
