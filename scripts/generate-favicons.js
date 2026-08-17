/**
 * Gera todos os ícones de aba/app a partir do monograma LS.
 * Ver docs/brandbook.md §01.
 *
 * Uso:
 *   npm i sharp --no-save && node scripts/generate-favicons.js
 *
 * `sharp` é dependência só desta rotina — não vale a pena carregá-la no
 * bundle do site, então instale com --no-save e rode sob demanda.
 *
 * Regra de tamanho: nos tiles de 16–48px o mark usa cobre escuro (#8C6248) e
 * respiro menor. No cobre puro, com a margem de 16% dos tamanhos grandes, a
 * serifa fina do monograma desaparece.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const PAPER = "#FAF6F0";
const COPPER = "#B48967";
const COPPER_DARK = "#8C6248";

const source = fs.readFileSync(path.join(PUBLIC, "ls-monogram.svg"), "utf8");
const paths = [...source.matchAll(/<path d="([^"]+)"\/>/g)].map((m) => m[1]);
if (paths.length !== 2) {
    throw new Error(`Esperava 2 paths no monograma, encontrei ${paths.length}`);
}

/** Monta um tile quadrado com o monograma centralizado sobre Papel. */
function tile(size, fill, marginRatio) {
    const innerHeight = size * (1 - 2 * marginRatio);
    const scale = innerHeight / 610;
    const width = 410 * scale;
    const x = (size - width) / 2;
    const y = (size - innerHeight) / 2;

    return Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
            `<rect width="${size}" height="${size}" fill="${PAPER}"/>` +
            `<g transform="translate(${x.toFixed(3)} ${y.toFixed(
                3
            )}) scale(${scale.toFixed(6)}) translate(-308 -207)" fill="${fill}">` +
            `<path d="${paths[0]}"/><path d="${paths[1]}"/>` +
            `</g></svg>`
    );
}

/** Rasteriza com supersample 4x e reduz, para manter a serifa suave. */
const render = (size, fill, margin) =>
    sharp(tile(size, fill, margin), { density: 72 * 4 })
        .resize(size, size)
        .png({ compressionLevel: 9 });

const PNG_TARGETS = [
    ["favicon-16x16.png", 16, COPPER_DARK, 0.04],
    ["favicon-32x32.png", 32, COPPER_DARK, 0.06],
    ["apple-touch-icon.png", 180, COPPER, 0.16],
    ["android-chrome-192x192.png", 192, COPPER, 0.16],
    ["android-chrome-512x512.png", 512, COPPER, 0.16],
    ["mstile-150x150.png", 150, COPPER, 0.16]
];

const ICO_TARGETS = [
    [16, COPPER_DARK, 0.04],
    [32, COPPER_DARK, 0.06],
    [48, COPPER_DARK, 0.08]
];

/** Monta um .ico com PNGs embutidos (formato aceito desde o Vista). */
function buildIco(buffers, sizes) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reservado
    header.writeUInt16LE(1, 2); // tipo: ícone
    header.writeUInt16LE(sizes.length, 4);

    const directory = Buffer.alloc(16 * sizes.length);
    let offset = 6 + 16 * sizes.length;

    sizes.forEach((size, i) => {
        const at = i * 16;
        directory.writeUInt8(size === 256 ? 0 : size, at + 0); // largura
        directory.writeUInt8(size === 256 ? 0 : size, at + 1); // altura
        directory.writeUInt16LE(1, at + 4); // planos de cor
        directory.writeUInt16LE(32, at + 6); // bits por pixel
        directory.writeUInt32LE(buffers[i].length, at + 8);
        directory.writeUInt32LE(offset, at + 12);
        offset += buffers[i].length;
    });

    return Buffer.concat([header, directory, ...buffers]);
}

async function main() {
    for (const [file, size, fill, margin] of PNG_TARGETS) {
        await render(size, fill, margin).toFile(path.join(PUBLIC, file));
        console.log(`✓ public/${file}`);
    }

    const icoBuffers = [];
    for (const [size, fill, margin] of ICO_TARGETS) {
        icoBuffers.push(await render(size, fill, margin).toBuffer());
    }
    fs.writeFileSync(
        path.join(PUBLIC, "favicon.ico"),
        buildIco(icoBuffers, ICO_TARGETS.map(([size]) => size))
    );
    console.log("✓ public/favicon.ico");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
