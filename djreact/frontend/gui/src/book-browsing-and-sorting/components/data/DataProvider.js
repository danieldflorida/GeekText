import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/';

class DataProvider{

    getAuthors(categoryId=undefined){
        let url = 'list/author';
        
        if(categoryId)
            url = 'list/author/category/' + categoryId;

        return this.getData(url);
    }

    getBooks(categoryId=undefined, authorId=undefined){
        let url = 'list/book';

        if(categoryId)
            url = 'list/book/category/' + categoryId;
        else if(authorId)
            url = 'list/book/author/' + authorId;

        return this.getData(url);
    }

    getCategories(){
        return this.getData('list/category');
    }

    getData(url){
        return axios.get(API_URL + url);
    }
}

export default DataProvider;