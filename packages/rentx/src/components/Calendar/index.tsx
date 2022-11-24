import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import {
	Calendar as CustomCalendar,
	LocaleConfig,
	DateCallbackHandler
} from 'react-native-calendars';

import { ptBr } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

export interface DayProps {
	dateString: string;
	day: number;
	month: number;
	year: number;
	timestamp: number;
}
export interface MarkedDateProps {
	[date: string]: {
		color: string;
		textColor: string;
		disabled?: boolean;
		disabledTouches?: boolean;
	}
}

export interface CalendarProps {
	markedDates: MarkedDateProps;
	onDayPress: DateCallbackHandler;
}


export default function Calendar({ markedDates, onDayPress }: CalendarProps) {
	const theme = useTheme();

	return (
		<CustomCalendar
			renderArrow={(direction) =>
				<Feather
					name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
					size={32}
					color={theme.colors.text}
				/>
			}
			headerStyle={{
				backgroundColor: theme.colors.background_secondary,
				borderBottomWidth: .5,
				borderBottomColor: theme.colors.text_detail,
				paddingBottom: 10,
				marginBottom: 10
			}}
			theme={{
				textDayFontFamily: theme.fonts.primary_400,
				textDayHeaderFontFamily: theme.fonts.primary_500,
				textDayHeaderFontSize: 10,
				textMonthFontSize: 20,
				textMonthFontFamily: theme.fonts.secondary_600,
				monthTextColor: theme.colors.title,
				arrowStyle: {
					marginHorizontal: -15
				}
			}}
			firstDay={1}
			minDate={String(new Date())}
			markingType="period"
			markedDates={markedDates}
			onDayPress={onDayPress}
		/>
	);
}
