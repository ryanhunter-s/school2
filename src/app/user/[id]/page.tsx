import User from "./user";
export default async function UserPage({
	params,
}: {
	params:  Promise<{ id: number }>;
}) {
	const allParams = await params;
	const { id: imageId } = allParams;

	const isNumber = Number(imageId);
	if(Number.isNaN(isNumber)) return <p>Some Error...</p>
	return <User userId={`${imageId}`}/>;
}