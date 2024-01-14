const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('ru-RU', options);
};


export default formatDate


