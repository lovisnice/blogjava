import React from 'react';
import {Form, Input, Button, Upload} from 'antd';
import {UploadChangeParam} from "antd/es/upload";
import {IUploadedFile, PostEntity} from "../types.ts";
import http_common from "../../../../http_common.ts";
import {useNavigate} from "react-router-dom";
import { PlusOutlined} from '@ant-design/icons';

const PostCreatePage: React.FC = () => {

    const navigate = useNavigate();
    const onFinish = async (values: PostEntity) => {
        console.log("data", values);
        try {
            await http_common.post("/api/posts", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        }
        catch(ex) {
            console.log("Exception create category", ex);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Create New Post</h1>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the title' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please enter the content' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="files"
                    label="Images"
                    valuePropName="files"
                    getValueFromEvent={(e: UploadChangeParam) => {
                        const image = e?.fileList as IUploadedFile[];
                        return image.map(x=> x.originFileObj);
                    }}
                    rules={[{required: true, message: 'Choose image for category!'}]}
                >
                    <Upload
                        showUploadList={{showPreviewIcon: false}}
                        beforeUpload={() => false}
                        accept="image/*"
                        listType="picture-card"
                    >
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PostCreatePage;
