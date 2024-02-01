export function formatName(name){
    return name.charAt(0).toUpperCase()+name.slice(1)
}

export function percentDifference(a, b) {
    return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}