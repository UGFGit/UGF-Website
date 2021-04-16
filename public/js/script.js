window.onload = function () {
  $("#next-button").click(() => {
    $(".slider-economic").slick("slickNext");
  });

  $("#prev-button").click(() => {
    $(".slider-economic").slick("slickPrev");
  });

  $("#act-next-button").click(() => {
    $(".slider").slick("slickNext");
  });

  $("#act-prev-button").click(() => {
    $(".slider").slick("slickPrev");
  });

  // read_more
  $(".read_more__btn").click(function (e) {
    e.preventDefault();
    $(this).parents(".read_more").find(".text").toggleClass("open");
    $(this).toggleClass("open");
    if (this.textContent == "Read Less") this.textContent = "Read more";
    else this.textContent = "Read Less";
  });
  $(".read_more__btn2").click(function (e) {
    e.preventDefault();
    $(this).parents(".read_more").find(".text2").toggleClass("open");
    $(this).toggleClass("open");
    if (this.textContent == "Read Less") this.textContent = "Read more";
    else this.textContent = "Read Less";
  });

  // menu dropdown
  $(".has_dropdown").click(function () {
    $(this).toggleClass("open");
    $(this).find(".inactive").toggleClass("active");
    console.log("clicked to menu point");
  });

  // menu
  $(".menu_btn").click(function () {
    $("header, body").toggleClass("active");
  });

  $(".wow").attr("data-wow-delay", "0.3s");
  $(".wow").addClass("animate__animated");

  // WOW
  new WOW().init();

  // slick
  if ($("div").hasClass("mob_slider") == true) {
    $(".mob_slider").slick({
      dots: true,
      arrows: false,
      pauseOnFocus: true,
      pauseOnHover: true,
      autoplaySpeed: 6000,
      speed: 500,
      adaptiveHeight: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  if ($("div").hasClass("slider") == true) {
    $(".slider").slick({
      dots: true,
      arrows: false,
      pauseOnFocus: true,
      pauseOnHover: true,
      autoplaySpeed: 6000,
      speed: 500,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }

  if ($("div").hasClass("slider-economic") == true) {
    $(".slider-economic").slick({
      dots: true,
      arrows: false,
      pauseOnFocus: true,
      pauseOnHover: true,
      autoplaySpeed: 4000,
      speed: 500,
      adaptiveHeight: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }
};

$(document).ready(function () {
  //    slick slide _main_slider_
  $(".main_slide_section").prepend('<div class="pagingInfo"></div>');

  var time = 2;
  var $slick,
    isPause,
    tick,
    percentTime = 0;

  $slick = $(".main_slider");
  var $status = $(".pagingInfo");

  $slick.on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $status.html("<span>" + i + " </span>  / " + slick.slideCount + " ");
    }
  );

  $slick.slick({
    dots: false,
    arrows: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    speed: 500,
    adaptiveHeight: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  });

  $slick.on({
    mouseenter: function () {
      isPause = true;
    },
    mouseleave: function () {
      isPause = false;
      startProgressbar();
    },
    mousedown: function () {
      $rbar.fadeOut("slow");
      percentTime = 0;
    },
  });

  function startProgressbar() {
    clearTimeout(tick);
    isPause = false;
    tick = setInterval(interval, 20);
    $rbar.fadeIn("slow");
  }

  var $rbar = $(".main_slider .circle-go");
  var rlen = 2 * Math.PI * $rbar.attr("r");

  function interval() {
    if (isPause === false) {
      percentTime += 1 / (time + 0.1);
      $rbar.css({
        strokeDasharray: rlen,
        strokeDashoffset: rlen * (1 - percentTime / 100),
      });
      if (percentTime >= 100) {
        $slick.slick("slickNext");
        percentTime = 0;
        startProgressbar();
      }
    }
  }

  startProgressbar();
});

const GetArticles = () => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@utopiagenesis"
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

const ParseFeed = async () => {
  const result = await GetArticles();

  const articles = await result.items.map((item) => {
    const obj = {
      url: item.link,
      title: item.title,
      thumb: item.thumbnail,
      timestamp: String(item.pubDate).split(" ")[1],
      date: String(item.pubDate).split(" ")[0],
    };

    return obj;
  });

  articles.forEach((article) => {
    console.log(article.link);
    const obj = `<div class="col-lg-4 col-md-6 wow animate__fadeInUp">
      <div class="blog_item">
          <a href="${article.url}" target="_blank">
              <div class="img_box">
                  <img src="${article.thumb}" alt="img">
              </div>
              <div class="text">
                  <p class="title">${article.title}</p>
                  <p class="date">${article.date}</p>
              </div>
          </a>
      </div>
  </div>`;

    $("#blog_items").append(obj);
  });
};

ParseFeed();

// update rss
