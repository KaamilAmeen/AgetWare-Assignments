CipherText = input("Enter Cipher Text: ")
UpperCipherText = CipherText.upper()
ShiftType = input("Enter Shift Type(Right or Left): ")
UpperShiftType = ShiftType.upper()
numberOfShifts = int(input("Enter No. of Shifts: "))
alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
lengthCipherText = len(UpperCipherText)
plainText = ""
for i in UpperCipherText:
    if i in alphabet:
        if (UpperShiftType=="LEFT"):
            indexOfCT = alphabet.index(i)+1
            shift = indexOfCT - numberOfShifts
            if (shift<0):
                shift = 26 - (numberOfShifts-1)
            print(shift)
            plainText += alphabet[shift]
        if (UpperShiftType=="RIGHT"):
            indexOfCT = alphabet.index(i)+1
            shift = indexOfCT + (numberOfShifts-1)
            if (shift>26):
                shift = 0 + (numberOfShifts-1)
            print(shift)
            plainText += alphabet[shift]
print(plainText)
    

