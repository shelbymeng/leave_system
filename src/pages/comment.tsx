import React, { useEffect, useState } from 'react';
import { Button, List, Collapse, message, Comment, Input } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
import {
  getCommentService,
  addCommentService,
  getReplyService,
  addReplyService,
  deleteCommentService,
} from '../service/index';
import sessionStorageService from '@/service/sessionStorageService';
import IComments from '../ts/interface/IComments';
export default () => {
  const [comments, setComments] = useState<Array<IComments>>(); //全部留言
  const [comment, setComment] = useState(''); //单条留言
  const [replys, setReplys] = useState<Array<IComments>>(); //全部留言回复
  const [reply, setReply] = useState(''); //单条提交留言
  const user = sessionStorageService.getUser();
  //  获取全部留言
  async function getComments() {
    const res = await getCommentService();
    if (res.error !== 0) {
      message.warn(res.msg);
    }
    if (res.error === 0) {
      setComments(res.data);
    }
  }
  //  提交留言
  async function addComment() {
    const params = {
      commentId: `COMMENT${new Date().getTime()}`,
      account: user.account,
      author: user.username,
      content: comment,
      datetime: new Date().getTime(),
    };
    const res = await addCommentService(params);
    if (res.error !== 0) {
      message.error(res.msg);
    }
    if (res.error === 0) {
      message.success('提交成功');
      getComments();
      setComment('');
    }
  }
  //  获取留言回复
  async function getReplys() {
    const res = await getReplyService();
    console.log(`ML ~ file: adminService.tsx ~ line 64 ~ getReplys ~ res`, res);
    if (res.error !== 0) {
      message.warn(res.msg);
    }
    setReplys(res.data);
  }
  //  提交留言回复
  async function addReply(commentId: string) {
    const params = {
      commentId: commentId,
      account: user.account,
      author: 'asdgafgfd',
      content: reply,
      datetime: new Date().getTime(),
    };
    const res = await addReplyService(params);
    if (res.error !== 0) {
      message.error(res.msg);
    }
    if (res.error === 0) {
      message.success('提交成功');
      setReply('');
      getReplys();
    }
  }
  //  获取留言对应回复
  function getReply(commentId: string) {
    return replys?.filter((reply) => reply.commentId === commentId);
  }
  //  获取留言回复的数量
  function getReplyNum(commentId: string) {
    const num = replys?.filter((reply) => reply.commentId === commentId).length;
    return num ? num : 0;
  }
  //  删除留言
  async function deleteComment(e: any, commentId: string) {
    e.stopPropagation();
    const res = await deleteCommentService(commentId);
    if (res?.error === 0) {
      message.success('删除成功');
      getComments();
    }
  }
  useEffect(() => {
    getComments();
    getReplys();
  }, []);
  return (
    <div>
      <List
        itemLayout="horizontal"
        pagination={{ pageSize: 4 }}
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.commentId}>
            <Collapse
              accordion={true}
              expandIconPosition="right"
              style={{ width: '100%' }}
              destroyInactivePanel
              expandIcon={() => (
                <div style={{ padding: 0 }}>
                  <Button type="link">
                    <MessageOutlined />
                    <span>{getReplyNum(item.commentId)}</span>
                  </Button>
                  {user && user.role === 'admin' ? (
                    <Button
                      type="link"
                      onClick={(e) => deleteComment(e, item.commentId)}
                    >
                      删除
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
              )}
            >
              <Panel
                header={`${item.author}  ${item.content}`}
                key={item.commentId}
              >
                <Comment
                  author={item.author}
                  content={item.content}
                  datetime={item.datetime}
                >
                  <List
                    itemLayout="horizontal"
                    pagination={{ pageSize: 3 }}
                    dataSource={getReply(item.commentId)}
                    renderItem={(reply) => (
                      <List.Item>
                        <Comment
                          author={reply.author}
                          content={reply.content}
                          datetime={reply.datetime}
                        />
                      </List.Item>
                    )}
                  ></List>
                </Comment>
                <Input.TextArea
                  onPressEnter={() => addReply(item.commentId)}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  style={{ marginTop: 20 }}
                ></Input.TextArea>
                <Button
                  type="primary"
                  onClick={() => addReply(item.commentId)}
                  style={{ marginTop: 20 }}
                >
                  回复
                </Button>
              </Panel>
            </Collapse>
          </List.Item>
        )}
      ></List>
      <div style={{ marginTop: 20 }}>
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onPressEnter={addComment}
        ></Input.TextArea>
        <Button type="primary" onClick={addComment} style={{ marginTop: 20 }}>
          提交
        </Button>
      </div>
    </div>
  );
};
