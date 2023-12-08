"use client";

import { useRouter } from "next/navigation";
//14버전에서부터는 navigation을 이용해야 한다

export default function Create() {
	const router = useRouter();
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const title = e.target.title.value;
				const body = e.target.body.value;
				//서버로 데이터를 보내서 옵션 값을 추가하려는 것이므로 옵션 값이 필요
				const options = {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ title, body }),
				};
				fetch(process.env.NEXT_PUBLIC_API_URL + "topics", options)
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
				<input type="text" name="title" placeholder="title" />
			</p>
			<p>
				<textarea name="body" placeholder="body"></textarea>
			</p>
			<p>
				<input type="submit" value="create" />
			</p>
		</form>
	);
}
