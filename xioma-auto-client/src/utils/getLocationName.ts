import axios from 'axios'

export const getLocationName = async (latitude: number, longitude: number) => {
	try {
		const response = await axios.get(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
		);
		if (response?.data && response?.data?.display_name) {
			return response.data.display_name;
		} else {
			console.error('No results found for location');
			return '';
		}
	} catch (error) {
		console.error('Error fetching location name', error);
		return '';
	}
};