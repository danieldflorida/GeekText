import React, { Component } from 'react'
import Pagination from "./Pagination";
/*
import img0 from '../../../static/stars/5_Star_Rating_System_0_stars.svg';
import img1 from '../../../static/stars/5_Star_Rating_System_1_star_T.png';
import img2 from '../../../static/stars/5_Star_Rating_System_2_stars_T.png';
import img3 from '../../../static/stars/5_Star_Rating_System_3_stars_T.png';
import img4 from '../../../static/stars/5_Star_Rating_System_4_stars_T.png';
import img5 from '../../../static/stars/5_Star_Rating_System_5_stars_T.png';
*/
import img0 from '../../../static/stars/5_Star_Rating_System_0_stars.svg';
import img0AndHalf from '../../../static/stars/5_Star_Rating_System_0_and_half_star_T.png';

import img1 from '../../../static/stars/5_Star_Rating_System_1_star_T.png';
import img1AndHalf from '../../../static/stars/5_Star_Rating_System_1_and_a_half_stars_T.png';

import img2 from '../../../static/stars/5_Star_Rating_System_2_stars_T.png';
import img2AndHalf from '../../../static/stars/5_Star_Rating_System_2_and_a_half_stars_T.png';

import img3 from '../../../static/stars/5_Star_Rating_System_3_stars_T.png';
import img3AndHalf from '../../../static/stars/5_Star_Rating_System_3_and_a_half_stars_T.png';

import img4 from '../../../static/stars/5_Star_Rating_System_4_stars_T.png';
import img4AndHalf from '../../../static/stars/5_Star_Rating_System_4_and_a_half_stars_T.png';

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

        }
        avg = avg / this.props.rating.length;
        console.log("length is: "+this.props.rating.length)
        console.log("avg is: "+avg)
        let imgSrc;
        switch (true) {
            case (avg >= 0 && avg <= 0.2):
            imgSrc = img0;
            break;

            case (avg >= 0.3 && avg <= 0.7):
            imgSrc = img0AndHalf;
            break;

            case (avg >= 0.8 && avg <= 1.2):
            imgSrc = img1;
            break;

            case (avg >= 1.3 && avg <= 1.7):
            imgSrc = img1AndHalf;
            break;

            case (avg >= 1.8 && avg <= 2.2):
            imgSrc = img2;
            break;

            case (avg >= 2.3 && avg <= 2.7):
            imgSrc = img2AndHalf;
            break;

            case (avg >= 2.8 && avg <= 3.2):
            imgSrc = img3;
            break;

            case (avg >= 3.3 && avg <= 3.7):
            imgSrc = img3AndHalf;
            break;

            case (avg >= 3.8 && avg <= 4.2):
            imgSrc = img4;
            break;

            case (avg >= 4.3 && avg <= 4.7):
            imgSrc = img4AndHalf;
            break;

            case (avg >= 4.8 && avg <= 5):
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
            todosPerPage: 12
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
        releaseDate={book.publicationDate} 
        price={book.price} 
        rating={book.rating_set}
        img={book.cover}
        />
        );
    }

    render(){
        let books = this.props.books;
        if(books !== undefined && books.length){
            books = books.map(this.mapFunction);
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