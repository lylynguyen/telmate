
// var App = React.createClass({

//   render: function() {
//     return (
//       <div className=".container-fluid">
//         <nav className="navbar navbar-custom"><h1>Notify</h1></nav>
//         <div className="row">
//           <div className="main-content col-xs-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
//             <div className="col-xs-7 col-md-8 col-lg-8">
//               <div>
//                 <MessageContainer/>
//               </div>
//             </div>
//             <div className="image-content col-xs-5 col-md-4 col-lg-4">
//               <div className="col-xs-10 col-md-10 col-lg-9">
//                 <div>
//                   <SlideShowContainer/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// });

// var SlideShowContainer = React.createClass({
//   getInitialState: function(){
//     return {images: []}
//   },

//   componentDidMount: function(){
//     this.loadImages();
//   },

//   loadImages: function(){
//     $.ajax({
//       url:'/api/slideshow',
//       dataType: 'json',
//       cache: false,
//       success: function(images){
//         this.setState({images:images});
//       }.bind(this),
//       error: function () {
//         console.log('error');
//       }.bind(this)
//     });
//   },

// render: function(){
//   var imageList = this.state.images.map(function(image, i){
//     return (
//       <ImageEntry key={i} image={image}/>
//     )
//   });
//     return (
//       <div className="image-container">
//         <div className="image-list">
//           {imageList}
//         </div>
//       </div>
//     )
//   }
// });

// var ImageEntry = React.createClass({
//   render: function(){
//     return (
//       <div className="image-entry">
//         <div className="row">
//           <div className="image">
//             <img src={this.props.image.url}/>
//           </div>
//           <div><p>{this.props.image.title}</p></div>
//         </div>
//       </div>
//     )
//   }
// });

// var MessageContainer = React.createClass({

//   getInitialState: function(){
//     return  {data: []}
//   },

//   componentDidMount: function(){
//     this.loadMessages();
//   },
  
//   loadMessages: function(){
//     $.ajax({
//       url: '/api/comments',
//       dataType: 'json',
//       cache: false,
//       success: function(data){
//         this.setState({data: data});
//       }.bind(this),
//       error: function(){
//         console.log('error');
//       }.bind(this)
//     });
//   },


//   formSubmit: function(message) {
//     $.ajax({
//       url: '/api/comments',
//       dataType: 'json',
//       type: 'POST',
//       data: message,
//       success: function(data) {
//         this.loadMessages();
//         // this.setState({data: data});
//       }.bind(this),
//       error: function() {
//         console.log('error');
//       }.bind(this)
//     });
//   },

//   render: function(){
//     var messageList = this.state.data.map(function(message, i){
//       return (
//         <MessageEntry key={i} message={message}/>
//       )
//     });
//     return (
//       <div className="message-container">
//           <div className="message-form">
//             <MessageForm formSubmit={this.formSubmit}/>
//           </div>
//         <div className="message-list">
//           {messageList}
//         </div>
//       </div>
//     )
//   }
// });


// var MessageEntry = React.createClass({
//   render: function(){
//     return (
//       <div className="mesaage-entry">

//         <div className="row">
//           <div className="col-xs-3 col-md-2 col-lg-2 messages-entry-left-box">
//             <div className="profile-image">
//               <img src={this.props.message.image}/>
//             </div>
//           </div>
//           <div className="col-xs-8 col-md-6 col-lg-6 message-left-container">
//             <div className="message-text">
//               {this.props.message.text}
//             </div>
//             <div className="author">{this.props.message.author}</div>
//             <div className="time-stamp"><p>{this.props.message.id}</p></div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// });

// var MessageForm = React.createClass({

//   localsubmit: function(event){
//     event.preventDefault();
//     var messageText = this.refs.message.value;
//     var messageObj = {
//       text: messageText,
//       author: "Jared",
//       image: "slc.jpeg"
//     }
//     this.props.formSubmit(messageObj);
//     this.refs.messageForm.reset();
//   },

//   render: function(){
//     return (
//       <div>
//         <form id="messageform" className="message-form form-group" ref="messageForm" onSubmit={this.localsubmit}>
//           <textarea maxlength="140" type="text" name="message" placeholder="Enter text" className="input form-control" ref="message" required></textarea>
//           <button type="submit" className="btn submit-message-button text-center">POST</button>
//         </form>
//       </div>
//     )
//   }
// });

// ReactDOM.render(<App/>,document.getElementById('app'));
