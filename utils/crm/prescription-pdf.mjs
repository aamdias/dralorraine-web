import { MONOGRAM_L, MONOGRAM_S } from "../brand.mjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { ValidationError, dateLabel } from "./model.mjs";

export async function prescriptionPdf(record) {
    const pdf = await PDFDocument.create();
    const body = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const display = await pdf.embedFont(StandardFonts.TimesRoman);
    const ink = rgb(0.13, 0.13, 0.12),
        copper = rgb(0.55, 0.38, 0.28),
        stone = rgb(0.42, 0.4, 0.37),
        paper = rgb(0.99, 0.98, 0.96),
        line = rgb(0.86, 0.83, 0.78);
    const width = 595.28,
        height = 841.89,
        margin = 48,
        contentWidth = width - margin * 2;
    let page, y;
    const check = (text, font) => {
        try {
            font.encodeText(text);
        } catch {
            throw new ValidationError(
                "O PDF contém um caractere não suportado. Remova emojis ou símbolos especiais e emita uma nova receita."
            );
        }
        return text;
    };
    function wrapped(text, font, size, maxWidth) {
        const result = [];
        for (const paragraph of String(text || "")
            .replace(/\r/g, "")
            .replace(/\t/g, "    ")
            .split("\n")) {
            let current = "";
            for (const word of paragraph.split(/ +/)) {
                check(word, font);
                if (font.widthOfTextAtSize(word, size) > maxWidth) {
                    if (current) {
                        result.push(current);
                        current = "";
                    }
                    for (const char of word) {
                        if (
                            font.widthOfTextAtSize(current + char, size) >
                            maxWidth
                        ) {
                            result.push(current);
                            current = "";
                        }
                        current += char;
                    }
                } else if (
                    current &&
                    font.widthOfTextAtSize(`${current} ${word}`, size) >
                        maxWidth
                ) {
                    result.push(current);
                    current = word;
                } else current += `${current ? " " : ""}${word}`;
            }
            result.push(current);
        }
        return result;
    }
    function raw(text, x, baseline, size = 11, font = body, color = ink) {
        page.drawText(check(text, font), { x, y: baseline, size, font, color });
    }
    function newPage() {
        page = pdf.addPage([width, height]);
        page.drawRectangle({ x: 0, y: 0, width, height, color: paper });
        const markScale = 42 / 610;
        for (const path of [MONOGRAM_L, MONOGRAM_S])
            page.drawSvgPath(path, {
                x: margin + 5 - 308 * markScale,
                y: height - 28 + 207 * markScale,
                scale: markScale,
                color: copper
            });
        raw("Dra. Lorraine Souza", margin + 57, height - 51, 18, display);
        raw("DERMATOLOGIA", margin + 58, height - 68, 8, body, copper);
        page.drawLine({
            start: { x: margin, y: height - 86 },
            end: { x: width - margin, y: height - 86 },
            thickness: 0.7,
            color: line
        });
        y = height - 114;
        for (const l of wrapped(record.patient_name, bold, 11, contentWidth)) {
            raw(l, margin, y, 11, bold);
            y -= 16;
        }
        raw(`Emissão: ${dateLabel(record.date)}`, margin, y, 9, body, stone);
        y -= 33;
    }
    function ensure(space) {
        if (y - space < 92) newPage();
    }
    function text(
        text,
        {
            x = margin,
            maxWidth = contentWidth,
            size = 11,
            font = body,
            color = ink,
            leading = 17
        } = {}
    ) {
        for (const l of wrapped(text, font, size, maxWidth)) {
            ensure(leading);
            raw(l, x, y, size, font, color);
            y -= leading;
        }
    }
    newPage();
    text(record.title, { size: 26, font: display, leading: 31 });
    y -= 16;
    for (let index = 0; index < record.items.length; index++) {
        const item = record.items[index];
        ensure(135);
        const top = y,
            imageWidth = item.image ? 86 : 0,
            x = margin + (imageWidth ? imageWidth + 18 : 0);
        if (item.image) {
            let image;
            try {
                image = item.image.startsWith("data:image/png")
                    ? await pdf.embedPng(item.image)
                    : await pdf.embedJpg(item.image);
            } catch {
                throw new ValidationError(
                    `Não foi possível abrir a foto de ${item.name}. Substitua a foto e emita uma nova receita.`
                );
            }
            const scale = Math.min(86 / image.width, 96 / image.height);
            page.drawRectangle({
                x: margin,
                y: top - 102,
                width: 86,
                height: 110,
                color: rgb(1, 1, 1)
            });
            page.drawImage(image, {
                x: margin + (86 - image.width * scale) / 2,
                y: top - 96 + (96 - image.height * scale) / 2,
                width: image.width * scale,
                height: image.height * scale
            });
        }
        const itemPage = page;
        text(`${index + 1}. ${item.name}`, {
            x,
            maxWidth: width - margin - x,
            size: 16,
            font: display,
            leading: 21
        });
        y -= 7;
        text(item.instructions, { x, maxWidth: width - margin - x });
        if (page === itemPage && imageWidth) y = Math.min(y, top - 110);
        y -= 14;
        ensure(1);
        page.drawLine({
            start: { x: margin, y },
            end: { x: width - margin, y },
            thickness: 0.6,
            color: line
        });
        y -= 25;
    }
    ensure(60);
    text("Conduta e orientações", { size: 18, font: display, leading: 25 });
    y -= 8;
    text(record.conduct, { leading: 18 });
    y -= 30;
    const signatureHeight =
        wrapped(record.doctor, bold, 11, contentWidth).length * 16 +
        wrapped(record.registration, body, 10, contentWidth).length * 16 +
        (record.qualification
            ? wrapped(record.qualification, body, 10, contentWidth).length * 16
            : 0) +
        35;
    ensure(signatureHeight);
    page.drawLine({
        start: { x: margin, y },
        end: { x: margin + 200, y },
        thickness: 0.6,
        color: line
    });
    y -= 20;
    text(record.doctor, { font: bold, leading: 16 });
    text(record.registration, { size: 10, leading: 16 });
    if (record.qualification)
        text(record.qualification, { size: 10, leading: 16 });
    const pages = pdf.getPages();
    pages.forEach((p, i) => {
        p.drawLine({
            start: { x: margin, y: 65 },
            end: { x: width - margin, y: 65 },
            thickness: 0.7,
            color: line
        });
        p.drawText("Dermatologia com ciência, escuta e cuidado.", {
            x: margin,
            y: 48,
            size: 9,
            font: display,
            color: copper
        });
        p.drawText("Documento sem assinatura digital.", {
            x: margin,
            y: 34,
            size: 8,
            font: body,
            color: stone
        });
        p.drawText(`${i + 1} / ${pages.length}`, {
            x: width - margin - 25,
            y: 41,
            size: 9,
            font: body,
            color: stone
        });
    });
    pdf.setTitle(record.title);
    pdf.setAuthor(record.doctor);
    pdf.setCreator("Lorraine CRM");
    return Buffer.from(await pdf.save());
}
