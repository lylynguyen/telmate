(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MessageContainer = require('./messages/messageContainer');
var SlideShowContainer = require('./slideshow/slideshowContainer');

module.exports = React.createClass({
  displayName: 'exports',

  render: function () {
    return React.createElement(
      'div',
      { className: '.container-fluid' },
      React.createElement(
        'nav',
        { className: 'navbar navbar-custom' },
        React.createElement(
          'h1',
          null,
          'Notify'
        )
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'main-content col-xs-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1' },
          React.createElement(
            'div',
            { className: 'col-xs-7 col-md-8 col-lg-8' },
            React.createElement(
              'div',
              null,
              React.createElement(MessageContainer, null)
            )
          ),
          React.createElement(
            'div',
            { className: 'image-content col-xs-5 col-md-4 col-lg-4' },
            React.createElement(
              'div',
              { className: 'col-xs-10 col-md-10 col-lg-9' },
              React.createElement(
                'div',
                null,
                React.createElement(SlideShowContainer, null)
              )
            )
          )
        )
      )
    );
  }
});

},{"./messages/messageContainer":3,"./slideshow/slideshowContainer":7}],2:[function(require,module,exports){
var App = require('./app');

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"./app":1}],3:[function(require,module,exports){
var MessageEntry = require('./messageEntry');
var MessageForm = require('./messageForm');

var MessageContainer = React.createClass({
  displayName: 'MessageContainer',

  getInitialState: function () {
    return { data: [] };
  },

  componentDidMount: function () {
    this.loadMessages();
  },

  loadMessages: function () {
    $.ajax({
      url: '/api/comments',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function () {
        console.log('error');
      }.bind(this)
    });
  },

  formSubmit: function (message) {
    $.ajax({
      url: '/api/comments',
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function (data) {
        this.loadMessages();
        // this.setState({data: data});
      }.bind(this),
      error: function () {
        console.log('error');
      }.bind(this)
    });
  },

  render: function () {
    var messageList = this.state.data.map(function (message, i) {
      return React.createElement(MessageEntry, { key: i, message: message });
    });
    return React.createElement(
      'div',
      { className: 'message-container' },
      React.createElement(
        'div',
        { className: 'message-form' },
        React.createElement(MessageForm, { formSubmit: this.formSubmit })
      ),
      React.createElement(
        'div',
        { className: 'message-list' },
        messageList
      )
    );
  }
});

module.exports = MessageContainer;

},{"./messageEntry":4,"./messageForm":5}],4:[function(require,module,exports){
var MessageEntry = React.createClass({
  displayName: "MessageEntry",

  render: function () {
    return React.createElement(
      "div",
      { className: "mesaage-entry" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-xs-3 col-md-2 col-lg-2 messages-entry-left-box" },
          React.createElement(
            "div",
            { className: "profile-image" },
            React.createElement("img", { src: this.props.message.image })
          )
        ),
        React.createElement(
          "div",
          { className: "col-xs-8 col-md-6 col-lg-6 message-left-container" },
          React.createElement(
            "div",
            { className: "message-text" },
            this.props.message.text
          ),
          React.createElement(
            "div",
            { className: "author" },
            this.props.message.author
          ),
          React.createElement(
            "div",
            { className: "time-stamp" },
            React.createElement(
              "p",
              null,
              this.props.message.id
            )
          )
        )
      )
    );
  }
});

module.exports = MessageEntry;

},{}],5:[function(require,module,exports){
var MessageForm = React.createClass({
  displayName: "MessageForm",

  localsubmit: function (event) {
    event.preventDefault();
    var messageText = this.refs.message.value;
    var messageObj = {
      text: messageText,
      author: "Jared",
      image: "slc.jpeg"
    };
    this.props.formSubmit(messageObj);
    this.refs.messageForm.reset();
  },

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { id: "messageform", className: "message-form form-group", ref: "messageForm", onSubmit: this.localsubmit },
        React.createElement("textarea", { maxlength: "140", type: "text", name: "message", placeholder: "Enter text", className: "input form-control", ref: "message", required: true }),
        React.createElement(
          "button",
          { type: "submit", className: "btn submit-message-button text-center" },
          "POST"
        )
      )
    );
  }
});

module.exports = MessageForm;

},{}],6:[function(require,module,exports){
var ImageEntry = React.createClass({
  displayName: "ImageEntry",

  render: function () {
    return React.createElement(
      "div",
      { className: "image-entry" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "image" },
          React.createElement("img", { src: this.props.image.url })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            null,
            this.props.image.title
          )
        )
      )
    );
  }
});

