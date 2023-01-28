import React from 'react';
import InfiniteContainer from '@/v2/common/InfiniteContainer';
import { useRouter } from 'next/router';
import { ICategoryArticles, InfiniteCardProps } from '@/interfaces/categories';
import { feFetch } from '@/utils/fe/fetch-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis/public';
import { ITotal } from '@/interfaces/api';
import { stdDateFormatter } from '@/utils/date-utils';
import { useAppDispatch } from '@/redux/hooks';
import { updateActiveSection } from '@/slices/navigation.slice';
import attributes from '@/constants/header-attr.json';

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
	const dispatch = useAppDispatch();
	const { category } = router.query;
	const [total, setTotal] = React.useState<number | null>(null);

	React.useEffect(() => {
		dispatch(updateActiveSection(attributes.Blog));
	}, [dispatch]);

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
