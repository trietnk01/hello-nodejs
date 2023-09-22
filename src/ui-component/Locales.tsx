import React, { useEffect, useState } from "react";

// third-party
import useConfig from "hooks/useConfig";
import { IntlProvider, MessageFormatElement } from "react-intl";

// load locales files
const loadLocaleData = (locale: string) => {
	switch (locale) {
		case "vi":
			return import("utils/locales/vi.json");
		default:
			return import("utils/locales/en.json");
	}
};

// ==============================|| LOCALIZATION ||============================== //

interface LocalsProps {
	children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
	const { locale } = useConfig();
	const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

	useEffect(() => {
		loadLocaleData(locale).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
			setMessages(d.default);
		});
	}, [locale]);

	return (
		<React.Fragment>
			{messages && (
				<IntlProvider locale={locale} defaultLocale="en" messages={messages}>
					{children}
				</IntlProvider>
			)}
		</React.Fragment>
	);
};

export default Locales;
