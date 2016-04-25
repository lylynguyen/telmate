// var Slider = require('react-slick');

// var SlideShowContainer = React.createClass({
//   render: function() {
//     var settings = {
//       dots: true
//     }
//     return (
//       <div className='container'>
//         <Slider {...settings}>
//           <img src='' />
//           <img src='' />
//           <img src='' />
//           <img src='' />
//         </Slider>
//       </div>
//     );
//   }
// });



var ImageEntry = require('./imageEntry');

var SlideShowContainer = React.createClass({
  getInitialState: function(){
    return {images: []}
  },

  componentDidMount: function(){
    this.loadImages();
  },

  loadImages: function(){
    $.ajax({
      url:'/api/slideshow',
      dataType: 'json',
      cache: false,
      success: function(images){
        this.setState({images:images});
      }.bind(this),
      error: function () {
        console.log('error');
      }.bind(this)
    });
  },

  render: function(){
    var imageList = this.state.images.map(function(image, i){
      return (
        <ImageEntry key={i} image={image}/>
      )
    });
    return (
      <div className="image-container">
        <div className="image-list">
          {imageList}
        </div>
      </div>
    )
  }
});

module.exports = SlideShowContainer;
