var MessageEntry = React.createClass({
  render: function(){
    return (
      <div className="mesaage-entry">

        <div className="row">
          <div className="col-xs-3 col-md-2 col-lg-2 messages-entry-left-box">
            <div className="profile-image">
              <img src={this.props.message.image}/>
            </div>
          </div>
          <div className="col-xs-8 col-md-6 col-lg-6 message-left-container">
            <div className="message-text">
              {this.props.message.text}
            </div>
            <div className="author">{this.props.message.author}</div>
            <div className="time-stamp"><p>{this.props.message.id}</p></div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = MessageEntry;
