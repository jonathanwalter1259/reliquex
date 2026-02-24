const fs = require('fs');
const path = require('path');

const files = ['about.html', 'whitepaper.html', 'roadmap.html', 'support.html', 'faq.html', 'terms.html', 'privacy.html', 'disclaimer.html', 'asset.html'];

files.forEach(file => {
    const content = fs.readFileSync(path.join('_prototype', file), 'utf-8');
    const mainMatch = content.match(/<main[\s\S]*?<\/main>/);

    if (mainMatch) {
        let rawHtml = mainMatch[0];

        // Fix common React HTML differences
        rawHtml = rawHtml.replace(/class="/g, 'className="');
        rawHtml = rawHtml.replace(/colspan="/g, 'colSpan="');
        rawHtml = rawHtml.replace(/for="/g, 'htmlFor="');
        rawHtml = rawHtml.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

        // Self-close tags
        rawHtml = rawHtml.replace(/<hr([^>]*)>/g, (match, attrs) => {
            if (attrs.endsWith('/')) return match;
            return `<hr${attrs} />`;
        });
        rawHtml = rawHtml.replace(/<br([^>]*)>/g, (match, attrs) => {
            if (attrs.endsWith('/')) return match;
            return `<br${attrs} />`;
        });
        rawHtml = rawHtml.replace(/<img([^>]*)>/g, (match, attrs) => {
            if (attrs.endsWith('/')) return match;
            return `<img${attrs} />`;
        });
        rawHtml = rawHtml.replace(/<input([^>]*)>/g, (match, attrs) => {
            if (attrs.endsWith('/')) return match;
            return `<input${attrs} />`;
        });

        // Remove style attributes
        rawHtml = rawHtml.replace(/style="([^"]*)"/g, '');

        const name = file.replace('.html', '');
        const componentName = name.charAt(0).toUpperCase() + name.slice(1);
        const tsxContent = `export default function ${componentName}() {\n  return (\n    ${rawHtml}\n  );\n}\n`;

        const dirPath = path.join('src', 'app', name);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(path.join(dirPath, 'page.tsx'), tsxContent);
        console.log(`Ported ${file} to src/app/${name}/page.tsx`);
    }
});
