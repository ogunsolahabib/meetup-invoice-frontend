export default function convertToDateString(date: any) {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
}