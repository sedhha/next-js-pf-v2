import React from 'react';
import InfiniteContainer from '@/v2/common/InfiniteContainer';
import { useRouter } from 'next/router';
import { ICategoryArticles, InfiniteCardProps } from '@/interfaces/categories';
import { feFetch } from '@/utils/fe/fetch-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis/public';
import { ITotal } from '@/interfaces/api';
import { stdDateFormatter } from '@/utils/date-utils';
import Spinner from '@/v2/common/Spinner';
// const categoryBlogCards = [
// 	{
// 		img: '/sample.png',
// 		authorImg: '/sample.png',
// 		authorName: 'Shivam Sahil',
// 		title: 'Getting Started with Computer Vision - Technology of the Future',
// 		excerpt:
// 			'Image Processing and Computer Vision can be fun and automate lots of manual repetative error prone tasks in your daily life.',
// 		date: '2023-01-08T00:00:00.000+05:30'
// 	},
// 	{
// 		img: '/sample.png',
// 		authorImg: '/sample.png',
// 		authorName: 'Shivam Sahil',
// 		title: 'Getting Started with Computer Vision - Technology of the Future',
// 		excerpt:
// 			'Image Processing and Computer Vision can be fun and automate lots of manual repetative error prone tasks in your daily life.',
// 		date: '2023-01-08T00:00:00.000+05:30'
// 	},
// 	{
// 		img: '/sample.png',
// 		authorImg: '/sample.png',
// 		authorName: 'Shivam Sahil',
// 		title: 'Getting Started with Computer Vision - Technology of the Future',
// 		excerpt:
// 			'Image Processing and Computer Vision can be fun and automate lots of manual repetative error prone tasks in your daily life.',
// 		date: '2023-01-08T00:00:00.000+05:30'
// 	},
// 	{
// 		img: '/sample.png',
// 		authorImg: '/sample.png',
// 		authorName: 'Shivam Sahil',
// 		title: 'Getting Started with Computer Vision - Technology of the Future',
// 		excerpt:
// 			'Image Processing and Computer Vision can be fun and automate lots of manual repetative error prone tasks in your daily life.',
// 		date: '2023-01-08T00:00:00.000+05:30'
// 	},
// 	{
// 		img: '/sample.png',
// 		authorImg: '/sample.png',
// 		authorName: 'Shivam Sahil',
// 		title: 'Getting Started with Computer Vision - Technology of the Future',
// 		excerpt:
// 			'Image Processing and Computer Vision can be fun and automate lots of manual repetative error prone tasks in your daily life.',
// 		date: '2023-01-08T00:00:00.000+05:30'
// 	}
// ];

const transformerFunction = (cards: ICategoryArticles[]): InfiniteCardProps[] =>
	cards.map((card) => ({
		img: card.img,
		avatarImg: card.authorImg,
		avatarTitle: card.authorName,
		title: card.title,
		excerpt: card.excerpt,
		date: stdDateFormatter(card.date)
	}));

const limit = 10;

const CategoryFunction = () => {
	const router = useRouter();
	const { category } = router.query;
	const [total, setTotal] = React.useState<number | null>(null);

	const fetchArticles = React.useCallback(
		(skip: number) =>
			feFetch<ITotal<ICategoryArticles>>({
				url: `${PUBLIC_APIS.CATEGORIES}?limit=${limit}&skip=${skip}&category=${category}`
			}).then((res) => {
				if (!res.error && res.json) {
					setTotal(res.json.total);

					return [...transformerFunction(res.json.items)];
				}
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[category]
	);
	return (
		<InfiniteContainer
			mainHeading={category as string}
			mainHeadingIdentifier={'Category'}
			limit={limit}
			total={total}
			fetchDataCallback={fetchArticles}
		/>
	);
};

export default CategoryFunction;
