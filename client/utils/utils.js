export const formatOtp = value => {
	if (!value) return value;
	return value.replace(/[^0-9]+/gi, '');
};