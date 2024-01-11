module.exports = () => {
	const data = { clients: [] };
	for (let x = 0; x < 500; x++) {
		data.clients.push({
			id: x + 1,
			likes: x / 5,
			name: `Amigo ${x + 1}`
		});
	}
	return data;
};
