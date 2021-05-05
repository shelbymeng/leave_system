### studentInfoTable 学生请假信息表
```ts
{
    stuId:string, // 学生卡id
    stuName:string, //学生姓名
    stuAge:string, //学生年龄
    stuCollege:string, //学生学院专业信息
    leaveReason:string, //离校理由
    startTime:string, //离校时间，13位时间戳
    returnTime:string, //返校时间 13位时间戳
    approver:string, //批准教师
}
```

### news 新闻表
```ts
{
    newTitle:string, //新闻标题
    newContent:string, //新闻内容
    updateTime:string, //更新时间
}
```

### message 留言板
```ts
{
    msgTitle:string, //留言板标题
    msgContent:string, //留言板内容
    update:string, //留言时间
    name:string, //留言学生
    comments:string[], //评论回复
}
```
主要技术：
环境：nodejs
前端框架：react，antd，typescript，html，css
后端框架：express
数据库：mongodb