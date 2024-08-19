export default async (route) => {
    // NOTE
    // ---
    // Whats going with the dynamic import may look kinda weird. This is a vite
    // specific thing, check the links for more info.
    // p.s. As of v5.4 vite uses rollup as it's bundler.
    // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    // https://vitejs.dev/guide/features#dynamic-import
    
    const [book, chapter, example] = route.replace('.js', '').split('/')

    const module = await import(`../../../articles/${book}/${chapter}/${example}.js`)

    document.querySelector('#app').appendChild(module.default());
}
