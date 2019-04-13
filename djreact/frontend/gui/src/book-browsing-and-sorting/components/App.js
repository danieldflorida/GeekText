import React, { Component } from "react";
import axios from 'axios'
import SideBar from "./SideBar";
import InfoNav from "./InfoNav";
import ProductView from "./product/ProductView";
import SortView from "./product/SortView";
import DataProvider from "./data/DataProvider";
import SortOperations from "./data/SortOperations";
import './style/style.css';

class App extends Component{
    constructor(props){
        super(props);
        this.gridButtonHandler = this.gridButtonHandler.bind(this);
        this.listButtonHandler = this.listButtonHandler.bind(this);
        this.categoryHandler = this.categoryHandler.bind(this);
        this.authorHandler = this.authorHandler.bind(this);
        this.backBtnHandler = this.backBtnHandler.bind(this);
        this.setDefaultData = this.setDefaultData.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.ratingHandler = this.ratingHandler.bind(this);

        this.sortOperations = new SortOperations();
        this.dataProvider = new DataProvider();

        this.state = {
            books: [],
            authors: [],
            categories: [],
            infoNavTitle: "Browse Books",
            gridView: true,
            listView: false,
            showBackBtn: false,
            bookCount: 0,
        };
    }
    
    componentDidMount(){
        this.setDefaultData();
    }

    setDefaultData(){
        axios.all([this.dataProvider.getAuthors(), this.dataProvider.getBooks(), this.dataProvider.getCategories()])
        .then(axios.spread((authors, books, categories) => {
            this.setState({
                authors: authors.data,
                books: books.data,
                categories: categories.data,
                bookCount: books.data.length,
                showBackBtn: false,
                infoNavTitle: "Browse Books",
            });
        }))
        .catch(error => {
            console.error(error);
        });
    }

    backBtnHandler(){
        this.setDefaultData();
    }

    ratingHandler(value, e){
        e.preventDefault();
        this.dataProvider.getRatings(value)
        .then(response => {
            const authors = [];

            for(let i = 0; i < response.data.length; ++i){
                for(let x = 0; x < response.data[i].authors.length; ++x){
                    if(response.data[i].authors[x]){
                        let found = false;
                        if(authors.length){
                            for(let y = 0; y < authors.length; ++y){
                                if(authors[y].id === response.data[i].authors[x].id){
                                    found = true;
                                }
                            }
                        }
                        if(!found){
                            authors.push(response.data[i].authors[x]);
                        }
                    }
                }
            }

            this.setState({
                authors: authors,
                books: response.data,
                bookCount: response.data.length,
                showBackBtn: true,
                infoNavTitle: 'Rating',
            });

            console.log(authors);

            console.log(response);
        })
        .catch(console.error);
    }

    categoryHandler(id, name, e){
        e.preventDefault();

        axios.all([this.dataProvider.getAuthors(id), this.dataProvider.getBooks(id)])
        .then(axios.spread((authors, books) => {
            this.setState({
                authors: authors.data,
                books: books.data,
                bookCount: books.data.length,
                showBackBtn: true,
                infoNavTitle: name,
            });
        }))
        .catch(error => {
            console.error(error);
        });
    }

    authorHandler(id, name, e){
        e.preventDefault();

        this.dataProvider.getBooks(undefined, id)
        .then(response => {
            this.setState({
                books: response.data,
                bookCount: response.data.length,
                showBackBtn: true,
                infoNavTitle: name,
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    gridButtonHandler(){
        this.setState({
            gridView: true,
            listView: false
        });
    }

    listButtonHandler(){
        this.setState({
            gridView: false,
            listView: true
        });
    }

    sortHandler(event){
        let books = this.state.books;

        if(Number(event.target.value)=== Number(SortOperations.BOOK_PRICE_LOW_TO_HIGH)){
            books = this.sortOperations.sortLowestBookByPrice(books);
        }else if(Number(event.target.value)=== Number(SortOperations.BOOK_PRICE_HIGH_TO_LOW)){
            books = this.sortOperations.sortHighestBookByPrice(books);
        }else if(Number(event.target.value)=== Number(SortOperations.RELEASE_DATE)){
            books = this.sortOperations.sortRelease(books);
        }else if(Number(event.target.value)=== Number(SortOperations.A_TO_Z)){
            books = this.sortOperations.sortAtoZ(books);
        }else if(Number(event.target.value)=== Number(SortOperations.Z_TO_A)){
            books = this.sortOperations.sortZtoA(books);
        }else if(Number(event.target.value)=== Number(SortOperations.BOOK_RATING_LOW_TO_HIGH)){
            books = this.sortOperations.sortLowestBookByRating(books);
        }else if(Number(event.target.value)=== Number(SortOperations.BOOK_RATING_HIGH_TO_LOW)){
            books = this.sortOperations.sortHighBookByRating(books);
        }else if(Number(event.target.value)=== Number(SortOperations.OLDEST_RELEASE_DATE)){
            books = this.sortOperations.sortOldestRelease(books);
        }

        if(books.length){
            this.setState({
                books: books,
            });
        }
    }

    render(){
        return (
        <div className="row">
            <div className="col-sm-12">
                <InfoNav title={this.state.infoNavTitle}/>
            </div>

            <div className="col-sm-2">
                <SideBar 
                ratingHandler={this.ratingHandler}
                backBtnHandler={this.backBtnHandler}
                showBackBtn={this.state.showBackBtn}
                authors={this.state.authors} 
                categories={this.state.categories}
                categoryHandler={this.categoryHandler}
                authorHandler={this.authorHandler}
                />
            </div>

            <div className="col-sm-10 right-column">
                <SortView 
                count={this.state.bookCount} 
                gridHandler={this.gridButtonHandler} 
                listHandler={this.listButtonHandler}
                sortHandler={this.sortHandler}
                />

                <ProductView 
                gridView={this.state.gridView} 
                listView={this.state.listView} 
                books={this.state.books}
                />
            </div>

        </div>
        );
    }
}

export default App;