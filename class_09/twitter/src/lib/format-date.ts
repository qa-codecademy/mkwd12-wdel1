export function formatDate(createdAt: string | Date): string {
	// We get the current date
	const now = new Date();
	// We convert the createdAt date to a Date object if it's a string
	createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
	// We calculate the difference in seconds between the current date and the createdAt date
	const diffInSeconds = Math.floor(
		(now.getTime() - new Date(createdAt).getTime()) / 1000
	);

	// We define the number of seconds in a minute, hour, day and year
	const secondsInMinute = 60;
	const secondsInHour = 60 * secondsInMinute;
	const secondsInDay = 24 * secondsInHour;
	const secondsInYear = 365 * secondsInDay;

	// If the difference in seconds is less than the number of seconds in a minute, we return the difference in seconds
	if (diffInSeconds < secondsInMinute) {
		return `${diffInSeconds}s`;
		// If the difference in seconds is less than the number of seconds in an hour, we return the difference in minutes
	} else if (diffInSeconds < secondsInHour) {
		const minutes = Math.floor(diffInSeconds / secondsInMinute);
		return `${minutes}m`;
		// If the difference in seconds is less than the number of seconds in a day, we return the difference in hours
	} else if (diffInSeconds < secondsInDay) {
		const hours = Math.floor(diffInSeconds / secondsInHour);
		return `${hours}h`;
		// If the difference in seconds is less than the number of seconds in a year, we return the date in the format of month day
	} else if (diffInSeconds < secondsInYear) {
		const createdAtDate = new Date(createdAt);
		const options: Intl.DateTimeFormatOptions = {
			month: 'short',
			day: 'numeric',
		};
		return createdAtDate.toLocaleDateString('en-US', options);
		// If the difference in seconds is greater than the number of seconds in a year, we return the date in the format of month day year
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
