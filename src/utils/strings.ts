export function convertTimestampToTime(timestamp: string) {
    const date = new Date(timestamp);
    const minutes = date.getTime();
    return minutes;
}