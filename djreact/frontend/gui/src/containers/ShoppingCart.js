import React from 'react' 
import { Card } from 'antd';

class ShoppingCart extends React.PureComponent {

    render(){ 
        return(
            <Card title = "Your Cart">
                <p>The itmes in your cart.</p>
            </Card>
        )
    }
}

export default ShoppingCart ;