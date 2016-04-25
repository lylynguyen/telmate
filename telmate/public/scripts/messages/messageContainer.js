var MessageEntry = require('./messageEntry');
var MessageForm = require('./messageForm');

var MessageContainer = React.createClass({
  getInitialState: function(){
    return  {data: []}
  },

  componentDidMount: function(){
    this.loadMessages();
  },
  
  loadMessages: function(){
    $.ajax({
      url: '/api/comments',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(){
        console.log('error');
      }.bind(this)
    });
  },

  formSubmit: function(message) {
    $.ajax({
      url: '/api/comments',
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(data) {
        this.loadMessages();
        // this.setState({data: data});
      }.bind(this),
      error: function() {
        console.log('error');
      }.bind(this)
    });
  },

  render: function(){
    var messageList = this.state.data.map(function(message, i){
      return (
        <MessageEntry key={i} message={message}/>
      )
    });
    return (
      <div className="message-container">
          <div className="message-form">
            <MessageForm formSubmit={this.formSubmit}/>
          </div>
        <div className="message-list">
          {messageList}
        </div>
      </div>
    )
  }
});

module.exports = MessageContainer;