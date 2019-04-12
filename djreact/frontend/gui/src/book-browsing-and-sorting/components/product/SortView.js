import React, { Component } from 'react'
import gridImg from '../../../static/icons/svg/grid-three-up.svg';
import listImg from '../../../static/icons/svg/list.svg';

class SortSelect extends Component{
    render(){
        return (
        <select className="form-control custom-select" onChange={this.props.sortHandler}>
            <option value="0">Book Title</option>
            <option value="1">Price - Low to High</option>
            <option value="2">Price - High to Low</option>
            <option value="3">Release Date</option>
            <option value="4">Title - A to Z</option>
            <option value="5">Title - Z to A</option>
            <option value="6">Rating - Low to High</option>
            <option value="7">Rating - High to Low</option>
        </select>
        );
    }
}

class SortView extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-md-12 sort-options-container">
                    <div className="form-group">
                        <div className="row">
                            
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-sm-6 search-results">
                                        <h2>{this.props.count} items found</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    
                                    <div className="col-sm-6">
                                       <SortSelect sortHandler={this.props.sortHandler}/>
                                    </div>
                                    
                                    <div className="col-sm-2 view-icons-container" onClick={()=> this.props.gridHandler()}>
                                        <img src={gridImg} alt="" />
                                    </div>
                                    
                                    <div className="col-sm-2 view-icons-container" onClick={()=> this.props.listHandler()}>
                                        <img src={listImg} alt="" />
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SortView;