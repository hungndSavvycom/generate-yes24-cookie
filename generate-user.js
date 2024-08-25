const fs = require('fs');
const crypto = require('crypto');
const { faker } = require('@faker-js/faker');
// Helper function to generate random string of a given length
const getRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
};

// Helper function to generate random number within a range
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate random and unique fake account data
const generateFakeAccounts = (numRows) => {
    const accounts = new Set();

    while (accounts.size < numRows) {
        const no = getRandomNumber(100000, 999999).toString();
        const id = getRandomString(10);
        const name = faker.person.fullName();
        const payno = getRandomNumber(0, 1).toString();
        const gb = getRandomNumber(0, 1).toString();
        const nickname = faker.internet.userName();
        const blog = faker.internet.domainName();
        const cartNo = no;
        const memAge = getRandomNumber(20, 60).toString();

        const account = `"${no}","${id}","${name}","${payno}","${gb}","${nickname}","${blog}","${cartNo}","${memAge}"`;

        accounts.add(account);
    }

    return Array.from(accounts);
};

const saveToFile = (filename, accounts) => {
    fs.writeFileSync(filename, accounts.join('\n'), 'utf8');
    console.log(`Data saved to ${filename}`);
};

const numRows = 1000;  // Specify the number of rows you want to generate
const fakeAccounts = generateFakeAccounts(numRows);
saveToFile('fake-account-yes24.txt', fakeAccounts);