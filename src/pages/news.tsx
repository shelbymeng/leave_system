import React, { useState, useEffect } from 'react';
import { List, message, Modal, Card } from 'antd';
import { getNewService } from '../service/index';
import INews from '../ts/interface/INews';
export default () => {
  const [news, setNews] = useState<Array<INews>>(); //所有消息
  const [singleNew, setNew] = useState<INews>(); //单条消息
  const [visible, setVisible] = useState(false);
  async function getNews() {
    const res = await getNewService();
    if (res.error !== 0) {
      message.warn(res.msg);
    }
    if (res.error === 0) {
      setNews(res.data);
    }
  }
  function viewNew(params: INews) {
    setNew(params);
    setVisible(true);
  }
  function onCancel() {
    setVisible(false);
  }
  useEffect(() => {
    getNews();
  });
  return (
    <div>
      <List
        dataSource={news}
        renderItem={(item) => (
          <List.Item actions={[<a onClick={() => viewNew(item)}>查看</a>]}>
            <List.Item.Meta
              title={`作者：${item.author}         标题：${item.title}          发布时间：${item.time}`}
              description={item.content}
            ></List.Item.Meta>
          </List.Item>
        )}
      ></List>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        title="新闻详情"
        width={800}
      >
        <Card
          title={`标题：${singleNew?.title}         作者：${singleNew?.author}`}
        >
          <span>发布时间：{singleNew?.time}</span>
          <br />
          <br />
          <div style={{textIndent:'20px'}}>{singleNew?.content}</div>
        </Card>
      </Modal>
    </div>
  );
};
