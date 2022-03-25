import got from 'got';
import fs from 'fs-extra';
import path from 'path';
import { Client as FigmaClient } from 'figma-js';
import PQueue from 'p-queue';
import dotenv from 'dotenv';
import Case from 'case';

dotenv.config();

const { ensureDir, emptyDir, writeFile } = fs;
const { join } = path;
const FIGMA_TOKEN = '347722-17b8fd11-8852-4ea9-8ae8-72ecf25d1d5f';
const FIGMA_FILE_URL =
    'https://www.figma.com/file/K5RloQ7TdUhsbeCcoTDCcR/%40gde%2Ficons?node-id=0%3A1';
console.log(FIGMA_TOKEN, FIGMA_FILE_URL);

const options = Object.assign(
    {
        format: 'svg',
        outputDir: './packages/icons/src',
        scale: '1',
    },
    getArgs(),
);

if (!FIGMA_TOKEN) {
    throw Error('Cannot find FIGMA_TOKEN key in process.');
}
const client = FigmaClient({
    personalAccessToken: FIGMA_TOKEN,
});

// Fail is there's no figma file key
let fileId = null;
if (!fileId) {
    try {
        fileId = FIGMA_FILE_URL.match(/file\/([a-z0-9]+)\//i)[1];
    } catch (e) {
        throw Error('Cannot find FIGMA_FILE_URL key in process.');
    }
}

console.log(`Exporting ${FIGMA_FILE_URL} components.`);

client
    .file(fileId)
    .then(({ data }) => {
        console.log(data);
        console.log('Processing response');
        const components = {};
        data.document.children.forEach(check);
        if (Object.values(components).length <= 0) {
            throw Error('No components found!');
        }
        console.log(`${Object.values(components).length} components found in the figma file.`);
        return components;
        function check(c) {
            if (c.type === 'COMPONENT') {
                console.log('🚀 ~ check ~ c', c);
                const { name, id } = c;
                const { description = '', key } = data.components[c.id];
                const { width, height } = c.absoluteBoundingBox;

                components[id] = {
                    name,
                    id,
                    key,
                    file: fileId,
                    description,
                    width,
                    height,
                };
            } else if (c.children) {
                c.children.forEach(check);
            }
        }
    })
    .then((components) => {
        console.log('components', components);
        console.log('Getting export urls.');
        return client
            .fileImages(fileId, {
                format: options.format,
                ids: Object.keys(components),
                scale: options.scale,
            })
            .then(({ data }) => {
                for (const id of Object.keys(data.images)) {
                    components[id].image = data.images[id];
                }
                return components;
            });
    })
    .then((components) => {
        return (
            ensureDir(options.outputDir)
                // .then(() => {
                //     writeFile(
                //         resolve(options.outputDir, 'data.json'),
                //         JSON.stringify(components),
                //         'utf8',
                //     );
                // })
                .then(() => {
                    emptyDir(join(options.outputDir));
                })
                .then(() => components)
        );
    })
    .then((components) => {
        const contentTypes = {
            svg: 'image/svg+xml',
            png: 'image/png',
            jpg: 'image/jpeg',
        };
        return queueTasks(
            Object.values(components).map((component) => () => {
                const outputName = `${component.name}`.toLowerCase().replace(/_/g, '-');
                const pascalOutputName = Case.pascal(outputName);
                return got
                    .get(component.image, {
                        headers: {
                            'Content-Type': contentTypes[options.format],
                        },
                        encoding: options.format === 'svg' ? 'utf8' : null,
                    })
                    .then((response) => {
                        return ensureDir(join(options.outputDir, 'components')).then(() => {
                            const content = handleSvgContent(response.body);
                            // writeFile(
                            //     join(
                            //         options.outputDir,
                            //         options.format,
                            //         `${pascalOutputName}.${options.format}`,
                            //     ),
                            //     content,
                            //     options.format === 'svg' ? 'utf8' : 'binary',
                            // );
                            options.format === 'svg' &&
                                writeFile(
                                    join(options.outputDir, 'components', `${outputName}.vue`),
                                    getElementCode(outputName, content),
                                    'utf8',
                                );
                            appendToIndex({ ComponentName: pascalOutputName, name: outputName });
                        });
                    });
            }),
        );
    })
    .catch((error) => {
        throw Error(`Error fetching components from Figma: ${error}`);
    });

function queueTasks(tasks, options) {
    const queue = new PQueue(Object.assign({ concurrency: 3 }, options));
    for (const task of tasks) {
        queue.add(task);
    }
    queue.start();
    return queue.onIdle();
}

function getArgs() {
    const args = {};
    for (const arg of process.argv.slice(2)) {
        const [param, value] = arg.split('=');
        args[param] = value;
    }
    return args;
}

// 对svg内容做一些处理
function handleSvgContent(content) {
    // 去除svg的fill内容
    const reg = /fill=".+?"/gi;
    content = content.replace(reg, '');
    // content = content.replace(/width=".+?"/gi, ':width="size"');
    // content = content.replace(/height=".+?"/gi, ':height="size"');
    content = content.replace(
        /<svg/gi,
        '<svg class="gde-icon" aria-hidden="true" v-on="$listeners"',
    );
    return content;
}

function getElementCode(name, svgCode) {
    return `
<template>
    ${svgCode}
</template>
<script>
export default {
    name: '${name}',
};
</script>
<style>
.gde-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
}
</style>`;
}

function appendToIndex({ ComponentName, name }) {
    const exportString = `export { default as ${ComponentName} } from './components/${name}.vue';\r\n`;
    fs.appendFileSync(join(options.outputDir, 'index.js'), exportString, 'utf-8');
}
