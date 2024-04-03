import {Col, Row} from "antd";
import {useState} from "react";
import {IPostItem} from "./types.ts";
import PostCard from "./PostCard.tsx";

const PostList = () =>
    {
        const[list,setList] = useState<IPostItem[]>(
        );

        return(
            <>
                <Row gutter={16}>
                    <Col span={24}>
                        <Row>
                            {list?.length === 0 ? (
                                <h2>Список пустий</h2>
                            ) : (
                                list?.map((item) =>
                                    <PostCard key={item.id} {...item}/>,
                                )
                            )}
                        </Row>
                    </Col>
                </Row>
            </>
        );
    };
export default PostList;