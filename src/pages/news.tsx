import React, { useState, useEffect } from 'react';
import { List, message } from 'antd';
import { getNewService } from '../service/index';
import INews from '../ts/interface/INews';
export default () => {
  const [news, setNews] = useState<Array<INews>>();
  async function getNews() {
    const res = await getNewService();
    if (res.error !== 0) {
      message.warn(res.msg);
    }
    if (res.error === 0) {
      setNews(res.data);
    }
  }
  useEffect(() => {
    getNews();
  });
  return (
    <div>
      <List
        dataSource={news}
        renderItem={(item) => (
          <List.Item actions={[<a>查看</a>]}>
            <List.Item.Meta
              title={`作者：${item.author}         标题：${item.title}          发布时间：${item.time}`}
              description={item.content}
            ></List.Item.Meta>
          </List.Item>
        )}
      ></List>
    </div>
  );
};
