export default async (props) => {
    const module = await import(props.request)
    document.querySelector('main').replaceChildren(), module.default();
    Prism.highlightAll();
}
