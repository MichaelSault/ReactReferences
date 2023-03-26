const toBase64 = obj => {
    // converts the obj to a string
    const str = JSON.stringify (obj);
    // returns string converted to base64
    return Buffer.from(str).toString ('base64');
 };

const replaceSpecialChars = b64string => {
    // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
    return b64string.replace (/[=+/]/g, charToBeReplaced => {
        switch (charToBeReplaced) {
            case '=':
                return '';
            case '+':
                return '-';
            case '/':
                return '_';
        }
    });
};

// generate the jwt header
const header = {
    alg: 'HS256',
    typ: 'JWT',
};

const b64Header = toBase64 (header);
const jwtB64Header = replaceSpecialChars(b64Header);

console.log ("the header is: ", jwtB64Header); 
//OUTPUTS the header is: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

//generates a sample payload
const payload = {
    iss: 'data_dog',    //name of the server that issued the token
    exp: 60*60*24,      // sets to expire in 24hours
    
    // example user
    name: 'James Mitchell',
    email: 'jmitchell@mail.com',
    registered: true,
};

// converts payload to base64
const b64Payload = toBase64 (payload);
const jwtB64Payload = replaceSpecialChars (b64Payload);

console.log ("the payload is: ", jwtB64Payload);
//OUTPUTS the payload is:     eyJpc3MiOiJkYXRhX2RvZyIsImV4cCI6ODY0MDAsIm5hbWUiOiJKYW1lcyBNaXRjaGVsbCIsImVtYWlsIjoiam1pdGNoZWxsQG1haWwuY29tIiwicmVnaXN0ZXJlZCI6dHJ1ZX0

