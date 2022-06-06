import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
	Calendar as CustomCalendar,
	LocaleConfig
} from 'react-native-calendars';
import { useTheme } from 'styled-components/native';
LocaleConfig.locales['pt-br'] = {
	monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
	dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
	dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
	today: 'Hoje',
}

LocaleConfig.defaultLocale = 'pt-br';

export default function Calendar() {
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
		/>
	);
}
