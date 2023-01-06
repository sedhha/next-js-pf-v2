import React from 'react';
import classes from './TechStack.module.css';
import Icon, { icons } from '@/v2/common/Icons';
import LazyImage from '@/v2/common/LazyImage';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { println } from '@/utils/dev-utils';

export default function TechStack() {
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('TechStack Visibility')}
			Component={
				<section className={classes.BodyModule} id={attributes.TechStack}>
					<div className={classes.IntroHeader}>
						<h1>My Tech Stack</h1>
						<div className={classes.SearchWidget}>
							<input className={classes.SearchInput} />
							<Icon iconKey={icons.AiOutlineSearch} className={classes.Icon} />
						</div>
					</div>
					<div className={classes.StackCards}>
						<React.Fragment>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
						</React.Fragment>
						<React.Fragment>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
						</React.Fragment>
						<React.Fragment>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
						</React.Fragment>
						<React.Fragment>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
							<div className={classes.Card}>
								<LazyImage src={'/next-ts.png'} />
								<h4>Next JS</h4>
								<div className={classes.Rating}>
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="true" />
									<Icon iconKey={icons.AiFillStar} is-active="false" />
								</div>
							</div>
						</React.Fragment>
					</div>
				</section>
			}
		/>
	);
}
