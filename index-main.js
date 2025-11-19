$(document).ready(function(){
    $(this).scrollTop(0);
});
$(document).ready(function(){ 
  	$('.scroll-top-footer').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
});

/*
var prev = 0;
var $window = $(window);
var nav = $('.header-top');
$window.on('scroll', function(){
  var scrollTop = $window.scrollTop();
  nav.toggleClass('hidden', scrollTop > prev);
  prev = scrollTop;
});*/


    
 

$(document).ready(function () {
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
        $('.header-top').addClass('bg-change');
        } else {
        $('.header-top').removeClass('bg-change');
        }
    });
});



$(document).ready(function () {
    var pause = false;
    var item=  $('.select-item');
    var block=  $('.bg-block-mo');
    var k =0;

    setInterval(function () {
        if (!pause) {
            var $this = item.eq(k);
            
            if (item.hasClass('active'))  {
            item.removeClass('active');
            };
            block.removeClass('active').eq(k).addClass('active');
            $this.addClass('active');
            k++;
            if (k >= block.length ) {
                k = 0;
            }
        }
    }, 3000);

    item.hover(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass('active');
        block.removeClass('active');
        block.eq($(this).index()).addClass('active');
        pause = true;
    }, function () {
            pause = false;
    });

});


$(document).ready(function () {
    var controller = new ScrollMagic.Controller();
    $(function () {
    //var tween = TweenMax.to(".block-list", 1, {className: "+=scrollend"});

    var $block_list = $('.block-list'),
        $block_item = $block_list.find('.block-list__item'),
        block_list_width = $block_list.outerWidth(),
        block_item_width = $block_item.outerWidth(),
        total_width = block_item_width * $block_item.length,
        travel_distance = total_width - block_list_width - 759;

        console.log($block_item.length)
        
        var scene = new ScrollMagic.Scene({
            triggerElement: "#second", 
            duration: '200%',
            triggerHook: 0,
        })

        //.setPin('#second',{pushFollowers: true})
        .setPin('.block-list')
        //.setTween(tween)
        .addTo(controller)
      
    
    scene.on("end", function (event) {
        console.log("Hit end point of scene.");
    });
   
    scene.on('progress', function(e) {
        var progress = e.progress,
            move = -travel_distance * progress + "px";
        if(move < 13000+'px')
        {
            console.log("this last element")
        }
        else{
            console.log("this is not last element")
        }
        $block_list.css({
        transform: "translateX(" + move + ")"
        });
    });

    });


})
  




//  for imgae change desktop start

const slideshowImages = document.querySelectorAll(".slider-9-img-box img");

const nextImageDelay = 2000;
let currentImageCounter = 1; // setting a variable to keep track of the current image (slide)

// slideshowImages[currentImageCounter].style.display = "block";
slideshowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
  // slideshowImages[currentImageCounter].style.display = "none";
  slideshowImages[currentImageCounter].style.opacity = 0;

  currentImageCounter = (currentImageCounter+1) % slideshowImages.length;

  // slideshowImages[currentImageCounter].style.display = "block";
  slideshowImages[currentImageCounter].style.opacity = 1;
}


// for imgae change desktop end



/*const targetDiv = document.querySelector('second');
const childElements = targetDiv.querySelectorAll('.slide');
const enterClass = 'active-animation';

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(enterClass);
    } else {
      entry.target.classList.remove(enterClass);
    }
  });
}, {
  // Set the root margin to center the intersection threshold
  rootMargin: '0px', 
  // Set the intersection threshold to center of the viewport
  threshold: 0.5 
});

childElements.forEach(slide => {
  observer.observe(slide);
});*/


//for desktop  add class slick sldier start

const targetDiv = document.querySelector('.moves_mheel_sliser');
const childElements = targetDiv.querySelectorAll('.slick-item');
const enterClass = 'active-animation';

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(enterClass);
    } else {
      entry.target.classList.remove(enterClass);
    }
  });
}, {
  // Set the root margin to center the intersection threshold
  rootMargin: '0px', 
  // Set the intersection threshold to center of the viewport
  threshold: 0.5 
});

childElements.forEach(slide => {
  observer.observe(slide);
});

//for desktop  add class slick sldier end


document.querySelector('section').scrollIntoView({ 
  behavior: 'smooth' 
});


