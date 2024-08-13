export function MIMEType(ext) {
    return {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
        '.ttf': 'font/ttf'
    }[ext]
}
