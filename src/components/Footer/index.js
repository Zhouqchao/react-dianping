import React, { Component } from "react";
import "./style.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__links">
          <p>
            <a href="https://m.dianping.com/nmy/myinfo">我的</a>
            <a href="https://m.dianping.com/nmy/myinfo">社区论坛</a>
            <a href="https://m.dianping.com/nmy/myinfo">添加商户</a>
            <a href="https://m.dianping.com/nmy/myinfo">意见反馈</a>
          </p>
          <p>
            <a href="https://m.dianping.com/nmy/myinfo">美团网</a>
            <a href="https://m.dianping.com/nmy/myinfo">美团下载</a>
            <a href="https://m.dianping.com/nmy/myinfo">结婚</a>
            <a href="https://m.dianping.com/nmy/myinfo">亲子</a>
            <a href="https://m.dianping.com/nmy/myinfo">家装</a>
            <a href="https://m.dianping.com/nmy/myinfo">宴会</a>
            <a href="https://m.dianping.com/nmy/myinfo">教育</a>
          </p>
          <p>
            <a href="https://m.dianping.com/nmy/myinfo">电脑版</a>
            <a href="https://m.dianping.com/nmy/myinfo">客户端</a>
          </p>
        </div>
        <p className="footer__copyright">copyright &copy;2020 dianping.com</p>
      </div>
    );
  }
}

export default Footer;
