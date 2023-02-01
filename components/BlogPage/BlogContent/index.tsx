import PostHeader from './header';
import classes from './BlogContent.module.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { feFetch } from '@/utils/fe/fetch-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import { IContentfulBlog } from '@/interfaces/contentful';

const BlogPost = () => {
	const router = useRouter();
	const { blogID, category } = router.query;
	const [title, setTitle] = useState('Welcome to NEXT JS');
	const [featuredImage, setFeaturedImage] = useState('/sample.png');
	const [markdown, setMarkdown] = useState('');
	const [excerpt, setExcerpt] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('/sample.png');

	useEffect(() => {
		if (blogID && category) {
			feFetch<IContentfulBlog>({
				url: `${PUBLIC_APIS.BLOG}?blogID=${blogID}&category=${category}`
			}).then((res) => {
				if (res.status === 200 && res.json) {
					const {
						title,
						content,
						author: { authorName, avatar },
						excerpt,
						primaryImage: { url }
					} = res.json;
					setTitle(title);
					setFeaturedImage(url);
					setMarkdown(content);
					setExcerpt(excerpt);
					setAuthorName(authorName);
					if (avatar) setAvatarUrl(avatar.url);
				}
			});
		}
	}, [blogID, category]);
	return (
		<article className={classes.content}>
			<PostHeader
				title={title}
				featuredImage={featuredImage}
				authorName={authorName}
				excerpt={excerpt}
				authorUrl={avatarUrl}
			/>
			<br />
			<ReactMarkdown className={classes.Markdown} rehypePlugins={[rehypeRaw]}>
				{markdown}
			</ReactMarkdown>
		</article>
	);
};

export default BlogPost;
