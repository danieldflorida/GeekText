import React from 'react' 
import { List, Avatar, Icon } from 'antd';

            const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
            );

const Books = ( props ) => {

    return (

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 10,
                }}
                dataSource={props.data}
                renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[<IconText type="star-o" text="42" />, <IconText type="like-o" text="0" />, <IconText type="message" text="0" />]}
                    extra={<img width={272} alt="logo" src={item.cover} />}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={"https://image.shutterstock.com/image-photo/kherson-ukraine-august-27-2016-260nw-474817798.jpg"} />}
                    title={<a href={`/${item.bookID}`}>{item.title}</a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />

    )

}

export default Books ;