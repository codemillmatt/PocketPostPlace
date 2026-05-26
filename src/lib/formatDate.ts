const dateFormatter = new Intl.DateTimeFormat('en', {
	dateStyle: 'long',
});

export function formatDate(value: Date) {
	return dateFormatter.format(value);
}
