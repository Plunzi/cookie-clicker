export function formatCookies(value: number): { formatedCookies: string, numberType: string } {
    if (value < 1000) {
        return { formatedCookies: value.toString(), numberType: '' };
    }

    const suffixes = [
        '', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', 
        ' quintillion', ' sextillion', ' septillion', ' octillion', ' nonillion',
        ' decillion', ' undecillion', ' duodecillion', ' tredecillion', ' quattuordecillion',
        ' quindecillion', ' sexdecillion', ' septendecillion', ' octodecillion', ' novemdecillion',
        ' vigintillion', ' unvigintillion', ' duovigintillion', ' tresvigintillion', ' quattuorvigintillion',
        ' quinvigintillion', ' sesvigintillion', ' septenvigintillion', ' octovigintillion', ' novemvigintillion',
        ' trigintillion', ' untrigintillion', ' duotrigintillion', ' trestrigintillion', ' quattuortrigintillion',
        ' quintrigintillion', ' sestrigintillion', ' septentrigintillion', ' octotrigintillion', ' novemtrigintillion',
        ' quadragintillion', ' unquadragintillion', ' duoquadragintillion', ' tresquadragintillion', ' quattuorquadragintillion',
        ' quinquadragintillion', ' sesquadragintillion', ' septenquadragintillion', ' octoquadragintillion', ' novemquadragintillion',
        ' quinquagintillion', ' unquinquagintillion', ' duoquinquagintillion', ' tresquinquagintillion', ' quattuorquinquagintillion',
        ' quinquinquagintillion', ' sesquinquagintillion', ' septenquinquagintillion', ' octoquinquagintillion', ' novemquinquagintillion',
        ' sexagintillion', ' unsexagintillion', ' duosexagintillion', ' tresexagintillion', ' quattuorsexagintillion'
    ];
    let suffixIndex = 0;
    let formattedValue = value;

    while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
        formattedValue /= 1000;
        suffixIndex++;
    }

    return { formatedCookies: formattedValue.toFixed(3), numberType: `${suffixes[suffixIndex]}`};
}