import * as React from 'react';
import { LocaleConfig, Calendar as RNCalendar } from 'react-native-calendars';
import { useColorScheme } from '~/hooks';
import { COLORS } from '~/lib/constants';

// TODO: create custom native calendar
// TODO: create web component, use https://ui.shadcn.com/docs/components/calendar

/**
 * @docs https://github.com/wix/react-native-calendars
 */
function Calendar({
  theme,
  ...props
}: React.ComponentProps<typeof RNCalendar>) {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const id = React.useId();

  return (
    <RNCalendar
      key={`${id}-${colorScheme}`}
      theme={getTheme(isDarkColorScheme, theme)}
      {...props}
    />
  );
}

const SKY_500 = '#0ea5e9';
const SKY_600 = '#0284c7';

function getTheme(
  isThemeDark: boolean,
  customTheme?: React.ComponentProps<typeof RNCalendar>['theme']
): React.ComponentProps<typeof RNCalendar>['theme'] {
  if (isThemeDark) {
    return {
      backgroundColor: COLORS.dark.background,
      calendarBackground: COLORS.dark.card,
      textSectionTitleColor: COLORS.dark.text,
      selectedDayBackgroundColor: SKY_500,
      selectedDayTextColor: '#000000',
      todayTextColor: SKY_500,
      dayTextColor: COLORS.dark.text,
      textDisabledColor: '#ffffff30',
      monthTextColor: COLORS.dark.text,
      textMonthFontWeight: '500',
      arrowColor: SKY_500,
      ...customTheme
    };
  }
  return {
    backgroundColor: COLORS.light.background,
    calendarBackground: COLORS.light.card,
    textSectionTitleColor: COLORS.light.text,
    selectedDayBackgroundColor: SKY_600,
    selectedDayTextColor: '#ffffff',
    todayTextColor: SKY_600,
    dayTextColor: '#2d4150',
    monthTextColor: COLORS.light.text,
    textMonthFontWeight: '500',
    arrowColor: SKY_600,
    ...customTheme
  };
}

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Septemeber',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  today: 'Today'
};

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.'
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

export { Calendar, LocaleConfig };
