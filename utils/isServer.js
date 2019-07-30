// 此文件用于判断当前运行环境是服务器端还是客户端

export default typeof window === 'undefined';