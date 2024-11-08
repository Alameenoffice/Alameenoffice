const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors()); // لتمكين الطلبات من المتصفح
app.use(express.json());

// دالة لتحميل ملف Excel
function loadExcelData() {
    const filePath = path.join(__dirname, 'data.xlsx'); // تأكد من أن اسم الملف صحيح
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // افترض أن البيانات في الورقة الأولى
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
}

// نقطة النهاية للبحث عن الأسماء
app.get('/search', (req, res) => {
    const nameQuery = req.query.name.toLowerCase();
    const data = loadExcelData();
    const results = data.filter(item => item.Name && item.Name.toLowerCase().includes(nameQuery));
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});