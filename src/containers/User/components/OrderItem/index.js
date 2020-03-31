import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import {
  actions as userActions,
  getIsShowCommentSection,
  getStar,
  getComment,
  getCurrentOrder
} from "../../../../redux/modules/user";
import { actions as orderActions } from "../../../../redux/modules/entities/orders";
import { bindActionCreators } from "redux";

class OrderItem extends Component {
  constructor(props) {
    super(props);
  }
  renderStars = () => {
    const { star } = this.props;
    const { setStar } = this.props.userActions;
    const stars = [1, 2, 3, 4, 5];

    return (
      <ul className="order-comment__stars">
        {stars.map((item, index) => {
          const className =
            index < star ? "order-comment__star--light" : "order-comment__star";

          return (
            <li
              key={index}
              onClick={() => setStar(index + 1)}
              className={className}
            >
              ★
            </li>
          );
        })}
      </ul>
    );
  };
  handleSubmitComment = () => {
    const {
      currentOrder: { comment, star, id: orderId }
    } = this.props;
    const {
      hideCommentSection,
      commentOrder,
      getOrders,
      resetCurrentOrder
    } = this.props.userActions;
    const { patchOrder } = this.props.orderActions;

    const newComment = {
      comment,
      star,
      time: Date.now()
    };

    commentOrder(newComment).then(({ response: { id: commentId } }) => {
      patchOrder(orderId, commentId).then(() => {
        hideCommentSection();
        resetCurrentOrder();
        getOrders();
      });
    });
  };
  handleCancelComment = () => {
    const {
      hideCommentSection,
      setComment,
      setStar,
      resetCurrentOrder
    } = this.props.userActions;
    const { currentOrder } = this.props;

    hideCommentSection();
    resetCurrentOrder();
  };
  renderComment = () => {
    const { hideCommentSection, setComment } = this.props.userActions;
    const { comment } = this.props;

    return (
      <div className="order-comment">
        <textarea
          className="order-comment__text"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        {this.renderStars()}
        <button
          type="button"
          className="order-comment__btn order-comment__btn--submit"
          onClick={this.handleSubmitComment}
        >
          提交
        </button>
        <button
          type="button"
          className="order-comment__btn order-comment__btn--cancel"
          onClick={this.handleCancelComment}
        >
          取消
        </button>
      </div>
    );
  };
  handleComment = orderId => {
    const { orders } = this.props;
    this.props.userActions.setCurrentOrderId(orderId);
    this.props.userActions.setCurrentOrderCommentId(orders);
    this.props.userActions.showCommentSection(orders);
  };
  render() {
    const {
      id,
      commentId,
      statusText: tag,
      orderPicUrl,
      channel: category,
      title,
      text,
      type
    } = this.props.data;
    const { deleteOrder, isShowCommentSection, currentOrder } = this.props;

    return (
      <div className="order-item">
        <div className="order-item__header">
          <div className="order-item__title">{title}</div>
        </div>
        <div className="order-item__main">
          <div className="order-item__img-wrapper">
            <img className="order-item__img" src={orderPicUrl} alt={title} />
            <span className="order-item__tag">{tag}</span>
          </div>
          <div className="order-item__content">
            {text.map((item, index) => (
              <div className="order-item__line" key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="order-item__footer">
          <span className="order-item__category">{category}</span>
          <div className="order-item__btns">
            {!commentId ? (
              <button
                type="button"
                className="order-item__btn order-item__btn--review"
                onClick={() => this.handleComment(id)}
              >
                评价
              </button>
            ) : null}
            <button
              type="button"
              className="order-item__btn order-item__btn--delete"
              onClick={() => deleteOrder(id)}
            >
              删除
            </button>
          </div>
        </div>
        {isShowCommentSection && id === currentOrder.id && this.renderComment()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isShowCommentSection: getIsShowCommentSection(state),
  star: getStar(state),
  comment: getComment(state),
  currentOrder: getCurrentOrder(state)
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  orderActions: bindActionCreators(orderActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
