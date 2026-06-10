export const GLOBAL_PhoneMask = {
    mask: ['+7 (###) ###-##-##'],
    preProcess: v => v.replace(/^.*?(\d)/, (_, d) => d === '8' ? '7' : d)
}