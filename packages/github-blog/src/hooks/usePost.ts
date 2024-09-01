import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function useFormatDate(time: Date) {
	const publishedDateFormatted = format(time, "d 'de' LLLL 'às' HH:mm'h'", {
		locale: ptBR
	});
	const publishedDateRelativeToNow = formatDistanceToNow(time, {
		locale: ptBR,
		addSuffix: true
	});
	return [publishedDateFormatted, publishedDateRelativeToNow];
}
