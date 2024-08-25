const fs = require('fs');
const readline = require('readline');
const XLSX = require('xlsx');

// Path to the file
const filePath = 'fake-account-yes24.txt';

// Create a read stream and interface for reading the file line by line
const fileStream = fs.createReadStream(filePath);
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

function toString(no, id, name, familyPayNo, gb, nickName, blogUrl, cartNo, memAge) {

    return `${no}\`${id}\`${name}\`${familyPayNo}\`${gb}\`${nickName}\`${blogUrl}\`${cartNo}\`${memAge}\`MuevKTWec3BM9uxooELeaKf46apHe+929LjLOzeKaDQlNHwBf/IsJeQoAa3g7684cNJSLhOOGeyGYioCEu+5Yg==\`ch/tvSu9wRXgGLC/9j+3Ib+Jwc4oW+JAKuCMYUMg3FSH01dz8T/uQuCf8BpjMHAv3L9tHbnQjKxDFA0VuPfCfHSP0HZvH7f0iJrfxypP0JgzsyhuO55Oz6QU4GGT7qGXZNiz+wVsNhcCYqD7A8os8xwwNhLvyYs9IvyY8liknfk=\`klemf+rikmm8BrzTp8XP1g==`;
}

function encodeWithString(ecdString) {
    if (!ecdString) {
        return "Null";
    }

    let text = "";
    ecdString = ecdString.replace(/%2F/g, "/");
    ecdString = ecdString.replace(/%3D/g, "=");
    ecdString = ecdString.replace(/%2B/g, "+");

    try {
        const bytes = Buffer.from(ecdString, 'utf8');
        return bytes.toString('base64');
    } catch (error) {
        throw error;
    }
}


// Create the workbook and worksheet before the loop
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet([]);

// Array to store all rows
const rows = [];

rl.on('line', (line) => {
    const [no, id, name, payno, gb, nickname, blog, cartNo, memAge] = line.split(',').map(item => item.replace(/"/g, ''));
    const fakeAccountString = toString(no, id, name, payno, gb, nickname, blog, cartNo, memAge);
    const encodedString = encodeWithString(fakeAccountString);

    // Add the row to the rows array
    rows.push({ no, id, name, payno, gb, nickname, blog, cartNo, memAge, ServiceCookies: encodedString });
});

rl.on('close', () => {
    // After all lines are processed, update the worksheet with the rows
    XLSX.utils.sheet_add_json(worksheet, rows, { skipHeader: false, origin: 'A1' });

    // Append the worksheet to the workbook and write it to a file
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'output-cookie-yes24.xlsx', { bookType: 'xlsx', type: 'binary' });

    console.log('Data written to output-cookie-yes24.xlsx');
});