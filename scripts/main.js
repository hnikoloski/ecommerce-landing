$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#mainhead").addClass("sticky");
    } else {
      $("#mainhead").removeClass("sticky");
    }
  });

  // Lang Switcher
  $(".lang-switcher .current-lang").on("click", () => {
    $(this).find(".dropdown").addClass("active");
  });
  $(".lang-switcher .dropdown p").on("click", function () {
    //Check if Lang is the current one
    if (!$(this).hasClass("active")) {
      $(".lang-switcher .dropdown p").removeClass("active");
      $(this).addClass("active");
      $(".lang-switcher .current-lang").text($(this).text());

      //Change Lang (sort of)
      $("html").attr("lang", $(this).attr("data-lang"));
    }
    //Close it anyway
    $(this).parent().removeClass("active");
  });

  // add to.. message
  $(".product-buttons a").on("click", function (e) {
    e.preventDefault();
    $(".btn-messages").remove(); // Remove box if there is one
    let boxMessage = $(this).attr("data-message"); //Set Message
    // Check if added to fav
    if ($(this).hasClass("add-to-fav")) {
      $(this).toggleClass("added");
      if (!$(this).hasClass("added")) {
        boxMessage = "Removed from favorites.";
      } else {
        boxMessage = "Added to favorites.";
      }
    }

    let messageBox = `<div class="btn-messages">
                          <p class="message">${boxMessage}</p>
                      </div>`;

    $(".product-archive").append(messageBox);
    // Show it and then Hide it after couple of sec:
    $(".btn-messages")
      .fadeIn()
      .delay(2500)
      .queue(function (n) {
        $(".btn-messages").remove();
        n();
      });
  });

  // add colors to selected filters
  function updateColorFilter(op) {}
  $("#product-color-form .form-group label").on("click", function () {
    let removableSelector;
    if ($(this).hasClass("selected")) {
      removableSelector = "." + $(this).attr("data-color") + "-selection";
      $(this).removeClass("selected");
      $(removableSelector).remove();
    } else {
      $(this).addClass("selected");
      $("#product-color-form ul").append(
        `<li class="${$(this).attr("data-color")}-selection">${$(this).attr(
          "data-color"
        )}</li>`
      );
    }
  });

  // make the fade effect a watterfall effect
  let i = 1;
  $(".single-product.animated").each(function () {
    $(this).attr("data-delay", 100 * i);
    i++;
  });

  // Slider/s
  $(".slick-slider").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow:
      '<a href="#!" class="slick-next"><i class="fas fa-chevron-right"></i></a>',
    prevArrow:
      '<a href="#!" class="slick-prev"><i class="fas fa-chevron-left"></i></a>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  // Update Price on filter
  $("#input-left").on("input", function () {
    $(".filtered-price .min").text(
      parseFloat($(this).val()).toLocaleString("en").replace(",", ".")
    );
  });
  $("#input-right").on("input", function () {
    $(".filtered-price .max").text(
      parseFloat($(this).val()).toLocaleString("en").replace(",", ".")
    );
  });
  // Mob Menu
  $("#mob-trigger").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $("#mainhead").toggleClass("active");
  });
  if ($(window).width() < 769) {
    $("#mainhead").removeClass("animated fadeInDown");
  }
});
