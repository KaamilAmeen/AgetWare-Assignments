def format_indian_currency(number):
    number_str = str(number)
    if '.' in number_str:
        whole, decimal = number_str.split('.')
        decimal = '.' + decimal
    else:
        whole = number_str
        decimal = ''

    rev = whole[::-1]
    
    parts = [rev[:3]]
    rev = rev[3:]

    while rev:
        parts.append(rev[:2])
        rev = rev[2:]
    formattedWhole =  ",".join(parts)[::-1]

    return formattedWhole+decimal
    
print(format_indian_currency(123456.78))
