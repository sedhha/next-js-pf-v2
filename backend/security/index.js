import crypto from 'crypto';
const deleteMillis = 3600 * 1000;
class Security {
	constructor() {
		this.activeSessions = {};
	}
	getSession(session, ua) {
		const currentSession = this.activeSessions[session];
		console.log(this.activeSessions, this.activeSessions[session], session);
		if (!currentSession) return;
		if (ua !== currentSession.ua) return;
		return currentSession;
	}
	addSession(ua) {
		const session = crypto.randomUUID();
		this.activeSessions[session] = {
			ua
		};
		setTimeout(() => {
			this.removeSession(session);
		}, deleteMillis);
		return session;
	}
	removeSession(session) {
		delete this.activeSessions[session];
	}
	static getInstance() {
		if (!Security.instance) {
			Security.instance = new Security();
		}
		console.log('Security instance', Security.instance);
		return Security.instance;
	}
}

const security = Security.getInstance();
export default security;
