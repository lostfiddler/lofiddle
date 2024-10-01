import {defineConfig} from 'vite';
import prism from 'vite-plugin-prismjs'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:7000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        fs: {
            allow: ['/home/ian/fonts', '/home/ian/animations']
        }
    },
    plugins: [
        prism({
            languages: ['javascript', 'css'],
            plugins: ['line-numbers'],
            theme: 'tomorrow',
            css: true
        })
    ]
})
