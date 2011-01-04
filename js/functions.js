function throb(max,fcn){
  var count = 0;

  (function throbber(){
    $('#green_glow').fadeIn('slow',function(){
      $(this).fadeOut('slow',function(){
        count++;
        if(count < max){
          throbber();
        }else if(fcn){
          fcn();
        }
        }) 
      });
  })()
};

  function animateBusiness(start,stop){
    var offset   = -100,
        business = $('.business'),
        start    = start || 'small_store',
        stop     = stop  || 'large_store';

    business.attr('id',start);

    business.css({left:offset}).fadeIn(function(){
      (function(){
        offset += 3;
        var continueAnimation = arguments.callee;

        business.css({left:offset+"px"});

        if(offset < 410 || offset > 410 && offset < 1000){
          setTimeout(arguments.callee,30);
        }else if(offset < 1000){
          beltOn = false

          throb(3,function(){ 
            business.attr('id',stop);
            // funky transition
            offset = 410;
            beltOn = true;
            continueAnimation();
          });

        }else if( offset >= 1000){
          setTimeout(animateBusiness,2000);
        }
      })()
    });
  };


  window.beltOn = true,
  window.houseOn = true;

  function animateBelt(){
    var counter  = 0,
        belts    = $('#belt-left,#belt-right');
    
    (function(){
      if(beltOn){
        counter += 3;
        belts.css("background-position",counter%624 +"px 0");
      }

      setTimeout(arguments.callee,30);
    })();
  };

$(function(){
    $('.fadeIn').fadeIn(2000,function(){
      $('#belt-left,#belt-right').fadeIn(2000,function(){
      $('.business').fadeIn(function(){
      });
    });
  });  

  animateBelt();
  animateBusiness();
});
