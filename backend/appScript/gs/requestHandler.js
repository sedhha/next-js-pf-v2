const requestHandler = ({ opType, opProps }) => {
	switch (opType) {
		case 'email': {
			sendEmail(opProps);
			return { error: false, props: opProps };
		}
		default:
			return { error: true, message: 'Unknown Request' };
	}
};
