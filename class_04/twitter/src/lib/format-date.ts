export function formatDate(createdAt: string): string {
	const now = new Date();
	const diffInSeconds = Math.floor(
		(now.getTime() - new Date(createdAt).getTime()) / 1000
	);

	const secondsInMinute = 60;
	const secondsInHour = 60 * secondsInMinute;
	const secondsInDay = 24 * secondsInHour;
	const secondsInYear = 365 * secondsInDay;

	if (diffInSeconds < secondsInMinute) {
		return `${diffInSeconds}s`;
	} else if (diffInSeconds < secondsInHour) {
		const minutes = Math.floor(diffInSeconds / secondsInMinute);
		return `${minutes}m`;
	} else if (diffInSeconds < secondsInDay) {
		const hours = Math.floor(diffInSeconds / secondsInHour);
		return `${hours}h`;
	} else if (diffInSeconds < secondsInYear) {
		const createdAtDate = new Date(createdAt);
		const options: Intl.DateTimeFormatOptions = {
			month: 'short',
			day: 'numeric',
		};
		return createdAtDate.toLocaleDateString('en-US', options);
	} else {
		const createdAtDate = new Date(createdAt);
		const options: Intl.DateTimeFormatOptions = {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		};
		return createdAtDate.toLocaleDateString('en-US', options);
	}
}
