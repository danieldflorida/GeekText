import React, { Component } from 'react'
import Pagination from "./Pagination";
import img0 from '../../../static/stars/5_Star_Rating_System_0_stars.svg';
import img1 from '../../../static/stars/5_Star_Rating_System_1_star_T.png';
import img2 from '../../../static/stars/5_Star_Rating_System_2_stars_T.png';
import img3 from '../../../static/stars/5_Star_Rating_System_3_stars_T.png';
import img4 from '../../../static/stars/5_Star_Rating_System_4_stars_T.png';
import img5 from '../../../static/stars/5_Star_Rating_System_5_stars_T.png';


class ProductItem extends Component{
    constructor(props){
        super(props);
        this.gridView = this.gridView.bind(this);
        this.listView = this.listView.bind(this);
        this.getReviews = this.getReviews.bind(this);
    }

    getReviews(){
        let avg = 0;
        
        if(this.props.rating.length){
            this.props.rating.map(val => {
                avg += Number(val.stars);
                return true;
            });

            avg = avg / this.props.rating.length;
        }

        let imgSrc;
        switch (avg) {
            case 0:
            imgSrc = img0;
            break;

            case 1:
            imgSrc = img1;
            break;

            case 2:
            imgSrc = img2;
            break;
            
            case 3:
            imgSrc = img3;
            break;
            
            case 4:
            imgSrc = img4;
            break;

            case 5:
            imgSrc = img5;
            break;
        
            default:
            console.log("not found star")
                break;
        }

        return (<img className="star-img" src={imgSrc} alt=""/>);
    }

    gridView(){
        return (
            <div className="col-md-3 grid-product-item">
                <div className="grid-product-img">
                    <a href={`/${this.props.id}`}>
                        <img src={this.props.img} alt="" />
                    </a>
                </div>
                <div className="grid-product-description">
                    <div className="title main-font">
                        <a href={`/${this.props.id}`}>
                            <span>{this.props.title}</span>
                        </a>
                    </div>

                    <div className="author second-font">
                        <a href={`/${this.props.id}`}>
                            <span>by {this.props.authors[0].name}</span>
                            <span>| {this.props.releaseDate}</span>
                        </a>
                    </div>
                    <div className="reviews">
                        {this.getReviews()}
                    </div>
                    <div className="price">
                        <a href={`/${this.props.id}`}>
                            <img className="dollar-icon" src="static/browse/icons/svg/dollar.svg" alt="" />
                            <span>${this.props.price}</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    listView(){
        return (
            <div className="row list-product-item">
                <div className="col-md-4 list-product-img">
                    <a href={`/${this.props.id}`}>
                        <img src={this.props.img} alt=""/>
                    </a>
                </div>
                <div className="col-md-8 list-product-description">
                    <div className="title main-font">
                        <a href={`/${this.props.id}`}>
                            <span>{this.props.title}</span>
                        </a>
                    </div>
                    <div className="author second-font">
                        <a href={`/${this.props.id}`}>
                            <span>by {this.props.authors[0].name}</span>
                            <span>| {this.props.releaseDate}</span>
                        </a>
                    </div>
                    <div className="reviews">
                        {this.getReviews()}
                    </div>
                    <div className="price">
                        <a href={`/${this.props.id}`}>
                            <img className="dollar-icon" src="static/browse/icons/svg/dollar.svg" alt="" />
                            <span>${this.props.price}</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return this.props.gridView ? this.gridView() : this.listView();
    }
}

class ProductView extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            currentPage: 1,
            todosPerPage: 3
        };

        this.mapFunction = this.mapFunction.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    mapFunction(book, index){
        return (
        <ProductItem 
        gridView={this.props.gridView}
        listView={this.props.listView} 
        key={book.id} 
        id={book.id} 
        title={book.title} 
        authors={book.authors} 
        releaseDate={book.created_at} 
        price={book.price} 
        rating={book.rating_set}
        img={book.cover}
        />
        );
    }

    render(){
        let books = [];

        if(this.props.books !== undefined && this.props.books.length){
            books = this.props.books.map(this.mapFunction);
        }

        return (
            <Pagination
            gridView={this.props.gridView} 
            currentPage={this.state.currentPage} 
            todosPerPage={this.state.todosPerPage} 
            books={books} 
            handleClick={this.handleClick}
            />
        );;

    }
}


export default ProductView;