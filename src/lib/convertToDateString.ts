export default function convertToDateString(date: any) {
    return new Date(date).toISOString().split('T')[0];
}