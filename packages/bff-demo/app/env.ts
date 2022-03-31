import dotenv from 'dotenv-safe';
import fs from 'fs';

const userEnvFile = `${__dirname}/../.env`;
const globalEnvFile = `${__dirname}/../.env.example`;

const envFilePath = fs.existsSync(userEnvFile) ? userEnvFile : globalEnvFile;

// global env
dotenv.load({
    allowEmptyValues: true,
    path: envFilePath,
});
