const months = {
    'january|jan': '01',
    'february|feb': '02',
    'march|mar': '03',
    'april|apr': '04',
    'may': '05',
    'june|jun': '06',
    'july|jul': '07',
    'august|aug': '08',
    'september|sep': '09',
    'october|oct': '10',
    'november|nov': '11',
    'december|dec': '12',
}

const seasons = {
    'spring|spr': '21',
    'summer|summ|sum': '22',
    'autumn|aut|fall|fal': '23',
    'winter|wint|win': '24',   
}

const descriptors = {
    '(\\d.*)to(.*\\d)': '$1/$2',
    'around|about|abt|estimated|est|circa|approximately|approx': '~',
}

export {
    months,
    seasons,
    descriptors,
}