module.exports = ImageEntry;

},{}],7:[function(require,module,exports){
// var Slider = require('react-slick');

// var SlideShowContainer = React.createClass({
//   render: function() {
//     var settings = {
//       dots: true
//     }
//     return (
//       <div className='container'>
//         <Slider {...settings}>
//           <img src='http://placekitten.com/g/400/200' />
//           <img src='http://placekitten.com/g/400/200' />
//           <img src='http://placekitten.com/g/400/200' />
//           <img src='http://placekitten.com/g/400/200' />
//         </Slider>
//       </div>
//     );
//   }
// });

var ImageEntry = require('./imageEntry');

var SlideShowContainer = React.createClass({
  displayName: 'SlideShowContainer',

  getInitialState: function () {
    return { images: [] };
  },

  componentDidMount: function () {
    this.loadImages();
  },

  loadImages: function () {
    $.ajax({
      url: '/api/slideshow',
      dataType: 'json',
      cache: false,
      success: function (images) {
        this.setState({ images: images });
      }.bind(this),
      error: function () {
        console.log('error');
      }.bind(this)
    });
  },

  render: function () {
    var imageList = this.state.images.map(function (image, i) {
      return React.createElement(ImageEntry, { key: i, image: image });
    });
    return React.createElement(
      'div',
      { className: 'image-container' },
      React.createElement(
        'div',
        { className: 'image-list' },
        imageList
      )
    );
  }
});

module.exports = SlideShowContainer;

},{"./imageEntry":6}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0cy9hcHAuanMiLCJwdWJsaWMvc2NyaXB0cy9tYWluLmpzIiwicHVibGljL3NjcmlwdHMvbWVzc2FnZXMvbWVzc2FnZUNvbnRhaW5lci5qcyIsInB1YmxpYy9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VFbnRyeS5qcyIsInB1YmxpYy9zY3JpcHRzL21lc3NhZ2VzL21lc3NhZ2VGb3JtLmpzIiwicHVibGljL3NjcmlwdHMvc2xpZGVzaG93L2ltYWdlRW50cnkuanMiLCJwdWJsaWMvc2NyaXB0cy9zbGlkZXNob3cvc2xpZGVzaG93Q29udGFpbmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxtQkFBbUIsUUFBUSw2QkFBUixDQUF2QjtBQUNBLElBQUkscUJBQXFCLFFBQVEsZ0NBQVIsQ0FBekI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLE1BQU0sV0FBTixDQUFrQjtBQUFBOztBQUNqQyxVQUFRLFlBQVc7QUFDakIsV0FDRTtBQUFBO01BQUEsRUFBSyxXQUFVLGtCQUFmO01BQ0U7QUFBQTtRQUFBLEVBQUssV0FBVSxzQkFBZjtRQUFzQztBQUFBO1VBQUE7VUFBQTtBQUFBO0FBQXRDLE9BREY7TUFFRTtBQUFBO1FBQUEsRUFBSyxXQUFVLEtBQWY7UUFDRTtBQUFBO1VBQUEsRUFBSyxXQUFVLDRFQUFmO1VBQ0U7QUFBQTtZQUFBLEVBQUssV0FBVSw0QkFBZjtZQUNFO0FBQUE7Y0FBQTtjQUNFLG9CQUFDLGdCQUFEO0FBREY7QUFERixXQURGO1VBTUU7QUFBQTtZQUFBLEVBQUssV0FBVSwwQ0FBZjtZQUNFO0FBQUE7Y0FBQSxFQUFLLFdBQVUsOEJBQWY7Y0FDRTtBQUFBO2dCQUFBO2dCQUNFLG9CQUFDLGtCQUFEO0FBREY7QUFERjtBQURGO0FBTkY7QUFERjtBQUZGLEtBREY7QUFxQkQ7QUF2QmdDLENBQWxCLENBQWpCOzs7QUNIQSxJQUFJLE1BQU0sUUFBUSxPQUFSLENBQVY7O0FBRUEsU0FBUyxNQUFULENBQWdCLG9CQUFDLEdBQUQsT0FBaEIsRUFBdUIsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQXZCOzs7QUNGQSxJQUFJLGVBQWUsUUFBUSxnQkFBUixDQUFuQjtBQUNBLElBQUksY0FBYyxRQUFRLGVBQVIsQ0FBbEI7O0FBRUEsSUFBSSxtQkFBbUIsTUFBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ3ZDLG1CQUFpQixZQUFVO0FBQ3pCLFdBQVEsRUFBQyxNQUFNLEVBQVAsRUFBUjtBQUNELEdBSHNDOztBQUt2QyxxQkFBbUIsWUFBVTtBQUMzQixTQUFLLFlBQUw7QUFDRCxHQVBzQzs7QUFTdkMsZ0JBQWMsWUFBVTtBQUN0QixNQUFFLElBQUYsQ0FBTztBQUNMLFdBQUssZUFEQTtBQUVMLGdCQUFVLE1BRkw7QUFHTCxhQUFPLEtBSEY7QUFJTCxlQUFTLFVBQVMsSUFBVCxFQUFjO0FBQ3JCLGFBQUssUUFBTCxDQUFjLEVBQUMsTUFBTSxJQUFQLEVBQWQ7QUFDRCxPQUZRLENBRVAsSUFGTyxDQUVGLElBRkUsQ0FKSjtBQU9MLGFBQU8sWUFBVTtBQUNmLGdCQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsT0FGTSxDQUVMLElBRkssQ0FFQSxJQUZBO0FBUEYsS0FBUDtBQVdELEdBckJzQzs7QUF1QnZDLGNBQVksVUFBUyxPQUFULEVBQWtCO0FBQzVCLE1BQUUsSUFBRixDQUFPO0FBQ0wsV0FBSyxlQURBO0FBRUwsZ0JBQVUsTUFGTDtBQUdMLFlBQU0sTUFIRDtBQUlMLFlBQU0sT0FKRDtBQUtMLGVBQVMsVUFBUyxJQUFULEVBQWU7QUFDdEIsYUFBSyxZQUFMOztBQUVELE9BSFEsQ0FHUCxJQUhPLENBR0YsSUFIRSxDQUxKO0FBU0wsYUFBTyxZQUFXO0FBQ2hCLGdCQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsT0FGTSxDQUVMLElBRkssQ0FFQSxJQUZBO0FBVEYsS0FBUDtBQWFELEdBckNzQzs7QUF1Q3ZDLFVBQVEsWUFBVTtBQUNoQixRQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixHQUFoQixDQUFvQixVQUFTLE9BQVQsRUFBa0IsQ0FBbEIsRUFBb0I7QUFDeEQsYUFDRSxvQkFBQyxZQUFELElBQWMsS0FBSyxDQUFuQixFQUFzQixTQUFTLE9BQS9CLEdBREY7QUFHRCxLQUppQixDQUFsQjtBQUtBLFdBQ0U7QUFBQTtNQUFBLEVBQUssV0FBVSxtQkFBZjtNQUNJO0FBQUE7UUFBQSxFQUFLLFdBQVUsY0FBZjtRQUNFLG9CQUFDLFdBQUQsSUFBYSxZQUFZLEtBQUssVUFBOUI7QUFERixPQURKO01BSUU7QUFBQTtRQUFBLEVBQUssV0FBVSxjQUFmO1FBQ0c7QUFESDtBQUpGLEtBREY7QUFVRDtBQXZEc0MsQ0FBbEIsQ0FBdkI7O0FBMERBLE9BQU8sT0FBUCxHQUFpQixnQkFBakI7OztBQzdEQSxJQUFJLGVBQWUsTUFBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ25DLFVBQVEsWUFBVTtBQUNoQixXQUNFO0FBQUE7TUFBQSxFQUFLLFdBQVUsZUFBZjtNQUVFO0FBQUE7UUFBQSxFQUFLLFdBQVUsS0FBZjtRQUNFO0FBQUE7VUFBQSxFQUFLLFdBQVUsb0RBQWY7VUFDRTtBQUFBO1lBQUEsRUFBSyxXQUFVLGVBQWY7WUFDRSw2QkFBSyxLQUFLLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBN0I7QUFERjtBQURGLFNBREY7UUFNRTtBQUFBO1VBQUEsRUFBSyxXQUFVLG1EQUFmO1VBQ0U7QUFBQTtZQUFBLEVBQUssV0FBVSxjQUFmO1lBQ0csS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUR0QixXQURGO1VBSUU7QUFBQTtZQUFBLEVBQUssV0FBVSxRQUFmO1lBQXlCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBNUMsV0FKRjtVQUtFO0FBQUE7WUFBQSxFQUFLLFdBQVUsWUFBZjtZQUE0QjtBQUFBO2NBQUE7Y0FBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CO0FBQXZCO0FBQTVCO0FBTEY7QUFORjtBQUZGLEtBREY7QUFtQkQ7QUFyQmtDLENBQWxCLENBQW5COztBQXdCQSxPQUFPLE9BQVAsR0FBaUIsWUFBakI7OztBQ3hCQSxJQUFJLGNBQWMsTUFBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ2xDLGVBQWEsVUFBUyxLQUFULEVBQWU7QUFDMUIsVUFBTSxjQUFOO0FBQ0EsUUFBSSxjQUFjLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsS0FBcEM7QUFDQSxRQUFJLGFBQWE7QUFDZixZQUFNLFdBRFM7QUFFZixjQUFRLE9BRk87QUFHZixhQUFPO0FBSFEsS0FBakI7QUFLQSxTQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFVBQXRCO0FBQ0EsU0FBSyxJQUFMLENBQVUsV0FBVixDQUFzQixLQUF0QjtBQUNELEdBWGlDOztBQWFsQyxVQUFRLFlBQVU7QUFDaEIsV0FDRTtBQUFBO01BQUE7TUFDRTtBQUFBO1FBQUEsRUFBTSxJQUFHLGFBQVQsRUFBdUIsV0FBVSx5QkFBakMsRUFBMkQsS0FBSSxhQUEvRCxFQUE2RSxVQUFVLEtBQUssV0FBNUY7UUFDRSxrQ0FBVSxXQUFVLEtBQXBCLEVBQTBCLE1BQUssTUFBL0IsRUFBc0MsTUFBSyxTQUEzQyxFQUFxRCxhQUFZLFlBQWpFLEVBQThFLFdBQVUsb0JBQXhGLEVBQTZHLEtBQUksU0FBakgsRUFBMkgsY0FBM0gsR0FERjtRQUVFO0FBQUE7VUFBQSxFQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLHVDQUFoQztVQUFBO0FBQUE7QUFGRjtBQURGLEtBREY7QUFRRDtBQXRCaUMsQ0FBbEIsQ0FBbEI7O0FBeUJBLE9BQU8sT0FBUCxHQUFpQixXQUFqQjs7O0FDekJBLElBQUksYUFBYSxNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7QUFDakMsVUFBUSxZQUFVO0FBQ2hCLFdBQ0U7QUFBQTtNQUFBLEVBQUssV0FBVSxhQUFmO01BQ0U7QUFBQTtRQUFBLEVBQUssV0FBVSxLQUFmO1FBQ0U7QUFBQTtVQUFBLEVBQUssV0FBVSxPQUFmO1VBQ0UsNkJBQUssS0FBSyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQTNCO0FBREYsU0FERjtRQUlFO0FBQUE7VUFBQTtVQUFLO0FBQUE7WUFBQTtZQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUI7QUFBckI7QUFBTDtBQUpGO0FBREYsS0FERjtBQVVEO0FBWmdDLENBQWxCLENBQWpCOztBQWVBLE9BQU8sT0FBUCxHQUFpQixVQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNPQSxJQUFJLGFBQWEsUUFBUSxjQUFSLENBQWpCOztBQUVBLElBQUkscUJBQXFCLE1BQU0sV0FBTixDQUFrQjtBQUFBOztBQUN6QyxtQkFBaUIsWUFBVTtBQUN6QixXQUFPLEVBQUMsUUFBUSxFQUFULEVBQVA7QUFDRCxHQUh3Qzs7QUFLekMscUJBQW1CLFlBQVU7QUFDM0IsU0FBSyxVQUFMO0FBQ0QsR0FQd0M7O0FBU3pDLGNBQVksWUFBVTtBQUNwQixNQUFFLElBQUYsQ0FBTztBQUNMLFdBQUksZ0JBREM7QUFFTCxnQkFBVSxNQUZMO0FBR0wsYUFBTyxLQUhGO0FBSUwsZUFBUyxVQUFTLE1BQVQsRUFBZ0I7QUFDdkIsYUFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLE1BQVIsRUFBZDtBQUNELE9BRlEsQ0FFUCxJQUZPLENBRUYsSUFGRSxDQUpKO0FBT0wsYUFBTyxZQUFZO0FBQ2pCLGdCQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsT0FGTSxDQUVMLElBRkssQ0FFQSxJQUZBO0FBUEYsS0FBUDtBQVdELEdBckJ3Qzs7QUF1QnpDLFVBQVEsWUFBVTtBQUNoQixRQUFJLFlBQVksS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixHQUFsQixDQUFzQixVQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBa0I7QUFDdEQsYUFDRSxvQkFBQyxVQUFELElBQVksS0FBSyxDQUFqQixFQUFvQixPQUFPLEtBQTNCLEdBREY7QUFHRCxLQUplLENBQWhCO0FBS0EsV0FDRTtBQUFBO01BQUEsRUFBSyxXQUFVLGlCQUFmO01BQ0U7QUFBQTtRQUFBLEVBQUssV0FBVSxZQUFmO1FBQ0c7QUFESDtBQURGLEtBREY7QUFPRDtBQXBDd0MsQ0FBbEIsQ0FBekI7O0FBdUNBLE9BQU8sT0FBUCxHQUFpQixrQkFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIE1lc3NhZ2VDb250YWluZXIgPSByZXF1aXJlKCcuL21lc3NhZ2VzL21lc3NhZ2VDb250YWluZXInKTtcbnZhciBTbGlkZVNob3dDb250YWluZXIgPSByZXF1aXJlKCcuL3NsaWRlc2hvdy9zbGlkZXNob3dDb250YWluZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiLmNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItY3VzdG9tXCI+PGgxPk5vdGlmeTwvaDE+PC9uYXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluLWNvbnRlbnQgY29sLXhzLTEyIGNvbC1tZC0xMCBjb2wtbWQtb2Zmc2V0LTEgY29sLWxnLTEwIGNvbC1sZy1vZmZzZXQtMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNyBjb2wtbWQtOCBjb2wtbGctOFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxNZXNzYWdlQ29udGFpbmVyLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtY29udGVudCBjb2wteHMtNSBjb2wtbWQtNCBjb2wtbGctNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMCBjb2wtbWQtMTAgY29sLWxnLTlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPFNsaWRlU2hvd0NvbnRhaW5lci8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTsiLCJ2YXIgQXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuUmVhY3RET00ucmVuZGVyKDxBcHAvPixkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIiwidmFyIE1lc3NhZ2VFbnRyeSA9IHJlcXVpcmUoJy4vbWVzc2FnZUVudHJ5Jyk7XG52YXIgTWVzc2FnZUZvcm0gPSByZXF1aXJlKCcuL21lc3NhZ2VGb3JtJyk7XG5cbnZhciBNZXNzYWdlQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICB7ZGF0YTogW119XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5sb2FkTWVzc2FnZXMoKTtcbiAgfSxcbiAgXG4gIGxvYWRNZXNzYWdlczogZnVuY3Rpb24oKXtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9jb21tZW50cycsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGRhdGF9KTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuXG4gIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9jb21tZW50cycsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YTogbWVzc2FnZSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2FkTWVzc2FnZXMoKTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7ZGF0YTogZGF0YX0pO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICB2YXIgbWVzc2FnZUxpc3QgPSB0aGlzLnN0YXRlLmRhdGEubWFwKGZ1bmN0aW9uKG1lc3NhZ2UsIGkpe1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE1lc3NhZ2VFbnRyeSBrZXk9e2l9IG1lc3NhZ2U9e21lc3NhZ2V9Lz5cbiAgICAgIClcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZS1mb3JtXCI+XG4gICAgICAgICAgICA8TWVzc2FnZUZvcm0gZm9ybVN1Ym1pdD17dGhpcy5mb3JtU3VibWl0fS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZS1saXN0XCI+XG4gICAgICAgICAge21lc3NhZ2VMaXN0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZUNvbnRhaW5lcjsiLCJ2YXIgTWVzc2FnZUVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVzYWFnZS1lbnRyeVwiPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMyBjb2wtbWQtMiBjb2wtbGctMiBtZXNzYWdlcy1lbnRyeS1sZWZ0LWJveFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlLWltYWdlXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPXt0aGlzLnByb3BzLm1lc3NhZ2UuaW1hZ2V9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTggY29sLW1kLTYgY29sLWxnLTYgbWVzc2FnZS1sZWZ0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlLXRleHRcIj5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMubWVzc2FnZS50ZXh0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF1dGhvclwiPnt0aGlzLnByb3BzLm1lc3NhZ2UuYXV0aG9yfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lLXN0YW1wXCI+PHA+e3RoaXMucHJvcHMubWVzc2FnZS5pZH08L3A+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlRW50cnk7XG4iLCJ2YXIgTWVzc2FnZUZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGxvY2Fsc3VibWl0OiBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgbWVzc2FnZVRleHQgPSB0aGlzLnJlZnMubWVzc2FnZS52YWx1ZTtcbiAgICB2YXIgbWVzc2FnZU9iaiA9IHtcbiAgICAgIHRleHQ6IG1lc3NhZ2VUZXh0LFxuICAgICAgYXV0aG9yOiBcIkphcmVkXCIsXG4gICAgICBpbWFnZTogXCJzbGMuanBlZ1wiXG4gICAgfVxuICAgIHRoaXMucHJvcHMuZm9ybVN1Ym1pdChtZXNzYWdlT2JqKTtcbiAgICB0aGlzLnJlZnMubWVzc2FnZUZvcm0ucmVzZXQoKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtIGlkPVwibWVzc2FnZWZvcm1cIiBjbGFzc05hbWU9XCJtZXNzYWdlLWZvcm0gZm9ybS1ncm91cFwiIHJlZj1cIm1lc3NhZ2VGb3JtXCIgb25TdWJtaXQ9e3RoaXMubG9jYWxzdWJtaXR9PlxuICAgICAgICAgIDx0ZXh0YXJlYSBtYXhsZW5ndGg9XCIxNDBcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0ZXh0XCIgY2xhc3NOYW1lPVwiaW5wdXQgZm9ybS1jb250cm9sXCIgcmVmPVwibWVzc2FnZVwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIHN1Ym1pdC1tZXNzYWdlLWJ1dHRvbiB0ZXh0LWNlbnRlclwiPlBPU1Q8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlRm9ybSIsInZhciBJbWFnZUVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtZW50cnlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5wcm9wcy5pbWFnZS51cmx9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PjxwPnt0aGlzLnByb3BzLmltYWdlLnRpdGxlfTwvcD48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlRW50cnk7XG4iLCIvLyB2YXIgU2xpZGVyID0gcmVxdWlyZSgncmVhY3Qtc2xpY2snKTtcblxuLy8gdmFyIFNsaWRlU2hvd0NvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbi8vICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbi8vICAgICB2YXIgc2V0dGluZ3MgPSB7XG4vLyAgICAgICBkb3RzOiB0cnVlXG4vLyAgICAgfVxuLy8gICAgIHJldHVybiAoXG4vLyAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbi8vICAgICAgICAgPFNsaWRlciB7Li4uc2V0dGluZ3N9PlxuLy8gICAgICAgICAgIDxpbWcgc3JjPSdodHRwOi8vcGxhY2VraXR0ZW4uY29tL2cvNDAwLzIwMCcgLz5cbi8vICAgICAgICAgICA8aW1nIHNyYz0naHR0cDovL3BsYWNla2l0dGVuLmNvbS9nLzQwMC8yMDAnIC8+XG4vLyAgICAgICAgICAgPGltZyBzcmM9J2h0dHA6Ly9wbGFjZWtpdHRlbi5jb20vZy80MDAvMjAwJyAvPlxuLy8gICAgICAgICAgIDxpbWcgc3JjPSdodHRwOi8vcGxhY2VraXR0ZW4uY29tL2cvNDAwLzIwMCcgLz5cbi8vICAgICAgICAgPC9TbGlkZXI+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICApO1xuLy8gICB9XG4vLyB9KTtcblxuXG5cbnZhciBJbWFnZUVudHJ5ID0gcmVxdWlyZSgnLi9pbWFnZUVudHJ5Jyk7XG5cbnZhciBTbGlkZVNob3dDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4ge2ltYWdlczogW119XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5sb2FkSW1hZ2VzKCk7XG4gIH0sXG5cbiAgbG9hZEltYWdlczogZnVuY3Rpb24oKXtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOicvYXBpL3NsaWRlc2hvdycsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaW1hZ2VzKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1hZ2VzOmltYWdlc30pO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGltYWdlTGlzdCA9IHRoaXMuc3RhdGUuaW1hZ2VzLm1hcChmdW5jdGlvbihpbWFnZSwgaSl7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW1hZ2VFbnRyeSBrZXk9e2l9IGltYWdlPXtpbWFnZX0vPlxuICAgICAgKVxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWxpc3RcIj5cbiAgICAgICAgICB7aW1hZ2VMaXN0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2xpZGVTaG93Q29udGFpbmVyO1xuIl19
