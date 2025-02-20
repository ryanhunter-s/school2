"use client";
import { useGetUserByIdQuery } from '@/store/services/userApi';
import Link from 'next/link';
import { useEffect } from 'react';
import { redirect } from "next/navigation";

export default function User(props: { userId: string }) {
	const id = props.userId;
	const {data, error, isLoading, isFetching} = useGetUserByIdQuery({id});
	useEffect(() => {
		if (error) {
			redirect("/");
		}
	}, [error]);

	if(isLoading || isFetching) return <p>Loading...</p>
	if(error) return <p>Some Error...</p>

	return (
		<>
			<div className='absolute w-full flex justify-center items-center top-20'>
				<Link href="/" className='mx-2 bg-blue-500 rounded-lg px-3 p-2 text-white'>Black</Link>
				{(id!='1') && <Link href={`/user/${Number(id)-1}`} className='mx-2 bg-green-500 rounded-lg px-3 p-2 text-white'>Prev</Link>}
				<Link href={`/user/${Number(id)+1}`} className='mx-2 bg-green-500 rounded-lg px-3 p-2 text-white'>Next</Link>
			</div>
			<div className="flex justify-center items-center w-screen h-screen">
				<div className="bg-white w-[350px] rounded-lg p-5">
					<h1 className="text-3xl text-black mb-3">{data?.username}</h1>
					<p className="text-2xl text-black mb-2">{data?.name}</p>
					<p className="text-1xl text-black">{data?.email}</p>
				</div>
			</div>
		</>
	)
}
