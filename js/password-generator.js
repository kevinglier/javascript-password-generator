function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function PasswordGenerator() {

    var that = this;

    const asciiRanges = {
        numbers: [48, 57],
        uppercase: [65, 90],
        lowercase: [97, 122],
        specialChars: [33, 47]
    };

    function getCharacterFromRange(rangeName) {
        return String.fromCharCode(getRndInteger(asciiRanges[rangeName][0], asciiRanges[rangeName][1]));
    }

    function getRandomChars(passwordSettings) {

        var chars = [];

        var charTypeSum = Object.values(passwordSettings.requiredCharacterTypes).reduce((a, b) => a + b, 0);
        if (charTypeSum > passwordSettings.length) {
            throw "The sum of the required character types exceeds the requested length of the password.";
        }

        if (charTypeSum < passwordSettings.length) {
            var keys = Object.keys(passwordSettings.requiredCharacterTypes);
            for (var i = charTypeSum; i <= passwordSettings.length; i++) {
                passwordSettings.requiredCharacterTypes[keys[getRndInteger(0, keys.length)]] += 1;
            }
        }

        for (var key in passwordSettings.requiredCharacterTypes) {
            var charsOfTypeLength = passwordSettings.requiredCharacterTypes[key];
            for (y = 0; y < charsOfTypeLength; y++) {

                var char = getCharacterFromRange(key);
                chars.push(char);

                passwordSettings.requiredCharacterTypes[key]--;
            }
        }

        return chars;
    }

    function getPasswordFromChars(chars) {

        var password = [];
        while (chars.length > 0) {
            var index = getRndInteger(0, chars.length);
            var char = chars[index];
            password.push(char);
            chars.splice(index, 1);
        }

        return password.join('');
    }

    this.generatePassword = function(length=10, minNumbers=2, minUppercase=2, minLowercase=2, minSpecialChars=2) {
        passwordSettings = {
            length: length,
            requiredCharacterTypes: {
                numbers: minNumbers,
                uppercase: minUppercase,
                lowercase: minLowercase,
                specialChars: minSpecialChars
            }
        };

        var chars = getRandomChars(passwordSettings);
        var password = getPasswordFromChars(chars);

        return password;
    }
}