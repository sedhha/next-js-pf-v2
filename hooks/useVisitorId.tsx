import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const useVisitorId = () => {
	const [visitorId, setVisitorId] = useState<string | null>(null);

	useEffect(() => {
		alert('Visitor ID = ' + FingerprintJS);
		try {
			const fpPromise = FingerprintJS.load();
			fpPromise
				.then((fp) => fp.get())
				.then((result) => {
					const currentVisitorId = result.visitorId;
					setVisitorId(currentVisitorId);
					alert('Visitor ID = ' + currentVisitorId);
				})
				.catch((err) => {
					console.error('Fp Visitor Not Supported - ', err.message);
					setVisitorId('Fp-Visitor-NotSupported');
				});
		} catch (error) {
			console.error('Fp Visitor Not Supported - ', error);
			setVisitorId('Fp-Visitor-NotSupported');
		}
	}, []);

	return visitorId;
};

export default useVisitorId;
