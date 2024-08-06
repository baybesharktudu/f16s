export function startTime() {
    const result = setTimeout(() => {}, 2000);
    clearTimeout(result);
}
