import React from 'react';
import { Card, Typography } from 'antd';
import { IPostItem } from './types';
import {APP_ENV} from "../../env"; // Assuming IPostItem interface is defined in types.ts
import NotImage from '../../../assets/imagenot.png';
const { Meta } = Card;
const { Title, Paragraph } = Typography;

const PostCard: React.FC<IPostItem> = (props) => {
    const { title, id, content, files } = props;

    return (
        <Card
            style={{ width: 300, marginTop: 16 }}
            hoverable
            cover={
                <img
                    style={{height: '100px', objectFit: 'contain'}}
                    alt={title}
                    src={files[0] ? `${APP_ENV.BASE_URL}/uploading/300_${files[0]}` : NotImage}
                />
            }
        >
            <Meta
                title={<Title level={4}>{title}</Title>}
                description={<Paragraph ellipsis={{rows: 2}}>{content}</Paragraph>}
            />
        </Card>
    );
};

export default PostCard;
