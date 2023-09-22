import React, { createContext } from "react";
import useLocalStorage from "hooks/useLocalStorage";
// project import
import defaultConfig from "config";

// types
import { CustomizationProps } from "types/config";

// initial state
const initialState: CustomizationProps = {
	...defaultConfig,
	onChangeLocale: () => {},
	onChangeCurrency: () => {},
	onChangeDateFormat: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext<CustomizationProps>(initialState);

type ConfigProviderProps = {
	children: React.ReactNode;
};

const ConfigProvider = ({ children }: ConfigProviderProps) => {
	const [config, setConfig] = useLocalStorage("wolf-config", {
		locale: initialState.locale,
		currency: initialState.currency,
		dateFormat: initialState.dateFormat
	});

	const onChangeLocale = (locale: string) => {
		setConfig({
			...config,
			locale
		});
	};
	const onChangeCurrency = (currency: string) => {
		setConfig({
			...config,
			currency
		});
	};
	const onChangeDateFormat = (dateFormat: string) => {
		setConfig({
			...config,
			dateFormat
		});
	};

	return (
		<ConfigContext.Provider
			value={{
				...config,
				onChangeLocale,
				onChangeCurrency,
				onChangeDateFormat
			}}
		>
			{children}
		</ConfigContext.Provider>
	);
};

export { ConfigProvider, ConfigContext };
