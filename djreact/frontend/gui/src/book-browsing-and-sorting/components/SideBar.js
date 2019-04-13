import React, { Component } from 'react'
import arrowImg from '../../static/icons/svg/arrow-left.svg'
import img0 from '../../static/stars/5_Star_Rating_System_0_stars.svg';
import img1 from '../../static/stars/5_Star_Rating_System_1_star_T.png';
import img2 from '../../static/stars/5_Star_Rating_System_2_stars_T.png';
import img3 from '../../static/stars/5_Star_Rating_System_3_stars_T.png';
import img4 from '../../static/stars/5_Star_Rating_System_4_stars_T.png';
import img5 from '../../static/stars/5_Star_Rating_System_5_stars_T.png';

class SideBarElement extends Component{
    constructor(props){
        super(props);
        this.state = { authors: [] };
        this.mapFunction = this.mapFunction.bind(this);
    }

    mapFunction(arr, index){
        return (
        <li key={arr.id}>
            <button onClick={this.props.categoryHandler ? this.props.categoryHandler.bind(this, arr.id, arr.name) : this.props.authorHandler.bind(this, arr.id, arr.name)}>
                {arr.name}
            </button>
        </li>
        );
    }

    render(){
        const { data } = this.props;
		const itemList = data.length ? (
			data.map(
                this.mapFunction
            )
		) : (<div>nothing</div>);

        return (
            <div className="row">
                <div className="col-md-12 display-list">
                    <div className="title">
                        <h2>{this.props.title}</h2>
                    </div>
                    <div className="body">
                        <ul>
                           {itemList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

class RatingView extends React.Component{
    constructor(props){
        super(props);
        this.mapFunction = this.mapFunction.bind(this);
    }

    mapFunction(value, index){
        let imgSrc;
        switch (value) {
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
            break;
        }

        return (
        <li key={value}>
            <img onClick={this.props.ratingHandler.bind(this, value)} className="star-img" src={imgSrc} alt=""/>
        </li>
        );
    }

    render(){
        const itemList = this.props.rating.length ? (
			this.props.rating.map(
                this.mapFunction
            )
		) : (<div>nothing</div>); 


        return (
        <div className="row">
            <div className="col-md-12 display-list">
                <div className="title">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="body">
                    <ul>
                        {itemList}
                    </ul>
                </div>
            </div>
        </div>
        );
    }
}

/* Resets all the fields in App to default */
class BackButton extends Component{
    render(){
        return (
            <div className="row">
                <div className="col-md-12 display-list">
                    <div className="title">
                        <button onClick={this.props.backBtnHandler}>
                            <img className="arrow-left-icon" src={arrowImg} alt="" />
                            <span>back</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

class SideBar extends Component{
    render(){
        let elementsToDisplay = [];

        if(this.props.categories !== undefined){
            if(this.props.categories.length){
                elementsToDisplay.push(<SideBarElement categoryHandler={this.props.categoryHandler} key={elementsToDisplay.length} title="Category" data={this.props.categories} />);
            }
        }

        if(this.props.authors !== undefined){
            if(this.props.authors.length){
                elementsToDisplay.push(<SideBarElement authorHandler={this.props.authorHandler} key={elementsToDisplay.length} title="Authors" data={this.props.authors} />);
            }
        }

        elementsToDisplay.push(<RatingView ratingHandler={this.props.ratingHandler} title="Rating" rating={[0, 1, 2, 3, 4, 5]} key={elementsToDisplay.length}/>);

        let backBtn = this.props.showBackBtn ? <BackButton backBtnHandler={this.props.backBtnHandler}/> : undefined;

        return (
            <div className="sidebar-container">
                <ul>
                    {backBtn}
                    {elementsToDisplay}
                </ul>
            </div>
        );
    }


};

export default SideBar;
