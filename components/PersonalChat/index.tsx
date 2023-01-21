import { useAppSelector } from '@/redux/hooks';
import classes from './PersonalChat.module.css';
import React from 'react';
import InfiniteCardComponent from '@/v2/common/InfiniteCard';
import {
	getDatabase,
	ref,
	get,
	query,
	startAt,
	endAt,
	endBefore,
	limitToLast,
	limitToFirst,
	orderByChild
} from 'firebase/database';
import { dbPaths } from '@/firebase/constants';
import app from '@/utils/fe/apis/services/firebase';

const db = getDatabase(app);
const formMessagesPath = (isProd: boolean) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.userMessages}`;

const ChatWindow = () => {
	const { isAdmin } = useAppSelector((state) => state.navigation);
	const [limit, setLimit] = React.useState(100);

	React.useEffect(() => {
		const path = formMessagesPath(process.env.NODE_ENV === 'production');
		console.log(path);
		get(query(ref(db, path), orderByChild('lastModified'))).then((snapshot) => {
			if (snapshot.exists()) {
				const res = snapshot.val();
				console.log(res);
			}
		});
	}, []);
	return isAdmin ? (
		<InfiniteCardComponent
			onReachedBottomCallback={() => alert('On Bottom')}
			onReachedTopCallback={() => alert('On Top')}
			Component={
				<div className={classes.ChatWindow}>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
					<div className={classes.MessageSection}>
						<h1>Email: activity.schoolsh2@gmail.com</h1>
						<h2>
							Latest Message: Hey there, Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Necessitatibus veniam officia tenetur adipisci minima
							molestiae possimus temporibus alias totam voluptas quasi consequuntur ad
							nobis sint quaerat, consectetur at. Nihil, ad!
						</h2>
					</div>
				</div>
			}
		/>
	) : (
		<div>404: Not Found!</div>
	);
};
export default ChatWindow;
