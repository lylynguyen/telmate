var MessageContainer = require('./messages/messageContainer');
var SlideShowContainer = require('./slideshow/slideshowContainer');

module.exports = React.createClass({
  render: function() {
    return (
      <div className=".container-fluid">
        <nav className="navbar navbar-custom"><h1>Notify</h1></nav>
        <div className="row">
          <div className="main-content col-xs-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
            <div className="col-xs-7 col-md-8 col-lg-8">
              <div>
                <MessageContainer/>
              </div>
            </div>
            <div className="image-content col-xs-5 col-md-4 col-lg-4">
              <div className="col-xs-10 col-md-10 col-lg-9">
                <div>
                  <SlideShowContainer/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});