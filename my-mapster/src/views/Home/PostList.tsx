import {useEffect, useState} from "react";
import {IPostItem} from "./types.ts";
import PostCard from "./PostCard.tsx";
import http_common from "../../../http_common.ts";
const PostList = () =>
    {
        const[list,setList] = useState<IPostItem[]>(
        );

        useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log('server request-------------');
                    const response = await http_common.get<IPostItem[]>("/api/posts");
                    console.log("response.data", response.data)
                    setList(response.data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };
            fetchData();
        },[]);

        return(
            <div className={"posts"}>
                {list?.map((item) =>(
                    <PostCard key={item.id} {...item}></PostCard>
                ))}
            </div>
        );
    };
export default PostList;