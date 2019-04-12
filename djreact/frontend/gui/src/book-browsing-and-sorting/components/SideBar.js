import React, { Component } from 'react'


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

/* Resets all the fields in App to default */
class BackButton extends Component{
    render(){
        return (
            <div className="row">
                <div className="col-md-12 display-list">
                    <div className="title">
                        <button onClick={this.props.backBtnHandler}>
                            <img className="arrow-left-icon" src="../../static/icons/svg/arrow-left.svg" alt="" />
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
