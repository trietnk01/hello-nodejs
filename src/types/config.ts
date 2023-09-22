export type ConfigProps = {
	locale: string;
	currency: string;
	dateFormat: string;
};

export type CustomizationProps = {
	locale: string;
	currency: string;
	dateFormat: string;
	onChangeLocale: (locale: string) => void;
	onChangeCurrency: (currency: string) => void;
	onChangeDateFormat: (dateFormat: string) => void;
};
