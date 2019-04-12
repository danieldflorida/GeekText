import React, { Component } from "react";

class Pagination extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
        todosPerPage: 3
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(event) {
        event.preventDefault();
      this.props.handleClick(event);
    }
  
    render() {
        const { books, currentPage, todosPerPage } = this.props;
  
        const indexOfLastBook = currentPage * todosPerPage;
        const indexOfFirstBook = indexOfLastBook - todosPerPage;
        const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(books.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }
    
        const renderPageNumbers = pageNumbers.map(number => {
            let page = number === this.props.currentPage ? "pagination-item pagination-current" : "pagination-item";
            
            return (
            <a href="changethis" key={number} id={number} className={page} onClick={this.handleClick}>
                {number}
            </a>
            );
        });


        let test;
        if(this.props.gridView){
            test = (
            <div className="row">
                {currentBooks}
            </div>
            );
        }else{
            test = currentBooks;
        }

        return (
            <div>
                {test}
                <div id="page-numbers" className="row">
                    <div className="col-md-12 pagination-container">
                        {renderPageNumbers}
                    </div>
                </div>
            </div>
        );
    }
}

export default Pagination;