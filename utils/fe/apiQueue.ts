type RequestUrl = Record<string, number>;
class ApiQueue {
	requests: RequestUrl;
	constructor() {
		this.requests = {};
	}
	enQueueRequest(url: string): void {
		this.requests[url] = (this.requests[url] ?? 0) + 1;
	}
	deQueueRequest(url: string): void {
		if (!this.requests[url]) return;
		this.requests[url] = this.requests[url] ? this.requests[url] - 1 : 0;
		if (this.requests[url] === 0) delete this.requests[url];
	}
	shouldWait(url: string): { shouldWait: boolean; waitTime: number } {
		return {
			shouldWait: this.requests[url] != null,
			waitTime: Math.pow(2, this.requests[url] ?? 0) * 2000
		};
	}
}
const apiQueue = new ApiQueue();
export default apiQueue;
