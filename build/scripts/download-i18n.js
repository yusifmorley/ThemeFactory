"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const unzipper_1 = require("unzipper");
const node_fetch_1 = __importDefault(require("node-fetch"));
const LOKALISE_API_TOKEN = '25080e24f2b5608c1137c735b62860b8dde17fdb'; // Read-only
const LOKALISE_PROJECT_ID = '188240255de857128aa437.31917744';
const download = async () => {
    const downloadResponse = await node_fetch_1.default(`https://api.lokalise.com/api2/projects/${LOKALISE_PROJECT_ID}/files/download`, {
        method: 'POST',
        headers: {
            'X-Api-Token': LOKALISE_API_TOKEN,
        },
        body: JSON.stringify({
            all_platforms: true,
            bundle_structure: '%LANG_ISO%.%FORMAT%',
            export_empty_as: 'skip',
            export_sort: 'first_added',
            filter_data: ['reviewed_only'],
            format: 'json',
            language_mapping: [
                {
                    original_language_iso: 'hi_IN',
                    custom_language_iso: 'hi',
                },
            ],
            original_filenames: false,
            replace_breaks: false,
        }),
    });
    const { bundle_url } = await downloadResponse.json();
    const zipResponse = await node_fetch_1.default(bundle_url);
    const zip = await zipResponse.buffer();
    const { files } = await unzipper_1.Open.buffer(zip);
    const i18nDir = path_1.default.join(__dirname, '../../i18n');
    try {
        fs_1.default.mkdirSync(i18nDir);
    }
    catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
    await Promise.all(files.map(file => {
        return new Promise((resolve, reject) => {
            if (file.type !== 'File') {
                return resolve();
            }
            const filePath = path_1.default.join(i18nDir, file.path);
            file.buffer().then(buffer => {
                fs_1.default.writeFile(filePath, buffer, error => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                });
            });
        });
    }));
};
if (require.main === module) {
    download();
}
exports.default = download;
