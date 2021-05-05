// import React, { useState, useEffect } from 'react';
// import { Button, Input } from 'antd';
// import { io } from 'socket.io-client';
// import { MessageBox, ChatItem,ChatList } from 'react-chat-elements';
// import 'react-chat-elements/dist/main.css';
// import sessionStorageService from '@/service/sessionStorageService';
// import styles from './page3.css';
// const url = 'ws://127.0.0.1:3006/';
// // const io = socket.io(`${url}`);
// const option = {
//   withCredentials: true,
//   extraHeaders: {
//     'my-custom-header': 'abcd',
//   },
// };
// const socket = io(`${url}`, option);
// interface userMsg {
//   user: string;
//   msg: string;
// }
// export default () => {
//   const [inputMsg, setInputMsg] = useState('');
//   const [msg, setMsg] = useState<userMsg>();
//   const user = sessionStorageService.getUser();

//   function login() {
//     const obj = {
//       account: user.account,
//       id: socket.id,
//     };
//     socket.emit('login', obj);
//   }
//   function send() {
//     console.log('按钮点击-------');
//     const obj = {
//       user: socket.id,
//       msg: inputMsg,
//     };
//     socket.emit('send', obj);
//     socket.on('getUserMsg', (content: userMsg) => {
//       console.log(
//         `ML ~ file: page3.tsx ~ line 35 ~ socket.on ~ content`,
//         content,
//       );
//       setMsg(content);
//     });
//   }
//   function getOnlineUser() {
//     console.log(socket.id);

//     socket.emit('getOnlineUser');
//     socket.on('getUserList', (socket: any) => {
//       console.log('socket----' + JSON.stringify(socket));
//     });
//   }

//   return (
//     <div>
//       <ChatList
//         className="chat-list"
//         dataSource={[
//           {
//             avatar: 'https://facebook.github.io/react/img/logo.svg',
//             alt: 'Reactjs',
//             title: 'Facebook',
//             subtitle: 'What are you doing?',
//             date: new Date(),
//             unread: 0,
//           },
//         ]}
//       />
//       <MessageBox
//         reply={{
//           photoURL: 'https://facebook.github.io/react/img/logo.svg',
//           title: 'elit magna',
//           titleColor: '#8717ae',
//           message: 'Aliqua amet incididunt id nostrud',
//         }}
//         onReplyMessageClick={() => console.log('reply clicked!')}
//         position={'left'}
//         type={'text'}
//         text={
//           'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'
//         }
//       />
//       <ChatItem
//         avatar={'https://facebook.github.io/react/img/logo.svg'}
//         alt={'Reactjs'}
//         title={'Facebook'}
//         subtitle={'What are you doing?'}
//         date={new Date()}
//         unread={0}
//       />
//       <div className={styles.container}>
//         <section>{`${msg?.user}` + '     say       ' + `${msg?.msg}`}</section>
//       </div>
//       <div>
//         <Input
//           value={inputMsg}
//           onChange={(event) => setInputMsg(event.target.value)}
//           onPressEnter={() => send()}
//         ></Input>
//         <Button onClick={login}>点击在线</Button>
//         <Button onClick={send}>发送</Button>
//         <Button onClick={getOnlineUser}>查看在线好友</Button>
//       </div>
//     </div>
//   );
// };
