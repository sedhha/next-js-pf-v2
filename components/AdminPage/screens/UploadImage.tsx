import { useAppSelector } from '@/redux/hooks';
import { ADMIN_APIS } from '@/utils/fe/apis/public';
import { feFetch } from '@/utils/fe/fetch-utils';
import { useState } from 'react';

const UploadImage = () => {
	const { isAdmin, idToken } = useAppSelector((state) => state.navigation);
	const [json, setJSON] = useState('[]');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const onUploadImage = () => {
		if (isAdmin && idToken && !loading) {
			setLoading(true);
			feFetch({
				url: `${ADMIN_APIS.UPLOAD_IMAGES}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${idToken}`
				},
				body: JSON.stringify(json)
			})
				.then((res) => {
					if (res.error) {
						setError(res.message ?? 'Unknown Error');
						setSuccess(null);
					} else {
						setSuccess('Uploaded All Images');
						setError(null);
					}
				})
				.finally(() => setLoading(false));
		}
	};
	return (
		<>
			<textarea
				onChange={(e) => setJSON(e.target.value)}
				rows={10}
				value={json}
			></textarea>
			{loading && <p>Uploading... Please Wait</p>}
			{!loading && error ? <p>Error Occured: {error}</p> : null}
			{!loading && success ? <p>Success: {success}</p> : null}
			<button onClick={onUploadImage}>Upload Images</button>
		</>
	);
};

export default UploadImage;
