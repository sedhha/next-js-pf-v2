import React from 'react';
import classes from './TechStack.module.css';
import Icon, { icons } from '@/v2/common/Icons';
import LazyImage from '@/v2/common/LazyImage';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { println } from '@/utils/dev-utils';
import techStacks from '@/constants/cms-constants/tech-stacks.json';
import { useAppDispatch } from '@/redux/hooks';
import { updatePopup } from '@/slices/navigation.slice';
import { feFetch } from '@/utils/fe/fetch-utils';
import { ITotal } from '@/interfaces/api';
import { ITechStack } from '@/interfaces/tech-stack';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import Spinner from '@/v2/common/Spinner';
import Empty from '@/v2/common/Empty';

export default function TechStack() {
	const [search, setSearch] = React.useState('');
	const [lastActiveSearch, setLastActiveSearch] = React.useState('');
	const dispatch = useAppDispatch();
	const [loading, setLoading] = React.useState(false);
	const [cards, setCards] = React.useState(techStacks);
	const onSearch = () => {
		if (loading) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Loading results',
					description: 'Please wait while we load the results!',
					timeout: 3000
				})
			);
			return;
		}
		if (search === '') {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Empty Search!',
					description: 'Empty Tech Stack? Sounds like fun XD',
					timeout: 3000
				})
			);
			return;
		}

		setLoading(true);
		feFetch<ITotal<ITechStack>>({
			url: `${PUBLIC_APIS.TECH_STACK}?search=${search}`
		})
			.then((res) => {
				setLastActiveSearch(search);
				if (!res.error && res.json) setCards(res.json.items);
				if (res.statusCode === 204) setCards([]);
			})
			.finally(() => setLoading(false));
	};
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('TechStack Visibility')}
			Component={
				<section className={classes.BodyModule} id={attributes.TechStack}>
					<div className={classes.IntroHeader}>
						<h1>My Tech Stack</h1>
						<div className={classes.SearchWidget}>
							<input
								className={classes.SearchInput}
								onChange={(e) => setSearch(e.target.value)}
								value={search}
							/>
							<Icon
								iconKey={icons.AiOutlineSearch}
								className={classes.Icon}
								onClick={onSearch}
							/>
						</div>
					</div>
					<div className={classes.StackCards}>
						{loading && <Spinner />}
						{cards.map((item, index) => (
							<div className={classes.Card} key={index}>
								<LazyImage src={item.thumbnail} />
								<h4>{item.name}</h4>
								<div className={classes.Rating}>
									<Icon
										iconKey={icons.AiFillStar}
										is-active={item.rating > 0 ? 'true' : 'false'}
									/>
									<Icon
										iconKey={icons.AiFillStar}
										is-active={item.rating > 1 ? 'true' : 'false'}
									/>
									<Icon
										iconKey={icons.AiFillStar}
										is-active={item.rating > 2 ? 'true' : 'false'}
									/>
									<Icon
										iconKey={icons.AiFillStar}
										is-active={item.rating > 3 ? 'true' : 'false'}
									/>
									<Icon
										iconKey={icons.AiFillStar}
										is-active={item.rating > 4 ? 'true' : 'false'}
									/>
								</div>
							</div>
						))}
					</div>
					{cards.length === 0 && (
						<Empty
							imgClass={classes.Img}
							message={`I am yet to explore '${lastActiveSearch}' as a skill. :) `}
						/>
					)}
				</section>
			}
		/>
	);
}
