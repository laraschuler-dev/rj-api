/**
 * SCRIPT PARA CRIAÇÃO DE ARQUIVOS SQL
 *
 * Este script automatiza a criação de arquivos SQL para mudanças no banco de dados.
 * Gera nomes únicos baseados em data e mantém um registro em JSON.
 */

import fs from 'fs';
import path from 'path';

const slugArg = process.argv[2];
const descriptionArg = process.argv[3] || '';

const slug = slugArg?.toLowerCase().replace(/[^\w\-]/g, '_');

const jsonPath = path.join(__dirname, "sqls", "sqls.json");
const sqlsBasePath = path.join(__dirname, 'sqls');

if (!fs.existsSync(sqlsBasePath)) {
  fs.mkdirSync(sqlsBasePath, { recursive: true });
}

interface SQLRecord {
  name: string;
  updated: boolean;
  description: string;
}

let data: SQLRecord[] = [];

if (fs.existsSync(jsonPath)) {
  const content = fs.readFileSync(jsonPath, 'utf-8');
  try {
    data = JSON.parse(content || '[]') as SQLRecord[];
  } catch (e) {
    console.error('❌ Error reading sqls.json. Check the content.');
    process.exit(1);
  }
}

const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

let newName = currentDate;

if (slug) {
  newName += `_${slug}`;
} else {
  let random: string;
  let attempt = 0;
  do {
    random = Math.floor(Math.random() * 1e8)
      .toString()
      .padStart(8, '0');
    newName = `${currentDate}_${random}`;
    attempt++;
    if (attempt > 10) {
      console.error('❌ Error: Could not generate unique name.');
      process.exit(1);
    }
  } while (data.some((entry) => entry.name === newName));
}

const sqlPath = path.join(sqlsBasePath, `${newName}.sql`);
if (fs.existsSync(sqlPath)) {
  console.error(`❌ File already exists: ${sqlPath}`);
  process.exit(1);
}

data.push({
  name: newName,
  updated: false,
  description: descriptionArg,
});
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

const sqlContent = `-- ${newName}\n\n`;
fs.writeFileSync(sqlPath, sqlContent);

console.log('✅ SQL script created successfully!');
console.log(`📁 Path:  ${sqlPath}`);
console.log(`🧾 Record: ${newName} (updated: false)`);
if (descriptionArg) {
  console.log(`📝 Description: ${descriptionArg}`);
}
