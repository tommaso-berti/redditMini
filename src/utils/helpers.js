function parseDateFromSeconds(date) {
    const newDate = new Date(date * 1000);
    return newDate.toLocaleString();
}

export { parseDateFromSeconds };