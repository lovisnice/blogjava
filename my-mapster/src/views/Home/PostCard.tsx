import React from 'react';
import { IPostItem } from './types';
import {APP_ENV} from "../../env"; // Assuming IPostItem interface is defined in types.ts
import NotImage from "../../assets/imagenot.png"
import {Button} from "antd";
import DOMPurify from "dompurify"

const PostCard: React.FC<IPostItem> = (props) => {
    const { title, id, content, files } = props;

    const getText = (html) =>{
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, 'text/html');

        return htmlDoc.body.textContent
    }

    return (
        <div className={"post"}>
            <div className={"img"}><img
                alt={title + "." + id}
                src={files[0] ? `${APP_ENV.BASE_URL}/uploading/1200_${files[0]}` : NotImage}
            /></div>
            <div className={"content"}>
                <h1>{title}</h1>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content),
                    }}
                ></p>
                <Button className={"button"}>Read more</Button>
            </div>
        </div>
    );
};

export default PostCard;
