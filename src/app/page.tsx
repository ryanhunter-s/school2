"use client";
import { decrement, increment } from '@/store/features/counterSlice';
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import { useGetUsersQuery } from '@/store/services/userApi';
import Link from 'next/link';

export default function HomePage() {
	const count = useAppSelector((state) => state.counterReducer.value);
	const dispatch = useAppDispatch();
	const {data, error, isLoading, isFetching} = useGetUsersQuery(null);

	if(isLoading || isFetching) return <p>Loading...</p>
	if(error) return <p>Some Error...</p>

	return (
		<div className='flex justify-center items-center flex-col'>
			<div className='block py-5'>
				<h1 className='text-3xl mb-5 text-center'>{count}</h1>
				<button onClick={() => dispatch(increment())} className='mx-2 bg-green-500 rounded-lg p-2'>Increment</button>
				<button onClick={() => dispatch(decrement())} className='mx-2 bg-red-500 rounded-lg p-2'>Decrement</button>
			</div>
			<div className='py-10 px-5 grid w-full grid-cols-3 md:grid-cols-3 gap-5'>
				{
					data?.map((user) => (
						<div key={user.id} className='my-2 mx-2 bg-gray-200 rounded-lg p-2'>
							<p className='font-bold tex-xl mb-2 text-black'>{user.name}</p>
							<p className='font-bold tex-xl mb-2 text-black'>{user.username}</p>
							<p className='font-bold tex-xl mb-2 text-black'>{user.email}</p>
							<p className='font-bold tex-xl mb-2 text-black'>UserId: {user.id}</p>
							<Link href={`/user/${user.id}`} className='mb-2 text-white bg-blue-500 rounded-lg p-2'>View</Link>
						</div>
					))
				}
			</div>
		</div>
	)
}