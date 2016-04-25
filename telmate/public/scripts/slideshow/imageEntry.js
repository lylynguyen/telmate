var ImageEntry = React.createClass({
  render: function(){
    return (
      <div className="image-entry">
        <div className="row">
          <div className="image">
            <img src={this.props.image.url}/>
          </div>
          <div><p>{this.props.image.title}</p></div>
        </div>
      </div>
    )
  }
});

module.exports = ImageEntry;
