export default async function GetBooks() {
    const res = await fetch(
        import.meta.env.PROD === true ?
        'http://api.ianparkinson.studio/api/get-books':
        '/api/get-books'
    );
    return await res.json();
}
