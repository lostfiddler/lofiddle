import GetIndex from './GetIndex.js'
import GetArticle from './GetArticle.js'
import GetStatic from './GetStatic.js'
import GetBooksMetaData from './GetBooksMetaData.js'

export default (props) => {
    const { request, res } = props;

    const books = ['HTM5_Canvas', 'foundation_html5_for_animation', 'nature_of_code']
    const extensions = ['.html', '.css', '.js', '.png', '.svg', '.ttf']

    if (request.url === '/'){
        GetIndex(request, res)
        return;
    }  else if (books.some(book => request.url.includes(book))) {
        GetArticle(request, res)
        return;
    } else if (extensions.some(ext => request.url.includes(ext))) {
        GetStatic(request, res)
        return;
    } else if (request.url === '/get-books') {
        GetBooksMetaData(request, res)
        return;
    }
}
