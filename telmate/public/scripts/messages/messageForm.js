var MessageForm = React.createClass({
  localsubmit: function(event){
    event.preventDefault();
    var messageText = this.refs.message.value;
    var messageObj = {
      text: messageText,
      author: "Jared",
      image: "slc.jpeg"
    }
    this.props.formSubmit(messageObj);
    this.refs.messageForm.reset();
  },

  render: function(){
    return (
      <div>
        <form id="messageform" className="message-form form-group" ref="messageForm" onSubmit={this.localsubmit}>
          <textarea maxlength="140" type="text" name="message" placeholder="Enter text" className="input form-control" ref="message" required></textarea>
          <button type="submit" className="btn submit-message-button text-center">POST</button>
        </form>
      </div>
    )
  }
});

module.exports = MessageForm