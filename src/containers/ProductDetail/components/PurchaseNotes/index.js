import React, { Component } from "react";
import "./style.css";

class PurchaseNotes extends Component {
  render() {
    const { purchaseNotes, validityPeriod } = this.props.data;

    return (
      <div className="purchase-notes">
        <div className="purchase-notes__header">
          <span className="purchase-notes__title">购买须知</span>
          <i className="purchase-notes__title-icon"></i>
        </div>
        <div className="purchase-notes__content">
          <dl className="purchase-notes__item">
            <dt className="purchase-notes__item-title">有效期</dt>
            <dd>
              <p className="purchase-notes__item-listitem">{validityPeriod}</p>
            </dd>
          </dl>
          {purchaseNotes.map(({ title, content }, index) => (
            <dl key={index} className="purchase-notes__item">
              <dt className="purchase-notes__item-title">{title}</dt>
              <dd>
                <p className="purchase-notes__item-listitem">{content}</p>
              </dd>
            </dl>
          ))}
        </div>
      </div>
    );
  }
}

export default PurchaseNotes;
