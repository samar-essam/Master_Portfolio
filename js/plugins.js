// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Place any jQuery/helper plugins in here.
if (
  (!(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var i = e(this),
          a = i.data("plugin.backgroundBlur"),
          s = e.extend({}, n.DEFAULTS, i.data(), "object" == typeof t && t);
        a || i.data("plugin.backgroundBlur", (a = new n(this, s))),
          "fadeIn" === t
            ? a.fadeIn()
            : "fadeOut" === t
            ? a.fadeOut()
            : "string" == typeof t && a.generateBlurredImage(t);
      });
    }
    var i = (function () {
        for (
          var e,
            t = 3,
            i = document.createElement("div"),
            a = i.getElementsByTagName("i");
          (i.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->"),
            a[0];

        );
        return t > 4 ? t : e;
      })(),
      a = function () {
        return "_" + Math.random().toString(36).substr(2, 9);
      },
      s = {
        svgns: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        createElement: function (e, t) {
          var i = document.createElementNS(s.svgns, e);
          return t && s.setAttr(i, t), i;
        },
        setAttr: function (e, t) {
          for (var i in t)
            "href" === i
              ? e.setAttributeNS(s.xlink, i, t[i])
              : e.setAttribute(i, t[i]);
          return e;
        },
      },
      n = function (t, i) {
        (this.internalID = a()),
          (this.$element = e(t)),
          (this.$width = this.$element.width()),
          (this.$height = this.$element.height()),
          (this.element = t),
          (this.options = e.extend({}, n.DEFAULTS, i)),
          (this.$overlayEl = this.createOverlay()),
          (this.$blurredImage = {}),
          (this.useVelocity = this.detectVelocity()),
          this.attachListeners(),
          this.generateBlurredImage(this.options.imageURL);
      };
    (n.VERSION = "0.1.1"),
      (n.DEFAULTS = {
        imageURL: "",
        blurAmount: 10,
        imageClass: "",
        overlayClass: "",
        duration: !1,
        opacity: 1,
      }),
      (n.prototype.detectVelocity = function () {
        return !!window.jQuery.Velocity;
      }),
      (n.prototype.attachListeners = function () {
        this.$element.on("ui.blur.loaded", e.proxy(this.fadeIn, this)),
          this.$element.on("ui.blur.unload", e.proxy(this.fadeOut, this));
      }),
      (n.prototype.fadeIn = function () {
        this.options.duration &&
          this.options.duration > 0 &&
          (this.useVelocity
            ? this.$blurredImage.velocity(
                { opacity: this.options.opacity },
                { duration: this.options.duration }
              )
            : this.$blurredImage.animate(
                { opacity: this.options.opacity },
                { duration: this.options.duration }
              ));
      }),
      (n.prototype.fadeOut = function () {
        this.options.duration && this.options.duration > 0
          ? this.useVelocity
            ? this.$blurredImage.velocity(
                { opacity: 0 },
                { duration: this.options.duration }
              )
            : this.$blurredImage.animate(
                { opacity: 0 },
                { duration: this.options.duration }
              )
          : this.$blurredImage.css({ opacity: 0 });
      }),
      (n.prototype.generateBlurredImage = function (e) {
        var t = this.$blurredImage;
        (this.internalID = a()),
          t.length > 0 &&
            (this.options.duration && this.options.duration > 0
              ? this.useVelocity
                ? t.first().velocity(
                    { opacity: 0 },
                    {
                      duration: this.options.duration,
                      complete: function () {
                        t.remove();
                      },
                    }
                  )
                : t.first().animate(
                    { opacity: 0 },
                    {
                      duration: this.options.duration,
                      complete: function () {
                        t.remove();
                      },
                    }
                  )
              : t.remove()),
          i
            ? (this.$blurredImage = this.createIMG(
                e,
                this.$width,
                this.$height
              ))
            : (this.$blurredImage = this.createSVG(
                e,
                this.$width,
                this.$height
              ));
      }),
      (n.prototype.createOverlay = function () {
        return this.options.overlayClass && "" !== this.options.overlayClass
          ? e("<div></div>")
              .prependTo(this.$element)
              .addClass(this.options.overlayClass)
          : !1;
      }),
      (n.prototype.createSVG = function (t, i, a) {
        var n = this,
          r = s.createElement("svg", {
            xmlns: s.svgns,
            version: "1.1",
            width: i,
            height: a,
            id: "blurred" + this.internalID,
            class: this.options.imageClass,
            viewBox: "0 0 " + i + " " + a,
            preserveAspectRatio: "none",
          }),
          o = "blur" + this.internalID,
          l = s.createElement("filter", { id: o }),
          d = s.createElement("feGaussianBlur", {
            in: "SourceGraphic",
            stdDeviation: this.options.blurAmount,
          }),
          p = s.createElement("image", {
            x: 0,
            y: 0,
            width: i,
            height: a,
            externalResourcesRequired: "true",
            href: t,
            style: "filter:url(#" + o + ")",
            preserveAspectRatio: "none",
          });
        p.addEventListener(
          "load",
          function () {
            n.$element.trigger("ui.blur.loaded");
          },
          !0
        ),
          p.addEventListener(
            "SVGLoad",
            function () {
              n.$element.trigger("ui.blur.loaded");
            },
            !0
          ),
          l.appendChild(d),
          r.appendChild(l),
          r.appendChild(p);
        var c = e(r);
        return (
          n.options.duration &&
            n.options.duration > 0 &&
            (c.css({ opacity: 0 }),
            window.setTimeout(function () {
              "0" === c.css("opacity") && c.css({ opacity: 1 });
            }, this.options.duration + 100)),
          this.element.insertBefore(r, this.element.firstChild),
          c
        );
      }),
      (n.prototype.createIMG = function (e, t, i) {
        var a = this,
          s = this.prependImage(e),
          n =
            2 * this.options.blurAmount > 100
              ? 100
              : 2 * this.options.blurAmount;
        return (
          s
            .css({
              filter:
                "progid:DXImageTransform.Microsoft.Blur(pixelradius=" +
                n +
                ") ",
              top: 2.5 * -this.options.blurAmount,
              left: 2.5 * -this.options.blurAmount,
              width: t + 2.5 * this.options.blurAmount,
              height: i + 2.5 * this.options.blurAmount,
            })
            .attr("id", "blurred" + this.internalID),
          s.load(function () {
            a.$element.trigger("ui.blur.loaded");
          }),
          this.options.duration &&
            this.options.duration > 0 &&
            window.setTimeout(function () {
              "0" === s.css("opacity") && s.css({ opacity: 1 });
            }, this.options.duration + 100),
          s
        );
      }),
      (n.prototype.prependImage = function (t) {
        var i,
          a = e('<img src="' + t + '" />');
        return (i = this.$overlayEl
          ? a
              .insertBefore(this.$overlayEl)
              .attr("id", this.internalID)
              .addClass(this.options.imageClass)
          : a
              .prependTo(this.$element)
              .attr("id", this.internalID)
              .addClass(this.options.imageClass));
      });
    var r = e.fn.backgroundBlur;
    (e.fn.backgroundBlur = t),
      (e.fn.backgroundBlur.Constructor = n),
      (e.fn.backgroundBlur.noConflict = function () {
        return (e.fn.backgroundBlur = r), this;
      });
  })(jQuery),
  (function (e) {
    "use strict";
    (e.ajaxChimp = {
      responses: {
        "We have sent you a confirmation email": 0,
        "Please enter a value": 1,
        "An email address must contain a single @": 2,
        "The domain portion of the email address is invalid (the portion after the @: )": 3,
        "The username portion of the email address is invalid (the portion before the @: )": 4,
        "This email address looks fake or invalid. Please enter a real email address": 5,
      },
      translations: { en: null },
      init: function (t, i) {
        e(t).ajaxChimp(i);
      },
    }),
      (e.fn.ajaxChimp = function (t) {
        return (
          e(this).each(function (i, a) {
            var s = e(a),
              n = s.find("input[type=email]"),
              r = s.find("label[for=" + n.attr("id") + "]"),
              o = e.extend({ url: s.attr("action"), language: "en" }, t),
              l = o.url.replace("/post?", "/post-json?").concat("&c=?");
            s.attr("novalidate", "true"),
              n.attr("name", "EMAIL"),
              s.submit(function () {
                function t(t) {
                  if ("success" === t.result)
                    (i = "We have sent you a confirmation email"),
                      r.removeClass("error").addClass("valid"),
                      n.removeClass("error").addClass("valid");
                  else {
                    n.removeClass("valid").addClass("error"),
                      r.removeClass("valid").addClass("error");
                    var a = -1;
                    try {
                      var s = t.msg.split(" - ", 2);
                      if (void 0 === s[1]) i = t.msg;
                      else {
                        var l = parseInt(s[0], 10);
                        l.toString() === s[0]
                          ? ((a = s[0]), (i = s[1]))
                          : ((a = -1), (i = t.msg));
                      }
                    } catch (d) {
                      (a = -1), (i = t.msg);
                    }
                  }
                  "en" !== o.language &&
                    void 0 !== e.ajaxChimp.responses[i] &&
                    e.ajaxChimp.translations &&
                    e.ajaxChimp.translations[o.language] &&
                    e.ajaxChimp.translations[o.language][
                      e.ajaxChimp.responses[i]
                    ] &&
                    (i =
                      e.ajaxChimp.translations[o.language][
                        e.ajaxChimp.responses[i]
                      ]),
                    r.html(i),
                    r.show(2e3),
                    o.callback && o.callback(t);
                }
                var i,
                  a = {},
                  d = s.serializeArray();
                e.each(d, function (e, t) {
                  a[t.name] = t.value;
                }),
                  e.ajax({
                    url: l,
                    data: a,
                    success: t,
                    dataType: "jsonp",
                    error: function (e, t) {
                      console.log("mailchimp ajax submit error: " + t);
                    },
                  });
                var p = "Submitting...";
                return (
                  "en" !== o.language &&
                    e.ajaxChimp.translations &&
                    e.ajaxChimp.translations[o.language] &&
                    e.ajaxChimp.translations[o.language].submit &&
                    (p = e.ajaxChimp.translations[o.language].submit),
                  r.html(p).show(2e3),
                  !1
                );
              });
          }),
          this
        );
      });
  })(jQuery),
  !(function () {
    "use strict";
    function e(e) {
      e.fn.swiper = function (t) {
        var a;
        return (
          e(this).each(function () {
            var e = new i(this, t);
            a || (a = e);
          }),
          a
        );
      };
    }
    var t,
      i = function (e, a) {
        function s(e) {
          return Math.floor(e);
        }
        function n() {
          w.autoplayTimeoutId = setTimeout(function () {
            w.params.loop
              ? (w.fixLoop(), w._slideNext(), w.emit("onAutoplay", w))
              : w.isEnd
              ? a.autoplayStopOnLast
                ? w.stopAutoplay()
                : (w._slideTo(0), w.emit("onAutoplay", w))
              : (w._slideNext(), w.emit("onAutoplay", w));
          }, w.params.autoplay);
        }
        function r(e, i) {
          var a = t(e.target);
          if (!a.is(i))
            if ("string" == typeof i) a = a.parents(i);
            else if (i.nodeType) {
              var s;
              return (
                a.parents().each(function (e, t) {
                  t === i && (s = i);
                }),
                s ? i : void 0
              );
            }
          return 0 !== a.length ? a[0] : void 0;
        }
        function o(e, t) {
          t = t || {};
          var i = window.MutationObserver || window.WebkitMutationObserver,
            a = new i(function (e) {
              e.forEach(function (e) {
                w.onResize(!0), w.emit("onObserverUpdate", w, e);
              });
            });
          a.observe(e, {
            attributes: "undefined" == typeof t.attributes ? !0 : t.attributes,
            childList: "undefined" == typeof t.childList ? !0 : t.childList,
            characterData:
              "undefined" == typeof t.characterData ? !0 : t.characterData,
          }),
            w.observers.push(a);
        }
        function l(e) {
          e.originalEvent && (e = e.originalEvent);
          var t = e.keyCode || e.charCode;
          if (
            !w.params.allowSwipeToNext &&
            ((w.isHorizontal() && 39 === t) || (!w.isHorizontal() && 40 === t))
          )
            return !1;
          if (
            !w.params.allowSwipeToPrev &&
            ((w.isHorizontal() && 37 === t) || (!w.isHorizontal() && 38 === t))
          )
            return !1;
          if (
            !(
              e.shiftKey ||
              e.altKey ||
              e.ctrlKey ||
              e.metaKey ||
              (document.activeElement &&
                document.activeElement.nodeName &&
                ("input" === document.activeElement.nodeName.toLowerCase() ||
                  "textarea" === document.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (37 === t || 39 === t || 38 === t || 40 === t) {
              var i = !1;
              if (
                w.container.parents(".swiper-slide").length > 0 &&
                0 === w.container.parents(".swiper-slide-active").length
              )
                return;
              var a = { left: window.pageXOffset, top: window.pageYOffset },
                s = window.innerWidth,
                n = window.innerHeight,
                r = w.container.offset();
              w.rtl && (r.left = r.left - w.container[0].scrollLeft);
              for (
                var o = [
                    [r.left, r.top],
                    [r.left + w.width, r.top],
                    [r.left, r.top + w.height],
                    [r.left + w.width, r.top + w.height],
                  ],
                  l = 0;
                l < o.length;
                l++
              ) {
                var d = o[l];
                d[0] >= a.left &&
                  d[0] <= a.left + s &&
                  d[1] >= a.top &&
                  d[1] <= a.top + n &&
                  (i = !0);
              }
              if (!i) return;
            }
            w.isHorizontal()
              ? ((37 === t || 39 === t) &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : (e.returnValue = !1)),
                ((39 === t && !w.rtl) || (37 === t && w.rtl)) && w.slideNext(),
                ((37 === t && !w.rtl) || (39 === t && w.rtl)) && w.slidePrev())
              : ((38 === t || 40 === t) &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : (e.returnValue = !1)),
                40 === t && w.slideNext(),
                38 === t && w.slidePrev());
          }
        }
        function d(e) {
          e.originalEvent && (e = e.originalEvent);
          var t = w.mousewheel.event,
            i = 0,
            a = w.rtl ? -1 : 1;
          if ("mousewheel" === t)
            if (w.params.mousewheelForceToAxis)
              if (w.isHorizontal()) {
                if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)))
                  return;
                i = e.wheelDeltaX * a;
              } else {
                if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)))
                  return;
                i = e.wheelDeltaY;
              }
            else
              i =
                Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)
                  ? -e.wheelDeltaX * a
                  : -e.wheelDeltaY;
          else if ("DOMMouseScroll" === t) i = -e.detail;
          else if ("wheel" === t)
            if (w.params.mousewheelForceToAxis)
              if (w.isHorizontal()) {
                if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                i = -e.deltaX * a;
              } else {
                if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                i = -e.deltaY;
              }
            else
              i =
                Math.abs(e.deltaX) > Math.abs(e.deltaY)
                  ? -e.deltaX * a
                  : -e.deltaY;
          if (0 !== i) {
            if ((w.params.mousewheelInvert && (i = -i), w.params.freeMode)) {
              var s =
                  w.getWrapperTranslate() + i * w.params.mousewheelSensitivity,
                n = w.isBeginning,
                r = w.isEnd;
              if (
                (s >= w.minTranslate() && (s = w.minTranslate()),
                s <= w.maxTranslate() && (s = w.maxTranslate()),
                w.setWrapperTransition(0),
                w.setWrapperTranslate(s),
                w.updateProgress(),
                w.updateActiveIndex(),
                ((!n && w.isBeginning) || (!r && w.isEnd)) && w.updateClasses(),
                w.params.freeModeSticky
                  ? (clearTimeout(w.mousewheel.timeout),
                    (w.mousewheel.timeout = setTimeout(function () {
                      w.slideReset();
                    }, 300)))
                  : w.params.lazyLoading && w.lazy && w.lazy.load(),
                0 === s || s === w.maxTranslate())
              )
                return;
            } else {
              if (
                new window.Date().getTime() - w.mousewheel.lastScrollTime >
                60
              )
                if (0 > i)
                  if ((w.isEnd && !w.params.loop) || w.animating) {
                    if (w.params.mousewheelReleaseOnEdges) return !0;
                  } else w.slideNext();
                else if ((w.isBeginning && !w.params.loop) || w.animating) {
                  if (w.params.mousewheelReleaseOnEdges) return !0;
                } else w.slidePrev();
              w.mousewheel.lastScrollTime = new window.Date().getTime();
            }
            return (
              w.params.autoplay && w.stopAutoplay(),
              e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
              !1
            );
          }
        }
        function p(e, i) {
          e = t(e);
          var a,
            s,
            n,
            r = w.rtl ? -1 : 1;
          (a = e.attr("data-swiper-parallax") || "0"),
            (s = e.attr("data-swiper-parallax-x")),
            (n = e.attr("data-swiper-parallax-y")),
            s || n
              ? ((s = s || "0"), (n = n || "0"))
              : w.isHorizontal()
              ? ((s = a), (n = "0"))
              : ((n = a), (s = "0")),
            (s =
              s.indexOf("%") >= 0
                ? parseInt(s, 10) * i * r + "%"
                : s * i * r + "px"),
            (n =
              n.indexOf("%") >= 0 ? parseInt(n, 10) * i + "%" : n * i + "px"),
            e.transform("translate3d(" + s + ", " + n + ",0px)");
        }
        function c(e) {
          return (
            0 !== e.indexOf("on") &&
              (e =
                e[0] !== e[0].toUpperCase()
                  ? "on" + e[0].toUpperCase() + e.substring(1)
                  : "on" + e),
            e
          );
        }
        if (!(this instanceof i)) return new i(e, a);
        var u = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: 0.02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: !0,
            },
            flip: { slideShadows: !0, limitRotation: !0 },
            cube: {
              slideShadows: !0,
              shadow: !0,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
            fade: { crossFade: !1 },
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: 0.85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0,
          },
          h = a && a.virtualTranslate;
        a = a || {};
        var m = {};
        for (var f in a)
          if (
            "object" != typeof a[f] ||
            null === a[f] ||
            a[f].nodeType ||
            a[f] === window ||
            a[f] === document ||
            ("undefined" != typeof Dom7 && a[f] instanceof Dom7) ||
            ("undefined" != typeof jQuery && a[f] instanceof jQuery)
          )
            m[f] = a[f];
          else {
            m[f] = {};
            for (var g in a[f]) m[f][g] = a[f][g];
          }
        for (var v in u)
          if ("undefined" == typeof a[v]) a[v] = u[v];
          else if ("object" == typeof a[v])
            for (var y in u[v])
              "undefined" == typeof a[v][y] && (a[v][y] = u[v][y]);
        var w = this;
        if (
          ((w.params = a),
          (w.originalParams = m),
          (w.classNames = []),
          "undefined" != typeof t && "undefined" != typeof Dom7 && (t = Dom7),
          ("undefined" != typeof t ||
            (t =
              "undefined" == typeof Dom7
                ? window.Dom7 || window.Zepto || window.jQuery
                : Dom7)) &&
            ((w.$ = t),
            (w.currentBreakpoint = void 0),
            (w.getActiveBreakpoint = function () {
              if (!w.params.breakpoints) return !1;
              var e,
                t = !1,
                i = [];
              for (e in w.params.breakpoints)
                w.params.breakpoints.hasOwnProperty(e) && i.push(e);
              i.sort(function (e, t) {
                return parseInt(e, 10) > parseInt(t, 10);
              });
              for (var a = 0; a < i.length; a++)
                (e = i[a]), e >= window.innerWidth && !t && (t = e);
              return t || "max";
            }),
            (w.setBreakpoint = function () {
              var e = w.getActiveBreakpoint();
              if (e && w.currentBreakpoint !== e) {
                var t =
                    e in w.params.breakpoints
                      ? w.params.breakpoints[e]
                      : w.originalParams,
                  i =
                    w.params.loop && t.slidesPerView !== w.params.slidesPerView;
                for (var a in t) w.params[a] = t[a];
                (w.currentBreakpoint = e), i && w.destroyLoop && w.reLoop(!0);
              }
            }),
            w.params.breakpoints && w.setBreakpoint(),
            (w.container = t(e)),
            0 !== w.container.length))
        ) {
          if (w.container.length > 1) {
            var b = [];
            return (
              w.container.each(function () {
                b.push(new i(this, a));
              }),
              b
            );
          }
          (w.container[0].swiper = w),
            w.container.data("swiper", w),
            w.classNames.push("swiper-container-" + w.params.direction),
            w.params.freeMode &&
              w.classNames.push("swiper-container-free-mode"),
            w.support.flexbox ||
              (w.classNames.push("swiper-container-no-flexbox"),
              (w.params.slidesPerColumn = 1)),
            w.params.autoHeight &&
              w.classNames.push("swiper-container-autoheight"),
            (w.params.parallax || w.params.watchSlidesVisibility) &&
              (w.params.watchSlidesProgress = !0),
            ["cube", "coverflow", "flip"].indexOf(w.params.effect) >= 0 &&
              (w.support.transforms3d
                ? ((w.params.watchSlidesProgress = !0),
                  w.classNames.push("swiper-container-3d"))
                : (w.params.effect = "slide")),
            "slide" !== w.params.effect &&
              w.classNames.push("swiper-container-" + w.params.effect),
            "cube" === w.params.effect &&
              ((w.params.resistanceRatio = 0),
              (w.params.slidesPerView = 1),
              (w.params.slidesPerColumn = 1),
              (w.params.slidesPerGroup = 1),
              (w.params.centeredSlides = !1),
              (w.params.spaceBetween = 0),
              (w.params.virtualTranslate = !0),
              (w.params.setWrapperSize = !1)),
            ("fade" === w.params.effect || "flip" === w.params.effect) &&
              ((w.params.slidesPerView = 1),
              (w.params.slidesPerColumn = 1),
              (w.params.slidesPerGroup = 1),
              (w.params.watchSlidesProgress = !0),
              (w.params.spaceBetween = 0),
              (w.params.setWrapperSize = !1),
              "undefined" == typeof h && (w.params.virtualTranslate = !0)),
            w.params.grabCursor &&
              w.support.touch &&
              (w.params.grabCursor = !1),
            (w.wrapper = w.container.children("." + w.params.wrapperClass)),
            w.params.pagination &&
              ((w.paginationContainer = t(w.params.pagination)),
              w.params.uniqueNavElements &&
                "string" == typeof w.params.pagination &&
                w.paginationContainer.length > 1 &&
                1 === w.container.find(w.params.pagination).length &&
                (w.paginationContainer = w.container.find(w.params.pagination)),
              "bullets" === w.params.paginationType &&
              w.params.paginationClickable
                ? w.paginationContainer.addClass("swiper-pagination-clickable")
                : (w.params.paginationClickable = !1),
              w.paginationContainer.addClass(
                "swiper-pagination-" + w.params.paginationType
              )),
            (w.params.nextButton || w.params.prevButton) &&
              (w.params.nextButton &&
                ((w.nextButton = t(w.params.nextButton)),
                w.params.uniqueNavElements &&
                  "string" == typeof w.params.nextButton &&
                  w.nextButton.length > 1 &&
                  1 === w.container.find(w.params.nextButton).length &&
                  (w.nextButton = w.container.find(w.params.nextButton))),
              w.params.prevButton &&
                ((w.prevButton = t(w.params.prevButton)),
                w.params.uniqueNavElements &&
                  "string" == typeof w.params.prevButton &&
                  w.prevButton.length > 1 &&
                  1 === w.container.find(w.params.prevButton).length &&
                  (w.prevButton = w.container.find(w.params.prevButton)))),
            (w.isHorizontal = function () {
              return "horizontal" === w.params.direction;
            }),
            (w.rtl =
              w.isHorizontal() &&
              ("rtl" === w.container[0].dir.toLowerCase() ||
                "rtl" === w.container.css("direction"))),
            w.rtl && w.classNames.push("swiper-container-rtl"),
            w.rtl && (w.wrongRTL = "-webkit-box" === w.wrapper.css("display")),
            w.params.slidesPerColumn > 1 &&
              w.classNames.push("swiper-container-multirow"),
            w.device.android && w.classNames.push("swiper-container-android"),
            w.container.addClass(w.classNames.join(" ")),
            (w.translate = 0),
            (w.progress = 0),
            (w.velocity = 0),
            (w.lockSwipeToNext = function () {
              w.params.allowSwipeToNext = !1;
            }),
            (w.lockSwipeToPrev = function () {
              w.params.allowSwipeToPrev = !1;
            }),
            (w.lockSwipes = function () {
              w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !1;
            }),
            (w.unlockSwipeToNext = function () {
              w.params.allowSwipeToNext = !0;
            }),
            (w.unlockSwipeToPrev = function () {
              w.params.allowSwipeToPrev = !0;
            }),
            (w.unlockSwipes = function () {
              w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !0;
            }),
            w.params.grabCursor &&
              ((w.container[0].style.cursor = "move"),
              (w.container[0].style.cursor = "-webkit-grab"),
              (w.container[0].style.cursor = "-moz-grab"),
              (w.container[0].style.cursor = "grab")),
            (w.imagesToLoad = []),
            (w.imagesLoaded = 0),
            (w.loadImage = function (e, t, i, a, s) {
              function n() {
                s && s();
              }
              var r;
              e.complete && a
                ? n()
                : t
                ? ((r = new window.Image()),
                  (r.onload = n),
                  (r.onerror = n),
                  i && (r.srcset = i),
                  t && (r.src = t))
                : n();
            }),
            (w.preloadImages = function () {
              function e() {
                "undefined" != typeof w &&
                  null !== w &&
                  (void 0 !== w.imagesLoaded && w.imagesLoaded++,
                  w.imagesLoaded === w.imagesToLoad.length &&
                    (w.params.updateOnImagesReady && w.update(),
                    w.emit("onImagesReady", w)));
              }
              w.imagesToLoad = w.container.find("img");
              for (var t = 0; t < w.imagesToLoad.length; t++)
                w.loadImage(
                  w.imagesToLoad[t],
                  w.imagesToLoad[t].currentSrc ||
                    w.imagesToLoad[t].getAttribute("src"),
                  w.imagesToLoad[t].srcset ||
                    w.imagesToLoad[t].getAttribute("srcset"),
                  !0,
                  e
                );
            }),
            (w.autoplayTimeoutId = void 0),
            (w.autoplaying = !1),
            (w.autoplayPaused = !1),
            (w.startAutoplay = function () {
              return "undefined" != typeof w.autoplayTimeoutId
                ? !1
                : w.params.autoplay
                ? w.autoplaying
                  ? !1
                  : ((w.autoplaying = !0),
                    w.emit("onAutoplayStart", w),
                    void n())
                : !1;
            }),
            (w.stopAutoplay = function (e) {
              w.autoplayTimeoutId &&
                (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId),
                (w.autoplaying = !1),
                (w.autoplayTimeoutId = void 0),
                w.emit("onAutoplayStop", w));
            }),
            (w.pauseAutoplay = function (e) {
              w.autoplayPaused ||
                (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId),
                (w.autoplayPaused = !0),
                0 === e
                  ? ((w.autoplayPaused = !1), n())
                  : w.wrapper.transitionEnd(function () {
                      w &&
                        ((w.autoplayPaused = !1),
                        w.autoplaying ? n() : w.stopAutoplay());
                    }));
            }),
            (w.minTranslate = function () {
              return -w.snapGrid[0];
            }),
            (w.maxTranslate = function () {
              return -w.snapGrid[w.snapGrid.length - 1];
            }),
            (w.updateAutoHeight = function () {
              var e = w.slides.eq(w.activeIndex)[0];
              if ("undefined" != typeof e) {
                var t = e.offsetHeight;
                t && w.wrapper.css("height", t + "px");
              }
            }),
            (w.updateContainerSize = function () {
              var e, t;
              (e =
                "undefined" != typeof w.params.width
                  ? w.params.width
                  : w.container[0].clientWidth),
                (t =
                  "undefined" != typeof w.params.height
                    ? w.params.height
                    : w.container[0].clientHeight),
                (0 === e && w.isHorizontal()) ||
                  (0 === t && !w.isHorizontal()) ||
                  ((e =
                    e -
                    parseInt(w.container.css("padding-left"), 10) -
                    parseInt(w.container.css("padding-right"), 10)),
                  (t =
                    t -
                    parseInt(w.container.css("padding-top"), 10) -
                    parseInt(w.container.css("padding-bottom"), 10)),
                  (w.width = e),
                  (w.height = t),
                  (w.size = w.isHorizontal() ? w.width : w.height));
            }),
            (w.updateSlidesSize = function () {
              (w.slides = w.wrapper.children("." + w.params.slideClass)),
                (w.snapGrid = []),
                (w.slidesGrid = []),
                (w.slidesSizesGrid = []);
              var e,
                t = w.params.spaceBetween,
                i = -w.params.slidesOffsetBefore,
                a = 0,
                n = 0;
              if ("undefined" != typeof w.size) {
                "string" == typeof t &&
                  t.indexOf("%") >= 0 &&
                  (t = (parseFloat(t.replace("%", "")) / 100) * w.size),
                  (w.virtualSize = -t),
                  w.rtl
                    ? w.slides.css({ marginLeft: "", marginTop: "" })
                    : w.slides.css({ marginRight: "", marginBottom: "" });
                var r;
                w.params.slidesPerColumn > 1 &&
                  ((r =
                    Math.floor(w.slides.length / w.params.slidesPerColumn) ===
                    w.slides.length / w.params.slidesPerColumn
                      ? w.slides.length
                      : Math.ceil(w.slides.length / w.params.slidesPerColumn) *
                        w.params.slidesPerColumn),
                  "auto" !== w.params.slidesPerView &&
                    "row" === w.params.slidesPerColumnFill &&
                    (r = Math.max(
                      r,
                      w.params.slidesPerView * w.params.slidesPerColumn
                    )));
                var o,
                  l = w.params.slidesPerColumn,
                  d = r / l,
                  p = d - (w.params.slidesPerColumn * d - w.slides.length);
                for (e = 0; e < w.slides.length; e++) {
                  o = 0;
                  var c = w.slides.eq(e);
                  if (w.params.slidesPerColumn > 1) {
                    var u, h, m;
                    "column" === w.params.slidesPerColumnFill
                      ? ((h = Math.floor(e / l)),
                        (m = e - h * l),
                        (h > p || (h === p && m === l - 1)) &&
                          ++m >= l &&
                          ((m = 0), h++),
                        (u = h + (m * r) / l),
                        c.css({
                          "-webkit-box-ordinal-group": u,
                          "-moz-box-ordinal-group": u,
                          "-ms-flex-order": u,
                          "-webkit-order": u,
                          order: u,
                        }))
                      : ((m = Math.floor(e / d)), (h = e - m * d)),
                      c
                        .css({
                          "margin-top":
                            0 !== m &&
                            w.params.spaceBetween &&
                            w.params.spaceBetween + "px",
                        })
                        .attr("data-swiper-column", h)
                        .attr("data-swiper-row", m);
                  }
                  "none" !== c.css("display") &&
                    ("auto" === w.params.slidesPerView
                      ? ((o = w.isHorizontal()
                          ? c.outerWidth(!0)
                          : c.outerHeight(!0)),
                        w.params.roundLengths && (o = s(o)))
                      : ((o =
                          (w.size - (w.params.slidesPerView - 1) * t) /
                          w.params.slidesPerView),
                        w.params.roundLengths && (o = s(o)),
                        w.isHorizontal()
                          ? (w.slides[e].style.width = o + "px")
                          : (w.slides[e].style.height = o + "px")),
                    (w.slides[e].swiperSlideSize = o),
                    w.slidesSizesGrid.push(o),
                    w.params.centeredSlides
                      ? ((i = i + o / 2 + a / 2 + t),
                        0 === e && (i = i - w.size / 2 - t),
                        Math.abs(i) < 0.001 && (i = 0),
                        n % w.params.slidesPerGroup === 0 && w.snapGrid.push(i),
                        w.slidesGrid.push(i))
                      : (n % w.params.slidesPerGroup === 0 &&
                          w.snapGrid.push(i),
                        w.slidesGrid.push(i),
                        (i = i + o + t)),
                    (w.virtualSize += o + t),
                    (a = o),
                    n++);
                }
                w.virtualSize =
                  Math.max(w.virtualSize, w.size) + w.params.slidesOffsetAfter;
                var f;
                if (
                  (w.rtl &&
                    w.wrongRTL &&
                    ("slide" === w.params.effect ||
                      "coverflow" === w.params.effect) &&
                    w.wrapper.css({
                      width: w.virtualSize + w.params.spaceBetween + "px",
                    }),
                  (!w.support.flexbox || w.params.setWrapperSize) &&
                    (w.isHorizontal()
                      ? w.wrapper.css({
                          width: w.virtualSize + w.params.spaceBetween + "px",
                        })
                      : w.wrapper.css({
                          height: w.virtualSize + w.params.spaceBetween + "px",
                        })),
                  w.params.slidesPerColumn > 1 &&
                    ((w.virtualSize = (o + w.params.spaceBetween) * r),
                    (w.virtualSize =
                      Math.ceil(w.virtualSize / w.params.slidesPerColumn) -
                      w.params.spaceBetween),
                    w.wrapper.css({
                      width: w.virtualSize + w.params.spaceBetween + "px",
                    }),
                    w.params.centeredSlides))
                ) {
                  for (f = [], e = 0; e < w.snapGrid.length; e++)
                    w.snapGrid[e] < w.virtualSize + w.snapGrid[0] &&
                      f.push(w.snapGrid[e]);
                  w.snapGrid = f;
                }
                if (!w.params.centeredSlides) {
                  for (f = [], e = 0; e < w.snapGrid.length; e++)
                    w.snapGrid[e] <= w.virtualSize - w.size &&
                      f.push(w.snapGrid[e]);
                  (w.snapGrid = f),
                    Math.floor(w.virtualSize - w.size) -
                      Math.floor(w.snapGrid[w.snapGrid.length - 1]) >
                      1 && w.snapGrid.push(w.virtualSize - w.size);
                }
                0 === w.snapGrid.length && (w.snapGrid = [0]),
                  0 !== w.params.spaceBetween &&
                    (w.isHorizontal()
                      ? w.rtl
                        ? w.slides.css({ marginLeft: t + "px" })
                        : w.slides.css({ marginRight: t + "px" })
                      : w.slides.css({ marginBottom: t + "px" })),
                  w.params.watchSlidesProgress && w.updateSlidesOffset();
              }
            }),
            (w.updateSlidesOffset = function () {
              for (var e = 0; e < w.slides.length; e++)
                w.slides[e].swiperSlideOffset = w.isHorizontal()
                  ? w.slides[e].offsetLeft
                  : w.slides[e].offsetTop;
            }),
            (w.updateSlidesProgress = function (e) {
              if (
                ("undefined" == typeof e && (e = w.translate || 0),
                0 !== w.slides.length)
              ) {
                "undefined" == typeof w.slides[0].swiperSlideOffset &&
                  w.updateSlidesOffset();
                var t = -e;
                w.rtl && (t = e),
                  w.slides.removeClass(w.params.slideVisibleClass);
                for (var i = 0; i < w.slides.length; i++) {
                  var a = w.slides[i],
                    s =
                      (t - a.swiperSlideOffset) /
                      (a.swiperSlideSize + w.params.spaceBetween);
                  if (w.params.watchSlidesVisibility) {
                    var n = -(t - a.swiperSlideOffset),
                      r = n + w.slidesSizesGrid[i],
                      o =
                        (n >= 0 && n < w.size) ||
                        (r > 0 && r <= w.size) ||
                        (0 >= n && r >= w.size);
                    o && w.slides.eq(i).addClass(w.params.slideVisibleClass);
                  }
                  a.progress = w.rtl ? -s : s;
                }
              }
            }),
            (w.updateProgress = function (e) {
              "undefined" == typeof e && (e = w.translate || 0);
              var t = w.maxTranslate() - w.minTranslate(),
                i = w.isBeginning,
                a = w.isEnd;
              0 === t
                ? ((w.progress = 0), (w.isBeginning = w.isEnd = !0))
                : ((w.progress = (e - w.minTranslate()) / t),
                  (w.isBeginning = w.progress <= 0),
                  (w.isEnd = w.progress >= 1)),
                w.isBeginning && !i && w.emit("onReachBeginning", w),
                w.isEnd && !a && w.emit("onReachEnd", w),
                w.params.watchSlidesProgress && w.updateSlidesProgress(e),
                w.emit("onProgress", w, w.progress);
            }),
            (w.updateActiveIndex = function () {
              var e,
                t,
                i,
                a = w.rtl ? w.translate : -w.translate;
              for (t = 0; t < w.slidesGrid.length; t++)
                "undefined" != typeof w.slidesGrid[t + 1]
                  ? a >= w.slidesGrid[t] &&
                    a <
                      w.slidesGrid[t + 1] -
                        (w.slidesGrid[t + 1] - w.slidesGrid[t]) / 2
                    ? (e = t)
                    : a >= w.slidesGrid[t] &&
                      a < w.slidesGrid[t + 1] &&
                      (e = t + 1)
                  : a >= w.slidesGrid[t] && (e = t);
              (0 > e || "undefined" == typeof e) && (e = 0),
                (i = Math.floor(e / w.params.slidesPerGroup)),
                i >= w.snapGrid.length && (i = w.snapGrid.length - 1),
                e !== w.activeIndex &&
                  ((w.snapIndex = i),
                  (w.previousIndex = w.activeIndex),
                  (w.activeIndex = e),
                  w.updateClasses());
            }),
            (w.updateClasses = function () {
              w.slides.removeClass(
                w.params.slideActiveClass +
                  " " +
                  w.params.slideNextClass +
                  " " +
                  w.params.slidePrevClass
              );
              var e = w.slides.eq(w.activeIndex);
              e.addClass(w.params.slideActiveClass);
              var i = e
                .next("." + w.params.slideClass)
                .addClass(w.params.slideNextClass);
              w.params.loop &&
                0 === i.length &&
                w.slides.eq(0).addClass(w.params.slideNextClass);
              var a = e
                .prev("." + w.params.slideClass)
                .addClass(w.params.slidePrevClass);
              if (
                (w.params.loop &&
                  0 === a.length &&
                  w.slides.eq(-1).addClass(w.params.slidePrevClass),
                w.paginationContainer && w.paginationContainer.length > 0)
              ) {
                var s,
                  n = w.params.loop
                    ? Math.ceil(
                        (w.slides.length - 2 * w.loopedSlides) /
                          w.params.slidesPerGroup
                      )
                    : w.snapGrid.length;
                if (
                  (w.params.loop
                    ? ((s = Math.ceil(
                        (w.activeIndex - w.loopedSlides) /
                          w.params.slidesPerGroup
                      )),
                      s > w.slides.length - 1 - 2 * w.loopedSlides &&
                        (s -= w.slides.length - 2 * w.loopedSlides),
                      s > n - 1 && (s -= n),
                      0 > s &&
                        "bullets" !== w.params.paginationType &&
                        (s = n + s))
                    : (s =
                        "undefined" != typeof w.snapIndex
                          ? w.snapIndex
                          : w.activeIndex || 0),
                  "bullets" === w.params.paginationType &&
                    w.bullets &&
                    w.bullets.length > 0 &&
                    (w.bullets.removeClass(w.params.bulletActiveClass),
                    w.paginationContainer.length > 1
                      ? w.bullets.each(function () {
                          t(this).index() === s &&
                            t(this).addClass(w.params.bulletActiveClass);
                        })
                      : w.bullets.eq(s).addClass(w.params.bulletActiveClass)),
                  "fraction" === w.params.paginationType &&
                    (w.paginationContainer
                      .find("." + w.params.paginationCurrentClass)
                      .text(s + 1),
                    w.paginationContainer
                      .find("." + w.params.paginationTotalClass)
                      .text(n)),
                  "progress" === w.params.paginationType)
                ) {
                  var r = (s + 1) / n,
                    o = r,
                    l = 1;
                  w.isHorizontal() || ((l = r), (o = 1)),
                    w.paginationContainer
                      .find("." + w.params.paginationProgressbarClass)
                      .transform(
                        "translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")"
                      )
                      .transition(w.params.speed);
                }
                "custom" === w.params.paginationType &&
                  w.params.paginationCustomRender &&
                  (w.paginationContainer.html(
                    w.params.paginationCustomRender(w, s + 1, n)
                  ),
                  w.emit("onPaginationRendered", w, w.paginationContainer[0]));
              }
              w.params.loop ||
                (w.params.prevButton &&
                  w.prevButton &&
                  w.prevButton.length > 0 &&
                  (w.isBeginning
                    ? (w.prevButton.addClass(w.params.buttonDisabledClass),
                      w.params.a11y && w.a11y && w.a11y.disable(w.prevButton))
                    : (w.prevButton.removeClass(w.params.buttonDisabledClass),
                      w.params.a11y && w.a11y && w.a11y.enable(w.prevButton))),
                w.params.nextButton &&
                  w.nextButton &&
                  w.nextButton.length > 0 &&
                  (w.isEnd
                    ? (w.nextButton.addClass(w.params.buttonDisabledClass),
                      w.params.a11y && w.a11y && w.a11y.disable(w.nextButton))
                    : (w.nextButton.removeClass(w.params.buttonDisabledClass),
                      w.params.a11y && w.a11y && w.a11y.enable(w.nextButton))));
            }),
            (w.updatePagination = function () {
              if (
                w.params.pagination &&
                w.paginationContainer &&
                w.paginationContainer.length > 0
              ) {
                var e = "";
                if ("bullets" === w.params.paginationType) {
                  for (
                    var t = w.params.loop
                        ? Math.ceil(
                            (w.slides.length - 2 * w.loopedSlides) /
                              w.params.slidesPerGroup
                          )
                        : w.snapGrid.length,
                      i = 0;
                    t > i;
                    i++
                  )
                    e += w.params.paginationBulletRender
                      ? w.params.paginationBulletRender(i, w.params.bulletClass)
                      : "<" +
                        w.params.paginationElement +
                        ' class="' +
                        w.params.bulletClass +
                        '"></' +
                        w.params.paginationElement +
                        ">";
                  w.paginationContainer.html(e),
                    (w.bullets = w.paginationContainer.find(
                      "." + w.params.bulletClass
                    )),
                    w.params.paginationClickable &&
                      w.params.a11y &&
                      w.a11y &&
                      w.a11y.initPagination();
                }
                "fraction" === w.params.paginationType &&
                  ((e = w.params.paginationFractionRender
                    ? w.params.paginationFractionRender(
                        w,
                        w.params.paginationCurrentClass,
                        w.params.paginationTotalClass
                      )
                    : '<span class="' +
                      w.params.paginationCurrentClass +
                      '"></span> / <span class="' +
                      w.params.paginationTotalClass +
                      '"></span>'),
                  w.paginationContainer.html(e)),
                  "progress" === w.params.paginationType &&
                    ((e = w.params.paginationProgressRender
                      ? w.params.paginationProgressRender(
                          w,
                          w.params.paginationProgressbarClass
                        )
                      : '<span class="' +
                        w.params.paginationProgressbarClass +
                        '"></span>'),
                    w.paginationContainer.html(e)),
                  "custom" !== w.params.paginationType &&
                    w.emit("onPaginationRendered", w, w.paginationContainer[0]);
              }
            }),
            (w.update = function (e) {
              function t() {
                (a = Math.min(
                  Math.max(w.translate, w.maxTranslate()),
                  w.minTranslate()
                )),
                  w.setWrapperTranslate(a),
                  w.updateActiveIndex(),
                  w.updateClasses();
              }
              if (
                (w.updateContainerSize(),
                w.updateSlidesSize(),
                w.updateProgress(),
                w.updatePagination(),
                w.updateClasses(),
                w.params.scrollbar && w.scrollbar && w.scrollbar.set(),
                e)
              ) {
                var i, a;
                w.controller &&
                  w.controller.spline &&
                  (w.controller.spline = void 0),
                  w.params.freeMode
                    ? (t(), w.params.autoHeight && w.updateAutoHeight())
                    : ((i =
                        ("auto" === w.params.slidesPerView ||
                          w.params.slidesPerView > 1) &&
                        w.isEnd &&
                        !w.params.centeredSlides
                          ? w.slideTo(w.slides.length - 1, 0, !1, !0)
                          : w.slideTo(w.activeIndex, 0, !1, !0)),
                      i || t());
              } else w.params.autoHeight && w.updateAutoHeight();
            }),
            (w.onResize = function (e) {
              w.params.breakpoints && w.setBreakpoint();
              var t = w.params.allowSwipeToPrev,
                i = w.params.allowSwipeToNext;
              (w.params.allowSwipeToPrev = w.params.allowSwipeToNext = !0),
                w.updateContainerSize(),
                w.updateSlidesSize(),
                ("auto" === w.params.slidesPerView || w.params.freeMode || e) &&
                  w.updatePagination(),
                w.params.scrollbar && w.scrollbar && w.scrollbar.set(),
                w.controller &&
                  w.controller.spline &&
                  (w.controller.spline = void 0);
              var a = !1;
              if (w.params.freeMode) {
                var s = Math.min(
                  Math.max(w.translate, w.maxTranslate()),
                  w.minTranslate()
                );
                w.setWrapperTranslate(s),
                  w.updateActiveIndex(),
                  w.updateClasses(),
                  w.params.autoHeight && w.updateAutoHeight();
              } else
                w.updateClasses(),
                  (a =
                    ("auto" === w.params.slidesPerView ||
                      w.params.slidesPerView > 1) &&
                    w.isEnd &&
                    !w.params.centeredSlides
                      ? w.slideTo(w.slides.length - 1, 0, !1, !0)
                      : w.slideTo(w.activeIndex, 0, !1, !0));
              w.params.lazyLoading && !a && w.lazy && w.lazy.load(),
                (w.params.allowSwipeToPrev = t),
                (w.params.allowSwipeToNext = i);
            });
          var x = ["mousedown", "mousemove", "mouseup"];
          window.navigator.pointerEnabled
            ? (x = ["pointerdown", "pointermove", "pointerup"])
            : window.navigator.msPointerEnabled &&
              (x = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
            (w.touchEvents = {
              start:
                w.support.touch || !w.params.simulateTouch
                  ? "touchstart"
                  : x[0],
              move:
                w.support.touch || !w.params.simulateTouch ? "touchmove" : x[1],
              end:
                w.support.touch || !w.params.simulateTouch ? "touchend" : x[2],
            }),
            (window.navigator.pointerEnabled ||
              window.navigator.msPointerEnabled) &&
              ("container" === w.params.touchEventsTarget
                ? w.container
                : w.wrapper
              ).addClass("swiper-wp8-" + w.params.direction),
            (w.initEvents = function (e) {
              var t = e ? "off" : "on",
                i = e ? "removeEventListener" : "addEventListener",
                s =
                  "container" === w.params.touchEventsTarget
                    ? w.container[0]
                    : w.wrapper[0],
                n = w.support.touch ? s : document,
                r = !!w.params.nested;
              w.browser.ie
                ? (s[i](w.touchEvents.start, w.onTouchStart, !1),
                  n[i](w.touchEvents.move, w.onTouchMove, r),
                  n[i](w.touchEvents.end, w.onTouchEnd, !1))
                : (w.support.touch &&
                    (s[i](w.touchEvents.start, w.onTouchStart, !1),
                    s[i](w.touchEvents.move, w.onTouchMove, r),
                    s[i](w.touchEvents.end, w.onTouchEnd, !1)),
                  !a.simulateTouch ||
                    w.device.ios ||
                    w.device.android ||
                    (s[i]("mousedown", w.onTouchStart, !1),
                    document[i]("mousemove", w.onTouchMove, r),
                    document[i]("mouseup", w.onTouchEnd, !1))),
                window[i]("resize", w.onResize),
                w.params.nextButton &&
                  w.nextButton &&
                  w.nextButton.length > 0 &&
                  (w.nextButton[t]("click", w.onClickNext),
                  w.params.a11y &&
                    w.a11y &&
                    w.nextButton[t]("keydown", w.a11y.onEnterKey)),
                w.params.prevButton &&
                  w.prevButton &&
                  w.prevButton.length > 0 &&
                  (w.prevButton[t]("click", w.onClickPrev),
                  w.params.a11y &&
                    w.a11y &&
                    w.prevButton[t]("keydown", w.a11y.onEnterKey)),
                w.params.pagination &&
                  w.params.paginationClickable &&
                  (w.paginationContainer[t](
                    "click",
                    "." + w.params.bulletClass,
                    w.onClickIndex
                  ),
                  w.params.a11y &&
                    w.a11y &&
                    w.paginationContainer[t](
                      "keydown",
                      "." + w.params.bulletClass,
                      w.a11y.onEnterKey
                    )),
                (w.params.preventClicks || w.params.preventClicksPropagation) &&
                  s[i]("click", w.preventClicks, !0);
            }),
            (w.attachEvents = function () {
              w.initEvents();
            }),
            (w.detachEvents = function () {
              w.initEvents(!0);
            }),
            (w.allowClick = !0),
            (w.preventClicks = function (e) {
              w.allowClick ||
                (w.params.preventClicks && e.preventDefault(),
                w.params.preventClicksPropagation &&
                  w.animating &&
                  (e.stopPropagation(), e.stopImmediatePropagation()));
            }),
            (w.onClickNext = function (e) {
              e.preventDefault(), (!w.isEnd || w.params.loop) && w.slideNext();
            }),
            (w.onClickPrev = function (e) {
              e.preventDefault(),
                (!w.isBeginning || w.params.loop) && w.slidePrev();
            }),
            (w.onClickIndex = function (e) {
              e.preventDefault();
              var i = t(this).index() * w.params.slidesPerGroup;
              w.params.loop && (i += w.loopedSlides), w.slideTo(i);
            }),
            (w.updateClickedSlide = function (e) {
              var i = r(e, "." + w.params.slideClass),
                a = !1;
              if (i)
                for (var s = 0; s < w.slides.length; s++)
                  w.slides[s] === i && (a = !0);
              if (!i || !a)
                return (
                  (w.clickedSlide = void 0), void (w.clickedIndex = void 0)
                );
              if (
                ((w.clickedSlide = i),
                (w.clickedIndex = t(i).index()),
                w.params.slideToClickedSlide &&
                  void 0 !== w.clickedIndex &&
                  w.clickedIndex !== w.activeIndex)
              ) {
                var n,
                  o = w.clickedIndex;
                if (w.params.loop) {
                  if (w.animating) return;
                  (n = t(w.clickedSlide).attr("data-swiper-slide-index")),
                    w.params.centeredSlides
                      ? o < w.loopedSlides - w.params.slidesPerView / 2 ||
                        o >
                          w.slides.length -
                            w.loopedSlides +
                            w.params.slidesPerView / 2
                        ? (w.fixLoop(),
                          (o = w.wrapper
                            .children(
                              "." +
                                w.params.slideClass +
                                '[data-swiper-slide-index="' +
                                n +
                                '"]:not(.swiper-slide-duplicate)'
                            )
                            .eq(0)
                            .index()),
                          setTimeout(function () {
                            w.slideTo(o);
                          }, 0))
                        : w.slideTo(o)
                      : o > w.slides.length - w.params.slidesPerView
                      ? (w.fixLoop(),
                        (o = w.wrapper
                          .children(
                            "." +
                              w.params.slideClass +
                              '[data-swiper-slide-index="' +
                              n +
                              '"]:not(.swiper-slide-duplicate)'
                          )
                          .eq(0)
                          .index()),
                        setTimeout(function () {
                          w.slideTo(o);
                        }, 0))
                      : w.slideTo(o);
                } else w.slideTo(o);
              }
            });
          var S,
            T,
            C,
            I,
            $,
            k,
            E,
            z,
            P,
            M,
            D = "input, select, textarea, button",
            O = Date.now(),
            A = [];
          (w.animating = !1),
            (w.touches = {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            });
          var B, R;
          if (
            ((w.onTouchStart = function (e) {
              if (
                (e.originalEvent && (e = e.originalEvent),
                (B = "touchstart" === e.type),
                B || !("which" in e) || 3 !== e.which)
              ) {
                if (w.params.noSwiping && r(e, "." + w.params.noSwipingClass))
                  return void (w.allowClick = !0);
                if (!w.params.swipeHandler || r(e, w.params.swipeHandler)) {
                  var i = (w.touches.currentX =
                      "touchstart" === e.type
                        ? e.targetTouches[0].pageX
                        : e.pageX),
                    a = (w.touches.currentY =
                      "touchstart" === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY);
                  if (
                    !(
                      w.device.ios &&
                      w.params.iOSEdgeSwipeDetection &&
                      i <= w.params.iOSEdgeSwipeThreshold
                    )
                  ) {
                    if (
                      ((S = !0),
                      (T = !1),
                      (C = !0),
                      ($ = void 0),
                      (R = void 0),
                      (w.touches.startX = i),
                      (w.touches.startY = a),
                      (I = Date.now()),
                      (w.allowClick = !0),
                      w.updateContainerSize(),
                      (w.swipeDirection = void 0),
                      w.params.threshold > 0 && (z = !1),
                      "touchstart" !== e.type)
                    ) {
                      var s = !0;
                      t(e.target).is(D) && (s = !1),
                        document.activeElement &&
                          t(document.activeElement).is(D) &&
                          document.activeElement.blur(),
                        s && e.preventDefault();
                    }
                    w.emit("onTouchStart", w, e);
                  }
                }
              }
            }),
            (w.onTouchMove = function (e) {
              if (
                (e.originalEvent && (e = e.originalEvent),
                !B || "mousemove" !== e.type)
              ) {
                if (e.preventedByNestedSwiper)
                  return (
                    (w.touches.startX =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageX
                        : e.pageX),
                    void (w.touches.startY =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY)
                  );
                if (w.params.onlyExternal)
                  return (
                    (w.allowClick = !1),
                    void (
                      S &&
                      ((w.touches.startX = w.touches.currentX =
                        "touchmove" === e.type
                          ? e.targetTouches[0].pageX
                          : e.pageX),
                      (w.touches.startY = w.touches.currentY =
                        "touchmove" === e.type
                          ? e.targetTouches[0].pageY
                          : e.pageY),
                      (I = Date.now()))
                    )
                  );
                if (
                  B &&
                  document.activeElement &&
                  e.target === document.activeElement &&
                  t(e.target).is(D)
                )
                  return (T = !0), void (w.allowClick = !1);
                if (
                  (C && w.emit("onTouchMove", w, e),
                  !(e.targetTouches && e.targetTouches.length > 1))
                ) {
                  if (
                    ((w.touches.currentX =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageX
                        : e.pageX),
                    (w.touches.currentY =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY),
                    "undefined" == typeof $)
                  ) {
                    var i =
                      (180 *
                        Math.atan2(
                          Math.abs(w.touches.currentY - w.touches.startY),
                          Math.abs(w.touches.currentX - w.touches.startX)
                        )) /
                      Math.PI;
                    $ = w.isHorizontal()
                      ? i > w.params.touchAngle
                      : 90 - i > w.params.touchAngle;
                  }
                  if (
                    ($ && w.emit("onTouchMoveOpposite", w, e),
                    "undefined" == typeof R &&
                      w.browser.ieTouch &&
                      (w.touches.currentX !== w.touches.startX ||
                        w.touches.currentY !== w.touches.startY) &&
                      (R = !0),
                    S)
                  ) {
                    if ($) return void (S = !1);
                    if (R || !w.browser.ieTouch) {
                      (w.allowClick = !1),
                        w.emit("onSliderMove", w, e),
                        e.preventDefault(),
                        w.params.touchMoveStopPropagation &&
                          !w.params.nested &&
                          e.stopPropagation(),
                        T ||
                          (a.loop && w.fixLoop(),
                          (E = w.getWrapperTranslate()),
                          w.setWrapperTransition(0),
                          w.animating &&
                            w.wrapper.trigger(
                              "webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"
                            ),
                          w.params.autoplay &&
                            w.autoplaying &&
                            (w.params.autoplayDisableOnInteraction
                              ? w.stopAutoplay()
                              : w.pauseAutoplay()),
                          (M = !1),
                          w.params.grabCursor &&
                            ((w.container[0].style.cursor = "move"),
                            (w.container[0].style.cursor = "-webkit-grabbing"),
                            (w.container[0].style.cursor = "-moz-grabbin"),
                            (w.container[0].style.cursor = "grabbing"))),
                        (T = !0);
                      var s = (w.touches.diff = w.isHorizontal()
                        ? w.touches.currentX - w.touches.startX
                        : w.touches.currentY - w.touches.startY);
                      (s *= w.params.touchRatio),
                        w.rtl && (s = -s),
                        (w.swipeDirection = s > 0 ? "prev" : "next"),
                        (k = s + E);
                      var n = !0;
                      if (
                        (s > 0 && k > w.minTranslate()
                          ? ((n = !1),
                            w.params.resistance &&
                              (k =
                                w.minTranslate() -
                                1 +
                                Math.pow(
                                  -w.minTranslate() + E + s,
                                  w.params.resistanceRatio
                                )))
                          : 0 > s &&
                            k < w.maxTranslate() &&
                            ((n = !1),
                            w.params.resistance &&
                              (k =
                                w.maxTranslate() +
                                1 -
                                Math.pow(
                                  w.maxTranslate() - E - s,
                                  w.params.resistanceRatio
                                ))),
                        n && (e.preventedByNestedSwiper = !0),
                        !w.params.allowSwipeToNext &&
                          "next" === w.swipeDirection &&
                          E > k &&
                          (k = E),
                        !w.params.allowSwipeToPrev &&
                          "prev" === w.swipeDirection &&
                          k > E &&
                          (k = E),
                        w.params.followFinger)
                      ) {
                        if (w.params.threshold > 0) {
                          if (!(Math.abs(s) > w.params.threshold || z))
                            return void (k = E);
                          if (!z)
                            return (
                              (z = !0),
                              (w.touches.startX = w.touches.currentX),
                              (w.touches.startY = w.touches.currentY),
                              (k = E),
                              void (w.touches.diff = w.isHorizontal()
                                ? w.touches.currentX - w.touches.startX
                                : w.touches.currentY - w.touches.startY)
                            );
                        }
                        (w.params.freeMode || w.params.watchSlidesProgress) &&
                          w.updateActiveIndex(),
                          w.params.freeMode &&
                            (0 === A.length &&
                              A.push({
                                position:
                                  w.touches[
                                    w.isHorizontal() ? "startX" : "startY"
                                  ],
                                time: I,
                              }),
                            A.push({
                              position:
                                w.touches[
                                  w.isHorizontal() ? "currentX" : "currentY"
                                ],
                              time: new window.Date().getTime(),
                            })),
                          w.updateProgress(k),
                          w.setWrapperTranslate(k);
                      }
                    }
                  }
                }
              }
            }),
            (w.onTouchEnd = function (e) {
              if (
                (e.originalEvent && (e = e.originalEvent),
                C && w.emit("onTouchEnd", w, e),
                (C = !1),
                S)
              ) {
                w.params.grabCursor &&
                  T &&
                  S &&
                  ((w.container[0].style.cursor = "move"),
                  (w.container[0].style.cursor = "-webkit-grab"),
                  (w.container[0].style.cursor = "-moz-grab"),
                  (w.container[0].style.cursor = "grab"));
                var i = Date.now(),
                  a = i - I;
                if (
                  (w.allowClick &&
                    (w.updateClickedSlide(e),
                    w.emit("onTap", w, e),
                    300 > a &&
                      i - O > 300 &&
                      (P && clearTimeout(P),
                      (P = setTimeout(function () {
                        w &&
                          (w.params.paginationHide &&
                            w.paginationContainer.length > 0 &&
                            !t(e.target).hasClass(w.params.bulletClass) &&
                            w.paginationContainer.toggleClass(
                              w.params.paginationHiddenClass
                            ),
                          w.emit("onClick", w, e));
                      }, 300))),
                    300 > a &&
                      300 > i - O &&
                      (P && clearTimeout(P), w.emit("onDoubleTap", w, e))),
                  (O = Date.now()),
                  setTimeout(function () {
                    w && (w.allowClick = !0);
                  }, 0),
                  !S ||
                    !T ||
                    !w.swipeDirection ||
                    0 === w.touches.diff ||
                    k === E)
                )
                  return void (S = T = !1);
                S = T = !1;
                var s;
                if (
                  ((s = w.params.followFinger
                    ? w.rtl
                      ? w.translate
                      : -w.translate
                    : -k),
                  w.params.freeMode)
                ) {
                  if (s < -w.minTranslate())
                    return void w.slideTo(w.activeIndex);
                  if (s > -w.maxTranslate())
                    return void (w.slides.length < w.snapGrid.length
                      ? w.slideTo(w.snapGrid.length - 1)
                      : w.slideTo(w.slides.length - 1));
                  if (w.params.freeModeMomentum) {
                    if (A.length > 1) {
                      var n = A.pop(),
                        r = A.pop(),
                        o = n.position - r.position,
                        l = n.time - r.time;
                      (w.velocity = o / l),
                        (w.velocity = w.velocity / 2),
                        Math.abs(w.velocity) <
                          w.params.freeModeMinimumVelocity && (w.velocity = 0),
                        (l > 150 ||
                          new window.Date().getTime() - n.time > 300) &&
                          (w.velocity = 0);
                    } else w.velocity = 0;
                    A.length = 0;
                    var d = 1e3 * w.params.freeModeMomentumRatio,
                      p = w.velocity * d,
                      c = w.translate + p;
                    w.rtl && (c = -c);
                    var u,
                      h = !1,
                      m =
                        20 *
                        Math.abs(w.velocity) *
                        w.params.freeModeMomentumBounceRatio;
                    if (c < w.maxTranslate())
                      w.params.freeModeMomentumBounce
                        ? (c + w.maxTranslate() < -m &&
                            (c = w.maxTranslate() - m),
                          (u = w.maxTranslate()),
                          (h = !0),
                          (M = !0))
                        : (c = w.maxTranslate());
                    else if (c > w.minTranslate())
                      w.params.freeModeMomentumBounce
                        ? (c - w.minTranslate() > m &&
                            (c = w.minTranslate() + m),
                          (u = w.minTranslate()),
                          (h = !0),
                          (M = !0))
                        : (c = w.minTranslate());
                    else if (w.params.freeModeSticky) {
                      var f,
                        g = 0;
                      for (g = 0; g < w.snapGrid.length; g += 1)
                        if (w.snapGrid[g] > -c) {
                          f = g;
                          break;
                        }
                      (c =
                        Math.abs(w.snapGrid[f] - c) <
                          Math.abs(w.snapGrid[f - 1] - c) ||
                        "next" === w.swipeDirection
                          ? w.snapGrid[f]
                          : w.snapGrid[f - 1]),
                        w.rtl || (c = -c);
                    }
                    if (0 !== w.velocity)
                      d = w.rtl
                        ? Math.abs((-c - w.translate) / w.velocity)
                        : Math.abs((c - w.translate) / w.velocity);
                    else if (w.params.freeModeSticky)
                      return void w.slideReset();
                    w.params.freeModeMomentumBounce && h
                      ? (w.updateProgress(u),
                        w.setWrapperTransition(d),
                        w.setWrapperTranslate(c),
                        w.onTransitionStart(),
                        (w.animating = !0),
                        w.wrapper.transitionEnd(function () {
                          w &&
                            M &&
                            (w.emit("onMomentumBounce", w),
                            w.setWrapperTransition(w.params.speed),
                            w.setWrapperTranslate(u),
                            w.wrapper.transitionEnd(function () {
                              w && w.onTransitionEnd();
                            }));
                        }))
                      : w.velocity
                      ? (w.updateProgress(c),
                        w.setWrapperTransition(d),
                        w.setWrapperTranslate(c),
                        w.onTransitionStart(),
                        w.animating ||
                          ((w.animating = !0),
                          w.wrapper.transitionEnd(function () {
                            w && w.onTransitionEnd();
                          })))
                      : w.updateProgress(c),
                      w.updateActiveIndex();
                  }
                  return void (
                    (!w.params.freeModeMomentum ||
                      a >= w.params.longSwipesMs) &&
                    (w.updateProgress(), w.updateActiveIndex())
                  );
                }
                var v,
                  y = 0,
                  b = w.slidesSizesGrid[0];
                for (
                  v = 0;
                  v < w.slidesGrid.length;
                  v += w.params.slidesPerGroup
                )
                  "undefined" !=
                  typeof w.slidesGrid[v + w.params.slidesPerGroup]
                    ? s >= w.slidesGrid[v] &&
                      s < w.slidesGrid[v + w.params.slidesPerGroup] &&
                      ((y = v),
                      (b =
                        w.slidesGrid[v + w.params.slidesPerGroup] -
                        w.slidesGrid[v]))
                    : s >= w.slidesGrid[v] &&
                      ((y = v),
                      (b =
                        w.slidesGrid[w.slidesGrid.length - 1] -
                        w.slidesGrid[w.slidesGrid.length - 2]));
                var x = (s - w.slidesGrid[y]) / b;
                if (a > w.params.longSwipesMs) {
                  if (!w.params.longSwipes)
                    return void w.slideTo(w.activeIndex);
                  "next" === w.swipeDirection &&
                    (x >= w.params.longSwipesRatio
                      ? w.slideTo(y + w.params.slidesPerGroup)
                      : w.slideTo(y)),
                    "prev" === w.swipeDirection &&
                      (x > 1 - w.params.longSwipesRatio
                        ? w.slideTo(y + w.params.slidesPerGroup)
                        : w.slideTo(y));
                } else {
                  if (!w.params.shortSwipes)
                    return void w.slideTo(w.activeIndex);
                  "next" === w.swipeDirection &&
                    w.slideTo(y + w.params.slidesPerGroup),
                    "prev" === w.swipeDirection && w.slideTo(y);
                }
              }
            }),
            (w._slideTo = function (e, t) {
              return w.slideTo(e, t, !0, !0);
            }),
            (w.slideTo = function (e, t, i, a) {
              "undefined" == typeof i && (i = !0),
                "undefined" == typeof e && (e = 0),
                0 > e && (e = 0),
                (w.snapIndex = Math.floor(e / w.params.slidesPerGroup)),
                w.snapIndex >= w.snapGrid.length &&
                  (w.snapIndex = w.snapGrid.length - 1);
              var s = -w.snapGrid[w.snapIndex];
              w.params.autoplay &&
                w.autoplaying &&
                (a || !w.params.autoplayDisableOnInteraction
                  ? w.pauseAutoplay(t)
                  : w.stopAutoplay()),
                w.updateProgress(s);
              for (var n = 0; n < w.slidesGrid.length; n++)
                -Math.floor(100 * s) >= Math.floor(100 * w.slidesGrid[n]) &&
                  (e = n);
              return !w.params.allowSwipeToNext &&
                s < w.translate &&
                s < w.minTranslate()
                ? !1
                : !w.params.allowSwipeToPrev &&
                  s > w.translate &&
                  s > w.maxTranslate() &&
                  (w.activeIndex || 0) !== e
                ? !1
                : ("undefined" == typeof t && (t = w.params.speed),
                  (w.previousIndex = w.activeIndex || 0),
                  (w.activeIndex = e),
                  (w.rtl && -s === w.translate) || (!w.rtl && s === w.translate)
                    ? (w.params.autoHeight && w.updateAutoHeight(),
                      w.updateClasses(),
                      "slide" !== w.params.effect && w.setWrapperTranslate(s),
                      !1)
                    : (w.updateClasses(),
                      w.onTransitionStart(i),
                      0 === t
                        ? (w.setWrapperTranslate(s),
                          w.setWrapperTransition(0),
                          w.onTransitionEnd(i))
                        : (w.setWrapperTranslate(s),
                          w.setWrapperTransition(t),
                          w.animating ||
                            ((w.animating = !0),
                            w.wrapper.transitionEnd(function () {
                              w && w.onTransitionEnd(i);
                            }))),
                      !0));
            }),
            (w.onTransitionStart = function (e) {
              "undefined" == typeof e && (e = !0),
                w.params.autoHeight && w.updateAutoHeight(),
                w.lazy && w.lazy.onTransitionStart(),
                e &&
                  (w.emit("onTransitionStart", w),
                  w.activeIndex !== w.previousIndex &&
                    (w.emit("onSlideChangeStart", w),
                    w.activeIndex > w.previousIndex
                      ? w.emit("onSlideNextStart", w)
                      : w.emit("onSlidePrevStart", w)));
            }),
            (w.onTransitionEnd = function (e) {
              (w.animating = !1),
                w.setWrapperTransition(0),
                "undefined" == typeof e && (e = !0),
                w.lazy && w.lazy.onTransitionEnd(),
                e &&
                  (w.emit("onTransitionEnd", w),
                  w.activeIndex !== w.previousIndex &&
                    (w.emit("onSlideChangeEnd", w),
                    w.activeIndex > w.previousIndex
                      ? w.emit("onSlideNextEnd", w)
                      : w.emit("onSlidePrevEnd", w))),
                w.params.hashnav && w.hashnav && w.hashnav.setHash();
            }),
            (w.slideNext = function (e, t, i) {
              return w.params.loop
                ? w.animating
                  ? !1
                  : (w.fixLoop(),
                    w.container[0].clientLeft,
                    w.slideTo(w.activeIndex + w.params.slidesPerGroup, t, e, i))
                : w.slideTo(w.activeIndex + w.params.slidesPerGroup, t, e, i);
            }),
            (w._slideNext = function (e) {
              return w.slideNext(!0, e, !0);
            }),
            (w.slidePrev = function (e, t, i) {
              return w.params.loop
                ? w.animating
                  ? !1
                  : (w.fixLoop(),
                    w.container[0].clientLeft,
                    w.slideTo(w.activeIndex - 1, t, e, i))
                : w.slideTo(w.activeIndex - 1, t, e, i);
            }),
            (w._slidePrev = function (e) {
              return w.slidePrev(!0, e, !0);
            }),
            (w.slideReset = function (e, t, i) {
              return w.slideTo(w.activeIndex, t, e);
            }),
            (w.setWrapperTransition = function (e, t) {
              w.wrapper.transition(e),
                "slide" !== w.params.effect &&
                  w.effects[w.params.effect] &&
                  w.effects[w.params.effect].setTransition(e),
                w.params.parallax && w.parallax && w.parallax.setTransition(e),
                w.params.scrollbar &&
                  w.scrollbar &&
                  w.scrollbar.setTransition(e),
                w.params.control &&
                  w.controller &&
                  w.controller.setTransition(e, t),
                w.emit("onSetTransition", w, e);
            }),
            (w.setWrapperTranslate = function (e, t, i) {
              var a = 0,
                n = 0,
                r = 0;
              w.isHorizontal() ? (a = w.rtl ? -e : e) : (n = e),
                w.params.roundLengths && ((a = s(a)), (n = s(n))),
                w.params.virtualTranslate ||
                  (w.support.transforms3d
                    ? w.wrapper.transform(
                        "translate3d(" + a + "px, " + n + "px, " + r + "px)"
                      )
                    : w.wrapper.transform(
                        "translate(" + a + "px, " + n + "px)"
                      )),
                (w.translate = w.isHorizontal() ? a : n);
              var o,
                l = w.maxTranslate() - w.minTranslate();
              (o = 0 === l ? 0 : (e - w.minTranslate()) / l),
                o !== w.progress && w.updateProgress(e),
                t && w.updateActiveIndex(),
                "slide" !== w.params.effect &&
                  w.effects[w.params.effect] &&
                  w.effects[w.params.effect].setTranslate(w.translate),
                w.params.parallax &&
                  w.parallax &&
                  w.parallax.setTranslate(w.translate),
                w.params.scrollbar &&
                  w.scrollbar &&
                  w.scrollbar.setTranslate(w.translate),
                w.params.control &&
                  w.controller &&
                  w.controller.setTranslate(w.translate, i),
                w.emit("onSetTranslate", w, w.translate);
            }),
            (w.getTranslate = function (e, t) {
              var i, a, s, n;
              return (
                "undefined" == typeof t && (t = "x"),
                w.params.virtualTranslate
                  ? w.rtl
                    ? -w.translate
                    : w.translate
                  : ((s = window.getComputedStyle(e, null)),
                    window.WebKitCSSMatrix
                      ? ((a = s.transform || s.webkitTransform),
                        a.split(",").length > 6 &&
                          (a = a
                            .split(", ")
                            .map(function (e) {
                              return e.replace(",", ".");
                            })
                            .join(", ")),
                        (n = new window.WebKitCSSMatrix("none" === a ? "" : a)))
                      : ((n =
                          s.MozTransform ||
                          s.OTransform ||
                          s.MsTransform ||
                          s.msTransform ||
                          s.transform ||
                          s
                            .getPropertyValue("transform")
                            .replace("translate(", "matrix(1, 0, 0, 1,")),
                        (i = n.toString().split(","))),
                    "x" === t &&
                      (a = window.WebKitCSSMatrix
                        ? n.m41
                        : 16 === i.length
                        ? parseFloat(i[12])
                        : parseFloat(i[4])),
                    "y" === t &&
                      (a = window.WebKitCSSMatrix
                        ? n.m42
                        : 16 === i.length
                        ? parseFloat(i[13])
                        : parseFloat(i[5])),
                    w.rtl && a && (a = -a),
                    a || 0)
              );
            }),
            (w.getWrapperTranslate = function (e) {
              return (
                "undefined" == typeof e && (e = w.isHorizontal() ? "x" : "y"),
                w.getTranslate(w.wrapper[0], e)
              );
            }),
            (w.observers = []),
            (w.initObservers = function () {
              if (w.params.observeParents)
                for (var e = w.container.parents(), t = 0; t < e.length; t++)
                  o(e[t]);
              o(w.container[0], { childList: !1 }),
                o(w.wrapper[0], { attributes: !1 });
            }),
            (w.disconnectObservers = function () {
              for (var e = 0; e < w.observers.length; e++)
                w.observers[e].disconnect();
              w.observers = [];
            }),
            (w.createLoop = function () {
              w.wrapper
                .children(
                  "." + w.params.slideClass + "." + w.params.slideDuplicateClass
                )
                .remove();
              var e = w.wrapper.children("." + w.params.slideClass);
              "auto" !== w.params.slidesPerView ||
                w.params.loopedSlides ||
                (w.params.loopedSlides = e.length),
                (w.loopedSlides = parseInt(
                  w.params.loopedSlides || w.params.slidesPerView,
                  10
                )),
                (w.loopedSlides =
                  w.loopedSlides + w.params.loopAdditionalSlides),
                w.loopedSlides > e.length && (w.loopedSlides = e.length);
              var i,
                a = [],
                s = [];
              for (
                e.each(function (i, n) {
                  var r = t(this);
                  i < w.loopedSlides && s.push(n),
                    i < e.length && i >= e.length - w.loopedSlides && a.push(n),
                    r.attr("data-swiper-slide-index", i);
                }),
                  i = 0;
                i < s.length;
                i++
              )
                w.wrapper.append(
                  t(s[i].cloneNode(!0)).addClass(w.params.slideDuplicateClass)
                );
              for (i = a.length - 1; i >= 0; i--)
                w.wrapper.prepend(
                  t(a[i].cloneNode(!0)).addClass(w.params.slideDuplicateClass)
                );
            }),
            (w.destroyLoop = function () {
              w.wrapper
                .children(
                  "." + w.params.slideClass + "." + w.params.slideDuplicateClass
                )
                .remove(),
                w.slides.removeAttr("data-swiper-slide-index");
            }),
            (w.reLoop = function (e) {
              var t = w.activeIndex - w.loopedSlides;
              w.destroyLoop(),
                w.createLoop(),
                w.updateSlidesSize(),
                e && w.slideTo(t + w.loopedSlides, 0, !1);
            }),
            (w.fixLoop = function () {
              var e;
              w.activeIndex < w.loopedSlides
                ? ((e = w.slides.length - 3 * w.loopedSlides + w.activeIndex),
                  (e += w.loopedSlides),
                  w.slideTo(e, 0, !1, !0))
                : (("auto" === w.params.slidesPerView &&
                    w.activeIndex >= 2 * w.loopedSlides) ||
                    w.activeIndex >
                      w.slides.length - 2 * w.params.slidesPerView) &&
                  ((e = -w.slides.length + w.activeIndex + w.loopedSlides),
                  (e += w.loopedSlides),
                  w.slideTo(e, 0, !1, !0));
            }),
            (w.appendSlide = function (e) {
              if (
                (w.params.loop && w.destroyLoop(),
                "object" == typeof e && e.length)
              )
                for (var t = 0; t < e.length; t++)
                  e[t] && w.wrapper.append(e[t]);
              else w.wrapper.append(e);
              w.params.loop && w.createLoop(),
                (w.params.observer && w.support.observer) || w.update(!0);
            }),
            (w.prependSlide = function (e) {
              w.params.loop && w.destroyLoop();
              var t = w.activeIndex + 1;
              if ("object" == typeof e && e.length) {
                for (var i = 0; i < e.length; i++)
                  e[i] && w.wrapper.prepend(e[i]);
                t = w.activeIndex + e.length;
              } else w.wrapper.prepend(e);
              w.params.loop && w.createLoop(),
                (w.params.observer && w.support.observer) || w.update(!0),
                w.slideTo(t, 0, !1);
            }),
            (w.removeSlide = function (e) {
              w.params.loop &&
                (w.destroyLoop(),
                (w.slides = w.wrapper.children("." + w.params.slideClass)));
              var t,
                i = w.activeIndex;
              if ("object" == typeof e && e.length) {
                for (var a = 0; a < e.length; a++)
                  (t = e[a]),
                    w.slides[t] && w.slides.eq(t).remove(),
                    i > t && i--;
                i = Math.max(i, 0);
              } else
                (t = e),
                  w.slides[t] && w.slides.eq(t).remove(),
                  i > t && i--,
                  (i = Math.max(i, 0));
              w.params.loop && w.createLoop(),
                (w.params.observer && w.support.observer) || w.update(!0),
                w.params.loop
                  ? w.slideTo(i + w.loopedSlides, 0, !1)
                  : w.slideTo(i, 0, !1);
            }),
            (w.removeAllSlides = function () {
              for (var e = [], t = 0; t < w.slides.length; t++) e.push(t);
              w.removeSlide(e);
            }),
            (w.effects = {
              fade: {
                setTranslate: function () {
                  for (var e = 0; e < w.slides.length; e++) {
                    var t = w.slides.eq(e),
                      i = t[0].swiperSlideOffset,
                      a = -i;
                    w.params.virtualTranslate || (a -= w.translate);
                    var s = 0;
                    w.isHorizontal() || ((s = a), (a = 0));
                    var n = w.params.fade.crossFade
                      ? Math.max(1 - Math.abs(t[0].progress), 0)
                      : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                    t.css({ opacity: n }).transform(
                      "translate3d(" + a + "px, " + s + "px, 0px)"
                    );
                  }
                },
                setTransition: function (e) {
                  if (
                    (w.slides.transition(e),
                    w.params.virtualTranslate && 0 !== e)
                  ) {
                    var t = !1;
                    w.slides.transitionEnd(function () {
                      if (!t && w) {
                        (t = !0), (w.animating = !1);
                        for (
                          var e = [
                              "webkitTransitionEnd",
                              "transitionend",
                              "oTransitionEnd",
                              "MSTransitionEnd",
                              "msTransitionEnd",
                            ],
                            i = 0;
                          i < e.length;
                          i++
                        )
                          w.wrapper.trigger(e[i]);
                      }
                    });
                  }
                },
              },
              flip: {
                setTranslate: function () {
                  for (var e = 0; e < w.slides.length; e++) {
                    var i = w.slides.eq(e),
                      a = i[0].progress;
                    w.params.flip.limitRotation &&
                      (a = Math.max(Math.min(i[0].progress, 1), -1));
                    var s = i[0].swiperSlideOffset,
                      n = -180 * a,
                      r = n,
                      o = 0,
                      l = -s,
                      d = 0;
                    if (
                      (w.isHorizontal()
                        ? w.rtl && (r = -r)
                        : ((d = l), (l = 0), (o = -r), (r = 0)),
                      (i[0].style.zIndex =
                        -Math.abs(Math.round(a)) + w.slides.length),
                      w.params.flip.slideShadows)
                    ) {
                      var p = w.isHorizontal()
                          ? i.find(".swiper-slide-shadow-left")
                          : i.find(".swiper-slide-shadow-top"),
                        c = w.isHorizontal()
                          ? i.find(".swiper-slide-shadow-right")
                          : i.find(".swiper-slide-shadow-bottom");
                      0 === p.length &&
                        ((p = t(
                          '<div class="swiper-slide-shadow-' +
                            (w.isHorizontal() ? "left" : "top") +
                            '"></div>'
                        )),
                        i.append(p)),
                        0 === c.length &&
                          ((c = t(
                            '<div class="swiper-slide-shadow-' +
                              (w.isHorizontal() ? "right" : "bottom") +
                              '"></div>'
                          )),
                          i.append(c)),
                        p.length && (p[0].style.opacity = Math.max(-a, 0)),
                        c.length && (c[0].style.opacity = Math.max(a, 0));
                    }
                    i.transform(
                      "translate3d(" +
                        l +
                        "px, " +
                        d +
                        "px, 0px) rotateX(" +
                        o +
                        "deg) rotateY(" +
                        r +
                        "deg)"
                    );
                  }
                },
                setTransition: function (e) {
                  if (
                    (w.slides
                      .transition(e)
                      .find(
                        ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                      )
                      .transition(e),
                    w.params.virtualTranslate && 0 !== e)
                  ) {
                    var i = !1;
                    w.slides.eq(w.activeIndex).transitionEnd(function () {
                      if (
                        !i &&
                        w &&
                        t(this).hasClass(w.params.slideActiveClass)
                      ) {
                        (i = !0), (w.animating = !1);
                        for (
                          var e = [
                              "webkitTransitionEnd",
                              "transitionend",
                              "oTransitionEnd",
                              "MSTransitionEnd",
                              "msTransitionEnd",
                            ],
                            a = 0;
                          a < e.length;
                          a++
                        )
                          w.wrapper.trigger(e[a]);
                      }
                    });
                  }
                },
              },
              cube: {
                setTranslate: function () {
                  var e,
                    i = 0;
                  w.params.cube.shadow &&
                    (w.isHorizontal()
                      ? ((e = w.wrapper.find(".swiper-cube-shadow")),
                        0 === e.length &&
                          ((e = t('<div class="swiper-cube-shadow"></div>')),
                          w.wrapper.append(e)),
                        e.css({ height: w.width + "px" }))
                      : ((e = w.container.find(".swiper-cube-shadow")),
                        0 === e.length &&
                          ((e = t('<div class="swiper-cube-shadow"></div>')),
                          w.container.append(e))));
                  for (var a = 0; a < w.slides.length; a++) {
                    var s = w.slides.eq(a),
                      n = 90 * a,
                      r = Math.floor(n / 360);
                    w.rtl && ((n = -n), (r = Math.floor(-n / 360)));
                    var o = Math.max(Math.min(s[0].progress, 1), -1),
                      l = 0,
                      d = 0,
                      p = 0;
                    a % 4 === 0
                      ? ((l = 4 * -r * w.size), (p = 0))
                      : (a - 1) % 4 === 0
                      ? ((l = 0), (p = 4 * -r * w.size))
                      : (a - 2) % 4 === 0
                      ? ((l = w.size + 4 * r * w.size), (p = w.size))
                      : (a - 3) % 4 === 0 &&
                        ((l = -w.size), (p = 3 * w.size + 4 * w.size * r)),
                      w.rtl && (l = -l),
                      w.isHorizontal() || ((d = l), (l = 0));
                    var c =
                      "rotateX(" +
                      (w.isHorizontal() ? 0 : -n) +
                      "deg) rotateY(" +
                      (w.isHorizontal() ? n : 0) +
                      "deg) translate3d(" +
                      l +
                      "px, " +
                      d +
                      "px, " +
                      p +
                      "px)";
                    if (
                      (1 >= o &&
                        o > -1 &&
                        ((i = 90 * a + 90 * o),
                        w.rtl && (i = 90 * -a - 90 * o)),
                      s.transform(c),
                      w.params.cube.slideShadows)
                    ) {
                      var u = w.isHorizontal()
                          ? s.find(".swiper-slide-shadow-left")
                          : s.find(".swiper-slide-shadow-top"),
                        h = w.isHorizontal()
                          ? s.find(".swiper-slide-shadow-right")
                          : s.find(".swiper-slide-shadow-bottom");
                      0 === u.length &&
                        ((u = t(
                          '<div class="swiper-slide-shadow-' +
                            (w.isHorizontal() ? "left" : "top") +
                            '"></div>'
                        )),
                        s.append(u)),
                        0 === h.length &&
                          ((h = t(
                            '<div class="swiper-slide-shadow-' +
                              (w.isHorizontal() ? "right" : "bottom") +
                              '"></div>'
                          )),
                          s.append(h)),
                        u.length && (u[0].style.opacity = Math.max(-o, 0)),
                        h.length && (h[0].style.opacity = Math.max(o, 0));
                    }
                  }
                  if (
                    (w.wrapper.css({
                      "-webkit-transform-origin":
                        "50% 50% -" + w.size / 2 + "px",
                      "-moz-transform-origin": "50% 50% -" + w.size / 2 + "px",
                      "-ms-transform-origin": "50% 50% -" + w.size / 2 + "px",
                      "transform-origin": "50% 50% -" + w.size / 2 + "px",
                    }),
                    w.params.cube.shadow)
                  )
                    if (w.isHorizontal())
                      e.transform(
                        "translate3d(0px, " +
                          (w.width / 2 + w.params.cube.shadowOffset) +
                          "px, " +
                          -w.width / 2 +
                          "px) rotateX(90deg) rotateZ(0deg) scale(" +
                          w.params.cube.shadowScale +
                          ")"
                      );
                    else {
                      var m = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90),
                        f =
                          1.5 -
                          (Math.sin((2 * m * Math.PI) / 360) / 2 +
                            Math.cos((2 * m * Math.PI) / 360) / 2),
                        g = w.params.cube.shadowScale,
                        v = w.params.cube.shadowScale / f,
                        y = w.params.cube.shadowOffset;
                      e.transform(
                        "scale3d(" +
                          g +
                          ", 1, " +
                          v +
                          ") translate3d(0px, " +
                          (w.height / 2 + y) +
                          "px, " +
                          -w.height / 2 / v +
                          "px) rotateX(-90deg)"
                      );
                    }
                  var b = w.isSafari || w.isUiWebView ? -w.size / 2 : 0;
                  w.wrapper.transform(
                    "translate3d(0px,0," +
                      b +
                      "px) rotateX(" +
                      (w.isHorizontal() ? 0 : i) +
                      "deg) rotateY(" +
                      (w.isHorizontal() ? -i : 0) +
                      "deg)"
                  );
                },
                setTransition: function (e) {
                  w.slides
                    .transition(e)
                    .find(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .transition(e),
                    w.params.cube.shadow &&
                      !w.isHorizontal() &&
                      w.container.find(".swiper-cube-shadow").transition(e);
                },
              },
              coverflow: {
                setTranslate: function () {
                  for (
                    var e = w.translate,
                      i = w.isHorizontal()
                        ? -e + w.width / 2
                        : -e + w.height / 2,
                      a = w.isHorizontal()
                        ? w.params.coverflow.rotate
                        : -w.params.coverflow.rotate,
                      s = w.params.coverflow.depth,
                      n = 0,
                      r = w.slides.length;
                    r > n;
                    n++
                  ) {
                    var o = w.slides.eq(n),
                      l = w.slidesSizesGrid[n],
                      d = o[0].swiperSlideOffset,
                      p = ((i - d - l / 2) / l) * w.params.coverflow.modifier,
                      c = w.isHorizontal() ? a * p : 0,
                      u = w.isHorizontal() ? 0 : a * p,
                      h = -s * Math.abs(p),
                      m = w.isHorizontal() ? 0 : w.params.coverflow.stretch * p,
                      f = w.isHorizontal() ? w.params.coverflow.stretch * p : 0;
                    Math.abs(f) < 0.001 && (f = 0),
                      Math.abs(m) < 0.001 && (m = 0),
                      Math.abs(h) < 0.001 && (h = 0),
                      Math.abs(c) < 0.001 && (c = 0),
                      Math.abs(u) < 0.001 && (u = 0);
                    var g =
                      "translate3d(" +
                      f +
                      "px," +
                      m +
                      "px," +
                      h +
                      "px)  rotateX(" +
                      u +
                      "deg) rotateY(" +
                      c +
                      "deg)";
                    if (
                      (o.transform(g),
                      (o[0].style.zIndex = -Math.abs(Math.round(p)) + 1),
                      w.params.coverflow.slideShadows)
                    ) {
                      var v = w.isHorizontal()
                          ? o.find(".swiper-slide-shadow-left")
                          : o.find(".swiper-slide-shadow-top"),
                        y = w.isHorizontal()
                          ? o.find(".swiper-slide-shadow-right")
                          : o.find(".swiper-slide-shadow-bottom");
                      0 === v.length &&
                        ((v = t(
                          '<div class="swiper-slide-shadow-' +
                            (w.isHorizontal() ? "left" : "top") +
                            '"></div>'
                        )),
                        o.append(v)),
                        0 === y.length &&
                          ((y = t(
                            '<div class="swiper-slide-shadow-' +
                              (w.isHorizontal() ? "right" : "bottom") +
                              '"></div>'
                          )),
                          o.append(y)),
                        v.length && (v[0].style.opacity = p > 0 ? p : 0),
                        y.length && (y[0].style.opacity = -p > 0 ? -p : 0);
                    }
                  }
                  if (w.browser.ie) {
                    var b = w.wrapper[0].style;
                    b.perspectiveOrigin = i + "px 50%";
                  }
                },
                setTransition: function (e) {
                  w.slides
                    .transition(e)
                    .find(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .transition(e);
                },
              },
            }),
            (w.lazy = {
              initialImageLoaded: !1,
              loadImageInSlide: function (e, i) {
                if (
                  "undefined" != typeof e &&
                  ("undefined" == typeof i && (i = !0), 0 !== w.slides.length)
                ) {
                  var a = w.slides.eq(e),
                    s = a.find(
                      ".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)"
                    );
                  !a.hasClass("swiper-lazy") ||
                    a.hasClass("swiper-lazy-loaded") ||
                    a.hasClass("swiper-lazy-loading") ||
                    (s = s.add(a[0])),
                    0 !== s.length &&
                      s.each(function () {
                        var e = t(this);
                        e.addClass("swiper-lazy-loading");
                        var s = e.attr("data-background"),
                          n = e.attr("data-src"),
                          r = e.attr("data-srcset");
                        w.loadImage(e[0], n || s, r, !1, function () {
                          if (
                            (s
                              ? (e.css("background-image", 'url("' + s + '")'),
                                e.removeAttr("data-background"))
                              : (r &&
                                  (e.attr("srcset", r),
                                  e.removeAttr("data-srcset")),
                                n &&
                                  (e.attr("src", n), e.removeAttr("data-src"))),
                            e
                              .addClass("swiper-lazy-loaded")
                              .removeClass("swiper-lazy-loading"),
                            a
                              .find(".swiper-lazy-preloader, .preloader")
                              .remove(),
                            w.params.loop && i)
                          ) {
                            var t = a.attr("data-swiper-slide-index");
                            if (a.hasClass(w.params.slideDuplicateClass)) {
                              var o = w.wrapper.children(
                                '[data-swiper-slide-index="' +
                                  t +
                                  '"]:not(.' +
                                  w.params.slideDuplicateClass +
                                  ")"
                              );
                              w.lazy.loadImageInSlide(o.index(), !1);
                            } else {
                              var l = w.wrapper.children(
                                "." +
                                  w.params.slideDuplicateClass +
                                  '[data-swiper-slide-index="' +
                                  t +
                                  '"]'
                              );
                              w.lazy.loadImageInSlide(l.index(), !1);
                            }
                          }
                          w.emit("onLazyImageReady", w, a[0], e[0]);
                        }),
                          w.emit("onLazyImageLoad", w, a[0], e[0]);
                      });
                }
              },
              load: function () {
                var e;
                if (w.params.watchSlidesVisibility)
                  w.wrapper
                    .children("." + w.params.slideVisibleClass)
                    .each(function () {
                      w.lazy.loadImageInSlide(t(this).index());
                    });
                else if (w.params.slidesPerView > 1)
                  for (
                    e = w.activeIndex;
                    e < w.activeIndex + w.params.slidesPerView;
                    e++
                  )
                    w.slides[e] && w.lazy.loadImageInSlide(e);
                else w.lazy.loadImageInSlide(w.activeIndex);
                if (w.params.lazyLoadingInPrevNext)
                  if (
                    w.params.slidesPerView > 1 ||
                    (w.params.lazyLoadingInPrevNextAmount &&
                      w.params.lazyLoadingInPrevNextAmount > 1)
                  ) {
                    var i = w.params.lazyLoadingInPrevNextAmount,
                      a = w.params.slidesPerView,
                      s = Math.min(
                        w.activeIndex + a + Math.max(i, a),
                        w.slides.length
                      ),
                      n = Math.max(w.activeIndex - Math.max(a, i), 0);
                    for (e = w.activeIndex + w.params.slidesPerView; s > e; e++)
                      w.slides[e] && w.lazy.loadImageInSlide(e);
                    for (e = n; e < w.activeIndex; e++)
                      w.slides[e] && w.lazy.loadImageInSlide(e);
                  } else {
                    var r = w.wrapper.children("." + w.params.slideNextClass);
                    r.length > 0 && w.lazy.loadImageInSlide(r.index());
                    var o = w.wrapper.children("." + w.params.slidePrevClass);
                    o.length > 0 && w.lazy.loadImageInSlide(o.index());
                  }
              },
              onTransitionStart: function () {
                w.params.lazyLoading &&
                  (w.params.lazyLoadingOnTransitionStart ||
                    (!w.params.lazyLoadingOnTransitionStart &&
                      !w.lazy.initialImageLoaded)) &&
                  w.lazy.load();
              },
              onTransitionEnd: function () {
                w.params.lazyLoading &&
                  !w.params.lazyLoadingOnTransitionStart &&
                  w.lazy.load();
              },
            }),
            (w.scrollbar = {
              isTouched: !1,
              setDragPosition: function (e) {
                var t = w.scrollbar,
                  i = w.isHorizontal()
                    ? "touchstart" === e.type || "touchmove" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX || e.clientX
                    : "touchstart" === e.type || "touchmove" === e.type
                    ? e.targetTouches[0].pageY
                    : e.pageY || e.clientY,
                  a =
                    i -
                    t.track.offset()[w.isHorizontal() ? "left" : "top"] -
                    t.dragSize / 2,
                  s = -w.minTranslate() * t.moveDivider,
                  n = -w.maxTranslate() * t.moveDivider;
                s > a ? (a = s) : a > n && (a = n),
                  (a = -a / t.moveDivider),
                  w.updateProgress(a),
                  w.setWrapperTranslate(a, !0);
              },
              dragStart: function (e) {
                var t = w.scrollbar;
                (t.isTouched = !0),
                  e.preventDefault(),
                  e.stopPropagation(),
                  t.setDragPosition(e),
                  clearTimeout(t.dragTimeout),
                  t.track.transition(0),
                  w.params.scrollbarHide && t.track.css("opacity", 1),
                  w.wrapper.transition(100),
                  t.drag.transition(100),
                  w.emit("onScrollbarDragStart", w);
              },
              dragMove: function (e) {
                var t = w.scrollbar;
                t.isTouched &&
                  (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                  t.setDragPosition(e),
                  w.wrapper.transition(0),
                  t.track.transition(0),
                  t.drag.transition(0),
                  w.emit("onScrollbarDragMove", w));
              },
              dragEnd: function (e) {
                var t = w.scrollbar;
                t.isTouched &&
                  ((t.isTouched = !1),
                  w.params.scrollbarHide &&
                    (clearTimeout(t.dragTimeout),
                    (t.dragTimeout = setTimeout(function () {
                      t.track.css("opacity", 0), t.track.transition(400);
                    }, 1e3))),
                  w.emit("onScrollbarDragEnd", w),
                  w.params.scrollbarSnapOnRelease && w.slideReset());
              },
              enableDraggable: function () {
                var e = w.scrollbar,
                  i = w.support.touch ? e.track : document;
                t(e.track).on(w.touchEvents.start, e.dragStart),
                  t(i).on(w.touchEvents.move, e.dragMove),
                  t(i).on(w.touchEvents.end, e.dragEnd);
              },
              disableDraggable: function () {
                var e = w.scrollbar,
                  i = w.support.touch ? e.track : document;
                t(e.track).off(w.touchEvents.start, e.dragStart),
                  t(i).off(w.touchEvents.move, e.dragMove),
                  t(i).off(w.touchEvents.end, e.dragEnd);
              },
              set: function () {
                if (w.params.scrollbar) {
                  var e = w.scrollbar;
                  (e.track = t(w.params.scrollbar)),
                    w.params.uniqueNavElements &&
                      "string" == typeof w.params.scrollbar &&
                      e.track.length > 1 &&
                      1 === w.container.find(w.params.scrollbar).length &&
                      (e.track = w.container.find(w.params.scrollbar)),
                    (e.drag = e.track.find(".swiper-scrollbar-drag")),
                    0 === e.drag.length &&
                      ((e.drag = t(
                        '<div class="swiper-scrollbar-drag"></div>'
                      )),
                      e.track.append(e.drag)),
                    (e.drag[0].style.width = ""),
                    (e.drag[0].style.height = ""),
                    (e.trackSize = w.isHorizontal()
                      ? e.track[0].offsetWidth
                      : e.track[0].offsetHeight),
                    (e.divider = w.size / w.virtualSize),
                    (e.moveDivider = e.divider * (e.trackSize / w.size)),
                    (e.dragSize = e.trackSize * e.divider),
                    w.isHorizontal()
                      ? (e.drag[0].style.width = e.dragSize + "px")
                      : (e.drag[0].style.height = e.dragSize + "px"),
                    e.divider >= 1
                      ? (e.track[0].style.display = "none")
                      : (e.track[0].style.display = ""),
                    w.params.scrollbarHide && (e.track[0].style.opacity = 0);
                }
              },
              setTranslate: function () {
                if (w.params.scrollbar) {
                  var e,
                    t = w.scrollbar,
                    i = (w.translate || 0, t.dragSize);
                  (e = (t.trackSize - t.dragSize) * w.progress),
                    w.rtl && w.isHorizontal()
                      ? ((e = -e),
                        e > 0
                          ? ((i = t.dragSize - e), (e = 0))
                          : -e + t.dragSize > t.trackSize &&
                            (i = t.trackSize + e))
                      : 0 > e
                      ? ((i = t.dragSize + e), (e = 0))
                      : e + t.dragSize > t.trackSize && (i = t.trackSize - e),
                    w.isHorizontal()
                      ? (w.support.transforms3d
                          ? t.drag.transform("translate3d(" + e + "px, 0, 0)")
                          : t.drag.transform("translateX(" + e + "px)"),
                        (t.drag[0].style.width = i + "px"))
                      : (w.support.transforms3d
                          ? t.drag.transform("translate3d(0px, " + e + "px, 0)")
                          : t.drag.transform("translateY(" + e + "px)"),
                        (t.drag[0].style.height = i + "px")),
                    w.params.scrollbarHide &&
                      (clearTimeout(t.timeout),
                      (t.track[0].style.opacity = 1),
                      (t.timeout = setTimeout(function () {
                        (t.track[0].style.opacity = 0), t.track.transition(400);
                      }, 1e3)));
                }
              },
              setTransition: function (e) {
                w.params.scrollbar && w.scrollbar.drag.transition(e);
              },
            }),
            (w.controller = {
              LinearSpline: function (e, t) {
                (this.x = e), (this.y = t), (this.lastIndex = e.length - 1);
                var i, a;
                this.x.length,
                  (this.interpolate = function (e) {
                    return e
                      ? ((a = s(this.x, e)),
                        (i = a - 1),
                        ((e - this.x[i]) * (this.y[a] - this.y[i])) /
                          (this.x[a] - this.x[i]) +
                          this.y[i])
                      : 0;
                  });
                var s = (function () {
                  var e, t, i;
                  return function (a, s) {
                    for (t = -1, e = a.length; e - t > 1; )
                      a[(i = (e + t) >> 1)] <= s ? (t = i) : (e = i);
                    return e;
                  };
                })();
              },
              getInterpolateFunction: function (e) {
                w.controller.spline ||
                  (w.controller.spline = w.params.loop
                    ? new w.controller.LinearSpline(w.slidesGrid, e.slidesGrid)
                    : new w.controller.LinearSpline(w.snapGrid, e.snapGrid));
              },
              setTranslate: function (e, t) {
                function a(t) {
                  (e =
                    t.rtl && "horizontal" === t.params.direction
                      ? -w.translate
                      : w.translate),
                    "slide" === w.params.controlBy &&
                      (w.controller.getInterpolateFunction(t),
                      (n = -w.controller.spline.interpolate(-e))),
                    (n && "container" !== w.params.controlBy) ||
                      ((s =
                        (t.maxTranslate() - t.minTranslate()) /
                        (w.maxTranslate() - w.minTranslate())),
                      (n = (e - w.minTranslate()) * s + t.minTranslate())),
                    w.params.controlInverse && (n = t.maxTranslate() - n),
                    t.updateProgress(n),
                    t.setWrapperTranslate(n, !1, w),
                    t.updateActiveIndex();
                }
                var s,
                  n,
                  r = w.params.control;
                if (w.isArray(r))
                  for (var o = 0; o < r.length; o++)
                    r[o] !== t && r[o] instanceof i && a(r[o]);
                else r instanceof i && t !== r && a(r);
              },
              setTransition: function (e, t) {
                function a(t) {
                  t.setWrapperTransition(e, w),
                    0 !== e &&
                      (t.onTransitionStart(),
                      t.wrapper.transitionEnd(function () {
                        n &&
                          (t.params.loop &&
                            "slide" === w.params.controlBy &&
                            t.fixLoop(),
                          t.onTransitionEnd());
                      }));
                }
                var s,
                  n = w.params.control;
                if (w.isArray(n))
                  for (s = 0; s < n.length; s++)
                    n[s] !== t && n[s] instanceof i && a(n[s]);
                else n instanceof i && t !== n && a(n);
              },
            }),
            (w.hashnav = {
              init: function () {
                if (w.params.hashnav) {
                  w.hashnav.initialized = !0;
                  var e = document.location.hash.replace("#", "");
                  if (e)
                    for (var t = 0, i = 0, a = w.slides.length; a > i; i++) {
                      var s = w.slides.eq(i),
                        n = s.attr("data-hash");
                      if (
                        n === e &&
                        !s.hasClass(w.params.slideDuplicateClass)
                      ) {
                        var r = s.index();
                        w.slideTo(r, t, w.params.runCallbacksOnInit, !0);
                      }
                    }
                }
              },
              setHash: function () {
                w.hashnav.initialized &&
                  w.params.hashnav &&
                  (document.location.hash =
                    w.slides.eq(w.activeIndex).attr("data-hash") || "");
              },
            }),
            (w.disableKeyboardControl = function () {
              (w.params.keyboardControl = !1), t(document).off("keydown", l);
            }),
            (w.enableKeyboardControl = function () {
              (w.params.keyboardControl = !0), t(document).on("keydown", l);
            }),
            (w.mousewheel = {
              event: !1,
              lastScrollTime: new window.Date().getTime(),
            }),
            w.params.mousewheelControl)
          ) {
            try {
              new window.WheelEvent("wheel"), (w.mousewheel.event = "wheel");
            } catch (L) {
              (window.WheelEvent ||
                (w.container[0] && "wheel" in w.container[0])) &&
                (w.mousewheel.event = "wheel");
            }
            !w.mousewheel.event && window.WheelEvent,
              w.mousewheel.event ||
                void 0 === document.onmousewheel ||
                (w.mousewheel.event = "mousewheel"),
              w.mousewheel.event || (w.mousewheel.event = "DOMMouseScroll");
          }
          (w.disableMousewheelControl = function () {
            return w.mousewheel.event
              ? (w.container.off(w.mousewheel.event, d), !0)
              : !1;
          }),
            (w.enableMousewheelControl = function () {
              return w.mousewheel.event
                ? (w.container.on(w.mousewheel.event, d), !0)
                : !1;
            }),
            (w.parallax = {
              setTranslate: function () {
                w.container
                  .children(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                  )
                  .each(function () {
                    p(this, w.progress);
                  }),
                  w.slides.each(function () {
                    var e = t(this);
                    e.find(
                      "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                    ).each(function () {
                      var t = Math.min(Math.max(e[0].progress, -1), 1);
                      p(this, t);
                    });
                  });
              },
              setTransition: function (e) {
                "undefined" == typeof e && (e = w.params.speed),
                  w.container
                    .find(
                      "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                    )
                    .each(function () {
                      var i = t(this),
                        a =
                          parseInt(
                            i.attr("data-swiper-parallax-duration"),
                            10
                          ) || e;
                      0 === e && (a = 0), i.transition(a);
                    });
              },
            }),
            (w._plugins = []);
          for (var N in w.plugins) {
            var _ = w.plugins[N](w, w.params[N]);
            _ && w._plugins.push(_);
          }
          return (
            (w.callPlugins = function (e) {
              for (var t = 0; t < w._plugins.length; t++)
                e in w._plugins[t] &&
                  w._plugins[t][e](
                    arguments[1],
                    arguments[2],
                    arguments[3],
                    arguments[4],
                    arguments[5]
                  );
            }),
            (w.emitterEventListeners = {}),
            (w.emit = function (e) {
              w.params[e] &&
                w.params[e](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
              var t;
              if (w.emitterEventListeners[e])
                for (t = 0; t < w.emitterEventListeners[e].length; t++)
                  w.emitterEventListeners[e][t](
                    arguments[1],
                    arguments[2],
                    arguments[3],
                    arguments[4],
                    arguments[5]
                  );
              w.callPlugins &&
                w.callPlugins(
                  e,
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
            }),
            (w.on = function (e, t) {
              return (
                (e = c(e)),
                w.emitterEventListeners[e] || (w.emitterEventListeners[e] = []),
                w.emitterEventListeners[e].push(t),
                w
              );
            }),
            (w.off = function (e, t) {
              var i;
              if (((e = c(e)), "undefined" == typeof t))
                return (w.emitterEventListeners[e] = []), w;
              if (
                w.emitterEventListeners[e] &&
                0 !== w.emitterEventListeners[e].length
              ) {
                for (i = 0; i < w.emitterEventListeners[e].length; i++)
                  w.emitterEventListeners[e][i] === t &&
                    w.emitterEventListeners[e].splice(i, 1);
                return w;
              }
            }),
            (w.once = function (e, t) {
              e = c(e);
              var i = function () {
                t(
                  arguments[0],
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4]
                ),
                  w.off(e, i);
              };
              return w.on(e, i), w;
            }),
            (w.a11y = {
              makeFocusable: function (e) {
                return e.attr("tabIndex", "0"), e;
              },
              addRole: function (e, t) {
                return e.attr("role", t), e;
              },
              addLabel: function (e, t) {
                return e.attr("aria-label", t), e;
              },
              disable: function (e) {
                return e.attr("aria-disabled", !0), e;
              },
              enable: function (e) {
                return e.attr("aria-disabled", !1), e;
              },
              onEnterKey: function (e) {
                13 === e.keyCode &&
                  (t(e.target).is(w.params.nextButton)
                    ? (w.onClickNext(e),
                      w.isEnd
                        ? w.a11y.notify(w.params.lastSlideMessage)
                        : w.a11y.notify(w.params.nextSlideMessage))
                    : t(e.target).is(w.params.prevButton) &&
                      (w.onClickPrev(e),
                      w.isBeginning
                        ? w.a11y.notify(w.params.firstSlideMessage)
                        : w.a11y.notify(w.params.prevSlideMessage)),
                  t(e.target).is("." + w.params.bulletClass) &&
                    t(e.target)[0].click());
              },
              liveRegion: t(
                '<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'
              ),
              notify: function (e) {
                var t = w.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e));
              },
              init: function () {
                w.params.nextButton &&
                  w.nextButton &&
                  w.nextButton.length > 0 &&
                  (w.a11y.makeFocusable(w.nextButton),
                  w.a11y.addRole(w.nextButton, "button"),
                  w.a11y.addLabel(w.nextButton, w.params.nextSlideMessage)),
                  w.params.prevButton &&
                    w.prevButton &&
                    w.prevButton.length > 0 &&
                    (w.a11y.makeFocusable(w.prevButton),
                    w.a11y.addRole(w.prevButton, "button"),
                    w.a11y.addLabel(w.prevButton, w.params.prevSlideMessage)),
                  t(w.container).append(w.a11y.liveRegion);
              },
              initPagination: function () {
                w.params.pagination &&
                  w.params.paginationClickable &&
                  w.bullets &&
                  w.bullets.length &&
                  w.bullets.each(function () {
                    var e = t(this);
                    w.a11y.makeFocusable(e),
                      w.a11y.addRole(e, "button"),
                      w.a11y.addLabel(
                        e,
                        w.params.paginationBulletMessage.replace(
                          /{{index}}/,
                          e.index() + 1
                        )
                      );
                  });
              },
              destroy: function () {
                w.a11y.liveRegion &&
                  w.a11y.liveRegion.length > 0 &&
                  w.a11y.liveRegion.remove();
              },
            }),
            (w.init = function () {
              w.params.loop && w.createLoop(),
                w.updateContainerSize(),
                w.updateSlidesSize(),
                w.updatePagination(),
                w.params.scrollbar &&
                  w.scrollbar &&
                  (w.scrollbar.set(),
                  w.params.scrollbarDraggable && w.scrollbar.enableDraggable()),
                "slide" !== w.params.effect &&
                  w.effects[w.params.effect] &&
                  (w.params.loop || w.updateProgress(),
                  w.effects[w.params.effect].setTranslate()),
                w.params.loop
                  ? w.slideTo(
                      w.params.initialSlide + w.loopedSlides,
                      0,
                      w.params.runCallbacksOnInit
                    )
                  : (w.slideTo(
                      w.params.initialSlide,
                      0,
                      w.params.runCallbacksOnInit
                    ),
                    0 === w.params.initialSlide &&
                      (w.parallax &&
                        w.params.parallax &&
                        w.parallax.setTranslate(),
                      w.lazy &&
                        w.params.lazyLoading &&
                        (w.lazy.load(), (w.lazy.initialImageLoaded = !0)))),
                w.attachEvents(),
                w.params.observer && w.support.observer && w.initObservers(),
                w.params.preloadImages &&
                  !w.params.lazyLoading &&
                  w.preloadImages(),
                w.params.autoplay && w.startAutoplay(),
                w.params.keyboardControl &&
                  w.enableKeyboardControl &&
                  w.enableKeyboardControl(),
                w.params.mousewheelControl &&
                  w.enableMousewheelControl &&
                  w.enableMousewheelControl(),
                w.params.hashnav && w.hashnav && w.hashnav.init(),
                w.params.a11y && w.a11y && w.a11y.init(),
                w.emit("onInit", w);
            }),
            (w.cleanupStyles = function () {
              w.container
                .removeClass(w.classNames.join(" "))
                .removeAttr("style"),
                w.wrapper.removeAttr("style"),
                w.slides &&
                  w.slides.length &&
                  w.slides
                    .removeClass(
                      [
                        w.params.slideVisibleClass,
                        w.params.slideActiveClass,
                        w.params.slideNextClass,
                        w.params.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-column")
                    .removeAttr("data-swiper-row"),
                w.paginationContainer &&
                  w.paginationContainer.length &&
                  w.paginationContainer.removeClass(
                    w.params.paginationHiddenClass
                  ),
                w.bullets &&
                  w.bullets.length &&
                  w.bullets.removeClass(w.params.bulletActiveClass),
                w.params.prevButton &&
                  t(w.params.prevButton).removeClass(
                    w.params.buttonDisabledClass
                  ),
                w.params.nextButton &&
                  t(w.params.nextButton).removeClass(
                    w.params.buttonDisabledClass
                  ),
                w.params.scrollbar &&
                  w.scrollbar &&
                  (w.scrollbar.track &&
                    w.scrollbar.track.length &&
                    w.scrollbar.track.removeAttr("style"),
                  w.scrollbar.drag &&
                    w.scrollbar.drag.length &&
                    w.scrollbar.drag.removeAttr("style"));
            }),
            (w.destroy = function (e, t) {
              w.detachEvents(),
                w.stopAutoplay(),
                w.params.scrollbar &&
                  w.scrollbar &&
                  w.params.scrollbarDraggable &&
                  w.scrollbar.disableDraggable(),
                w.params.loop && w.destroyLoop(),
                t && w.cleanupStyles(),
                w.disconnectObservers(),
                w.params.keyboardControl &&
                  w.disableKeyboardControl &&
                  w.disableKeyboardControl(),
                w.params.mousewheelControl &&
                  w.disableMousewheelControl &&
                  w.disableMousewheelControl(),
                w.params.a11y && w.a11y && w.a11y.destroy(),
                w.emit("onDestroy"),
                e !== !1 && (w = null);
            }),
            w.init(),
            w
          );
        }
      };
    i.prototype = {
      isSafari: (function () {
        var e = navigator.userAgent.toLowerCase();
        return (
          e.indexOf("safari") >= 0 &&
          e.indexOf("chrome") < 0 &&
          e.indexOf("android") < 0
        );
      })(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        navigator.userAgent
      ),
      isArray: function (e) {
        return "[object Array]" === Object.prototype.toString.apply(e);
      },
      browser: {
        ie:
          window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        ieTouch:
          (window.navigator.msPointerEnabled &&
            window.navigator.msMaxTouchPoints > 1) ||
          (window.navigator.pointerEnabled &&
            window.navigator.maxTouchPoints > 1),
      },
      device: (function () {
        var e = navigator.userAgent,
          t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
          i = e.match(/(iPad).*OS\s([\d_]+)/),
          a = e.match(/(iPod)(.*OS\s([\d_]+))?/),
          s = !i && e.match(/(iPhone\sOS)\s([\d_]+)/);
        return { ios: i || s || a, android: t };
      })(),
      support: {
        touch:
          (window.Modernizr && Modernizr.touch === !0) ||
          (function () {
            return !!(
              "ontouchstart" in window ||
              (window.DocumentTouch && document instanceof DocumentTouch)
            );
          })(),
        transforms3d:
          (window.Modernizr && Modernizr.csstransforms3d === !0) ||
          (function () {
            var e = document.createElement("div").style;
            return (
              "webkitPerspective" in e ||
              "MozPerspective" in e ||
              "OPerspective" in e ||
              "MsPerspective" in e ||
              "perspective" in e
            );
          })(),
        flexbox: (function () {
          for (
            var e = document.createElement("div").style,
              t =
                "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                  " "
                ),
              i = 0;
            i < t.length;
            i++
          )
            if (t[i] in e) return !0;
        })(),
        observer: (function () {
          return (
            "MutationObserver" in window || "WebkitMutationObserver" in window
          );
        })(),
      },
      plugins: {},
    };
    for (var a = ["jQuery", "Zepto", "Dom7"], s = 0; s < a.length; s++)
      window[a[s]] && e(window[a[s]]);
    var n;
    (n =
      "undefined" == typeof Dom7
        ? window.Dom7 || window.Zepto || window.jQuery
        : Dom7),
      n &&
        ("transitionEnd" in n.fn ||
          (n.fn.transitionEnd = function (e) {
            function t(n) {
              if (n.target === this)
                for (e.call(this, n), i = 0; i < a.length; i++) s.off(a[i], t);
            }
            var i,
              a = [
                "webkitTransitionEnd",
                "transitionend",
                "oTransitionEnd",
                "MSTransitionEnd",
                "msTransitionEnd",
              ],
              s = this;
            if (e) for (i = 0; i < a.length; i++) s.on(a[i], t);
            return this;
          }),
        "transform" in n.fn ||
          (n.fn.transform = function (e) {
            for (var t = 0; t < this.length; t++) {
              var i = this[t].style;
              i.webkitTransform =
                i.MsTransform =
                i.msTransform =
                i.MozTransform =
                i.OTransform =
                i.transform =
                  e;
            }
            return this;
          }),
        "transition" in n.fn ||
          (n.fn.transition = function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t++) {
              var i = this[t].style;
              i.webkitTransitionDuration =
                i.MsTransitionDuration =
                i.msTransitionDuration =
                i.MozTransitionDuration =
                i.OTransitionDuration =
                i.transitionDuration =
                  e;
            }
            return this;
          })),
      (window.Swiper = i);
  })(),
  "undefined" != typeof module
    ? (module.exports = window.Swiper)
    : "function" == typeof define &&
      define.amd &&
      define([], function () {
        "use strict";
        return window.Swiper;
      }),
  !(function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(
          "object" == typeof exports
            ? require("jquery")
            : window.jQuery || window.Zepto
        );
  })(function (e) {
    var t,
      i,
      a,
      s,
      n,
      r,
      o = "Close",
      l = "BeforeClose",
      d = "AfterClose",
      p = "BeforeAppend",
      c = "MarkupParse",
      u = "Open",
      h = "Change",
      m = "mfp",
      f = "." + m,
      g = "mfp-ready",
      v = "mfp-removing",
      y = "mfp-prevent-close",
      w = function () {},
      b = !!window.jQuery,
      x = e(window),
      S = function (e, i) {
        t.ev.on(m + e + f, i);
      },
      T = function (t, i, a, s) {
        var n = document.createElement("div");
        return (
          (n.className = "mfp-" + t),
          a && (n.innerHTML = a),
          s ? i && i.appendChild(n) : ((n = e(n)), i && n.appendTo(i)),
          n
        );
      },
      C = function (i, a) {
        t.ev.triggerHandler(m + i, a),
          t.st.callbacks &&
            ((i = i.charAt(0).toLowerCase() + i.slice(1)),
            t.st.callbacks[i] &&
              t.st.callbacks[i].apply(t, e.isArray(a) ? a : [a]));
      },
      I = function (i) {
        return (
          (i === r && t.currTemplate.closeBtn) ||
            ((t.currTemplate.closeBtn = e(
              t.st.closeMarkup.replace("%title%", t.st.tClose)
            )),
            (r = i)),
          t.currTemplate.closeBtn
        );
      },
      $ = function () {
        e.magnificPopup.instance ||
          ((t = new w()), t.init(), (e.magnificPopup.instance = t));
      },
      k = function () {
        var e = document.createElement("p").style,
          t = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== e.transition) return !0;
        for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
        return !1;
      };
    (w.prototype = {
      constructor: w,
      init: function () {
        var i = navigator.appVersion;
        (t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
          (t.isAndroid = /android/gi.test(i)),
          (t.isIOS = /iphone|ipad|ipod/gi.test(i)),
          (t.supportsTransition = k()),
          (t.probablyMobile =
            t.isAndroid ||
            t.isIOS ||
            /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
              navigator.userAgent
            )),
          (a = e(document)),
          (t.popupsCache = {});
      },
      open: function (i) {
        var s;
        if (i.isObj === !1) {
          (t.items = i.items.toArray()), (t.index = 0);
          var r,
            o = i.items;
          for (s = 0; s < o.length; s++)
            if (((r = o[s]), r.parsed && (r = r.el[0]), r === i.el[0])) {
              t.index = s;
              break;
            }
        } else
          (t.items = e.isArray(i.items) ? i.items : [i.items]),
            (t.index = i.index || 0);
        if (t.isOpen) return void t.updateItemHTML();
        (t.types = []),
          (n = ""),
          i.mainEl && i.mainEl.length ? (t.ev = i.mainEl.eq(0)) : (t.ev = a),
          i.key
            ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}),
              (t.currTemplate = t.popupsCache[i.key]))
            : (t.currTemplate = {}),
          (t.st = e.extend(!0, {}, e.magnificPopup.defaults, i)),
          (t.fixedContentPos =
            "auto" === t.st.fixedContentPos
              ? !t.probablyMobile
              : t.st.fixedContentPos),
          t.st.modal &&
            ((t.st.closeOnContentClick = !1),
            (t.st.closeOnBgClick = !1),
            (t.st.showCloseBtn = !1),
            (t.st.enableEscapeKey = !1)),
          t.bgOverlay ||
            ((t.bgOverlay = T("bg").on("click" + f, function () {
              t.close();
            })),
            (t.wrap = T("wrap")
              .attr("tabindex", -1)
              .on("click" + f, function (e) {
                t._checkIfClose(e.target) && t.close();
              })),
            (t.container = T("container", t.wrap))),
          (t.contentContainer = T("content")),
          t.st.preloader &&
            (t.preloader = T("preloader", t.container, t.st.tLoading));
        var l = e.magnificPopup.modules;
        for (s = 0; s < l.length; s++) {
          var d = l[s];
          (d = d.charAt(0).toUpperCase() + d.slice(1)), t["init" + d].call(t);
        }
        C("BeforeOpen"),
          t.st.showCloseBtn &&
            (t.st.closeBtnInside
              ? (S(c, function (e, t, i, a) {
                  i.close_replaceWith = I(a.type);
                }),
                (n += " mfp-close-btn-in"))
              : t.wrap.append(I())),
          t.st.alignTop && (n += " mfp-align-top"),
          t.fixedContentPos
            ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY,
              })
            : t.wrap.css({ top: x.scrollTop(), position: "absolute" }),
          (t.st.fixedBgPos === !1 ||
            ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) &&
            t.bgOverlay.css({ height: a.height(), position: "absolute" }),
          t.st.enableEscapeKey &&
            a.on("keyup" + f, function (e) {
              27 === e.keyCode && t.close();
            }),
          x.on("resize" + f, function () {
            t.updateSize();
          }),
          t.st.closeOnContentClick || (n += " mfp-auto-cursor"),
          n && t.wrap.addClass(n);
        var p = (t.wH = x.height()),
          h = {};
        if (t.fixedContentPos && t._hasScrollBar(p)) {
          var m = t._getScrollbarSize();
          m && (h.marginRight = m);
        }
        t.fixedContentPos &&
          (t.isIE7
            ? e("body, html").css("overflow", "hidden")
            : (h.overflow = "hidden"));
        var v = t.st.mainClass;
        return (
          t.isIE7 && (v += " mfp-ie7"),
          v && t._addClassToMFP(v),
          t.updateItemHTML(),
          C("BuildControls"),
          e("html").css(h),
          t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
          (t._lastFocusedEl = document.activeElement),
          setTimeout(function () {
            t.content
              ? (t._addClassToMFP(g), t._setFocus())
              : t.bgOverlay.addClass(g),
              a.on("focusin" + f, t._onFocusIn);
          }, 16),
          (t.isOpen = !0),
          t.updateSize(p),
          C(u),
          i
        );
      },
      close: function () {
        t.isOpen &&
          (C(l),
          (t.isOpen = !1),
          t.st.removalDelay && !t.isLowIE && t.supportsTransition
            ? (t._addClassToMFP(v),
              setTimeout(function () {
                t._close();
              }, t.st.removalDelay))
            : t._close());
      },
      _close: function () {
        C(o);
        var i = v + " " + g + " ";
        if (
          (t.bgOverlay.detach(),
          t.wrap.detach(),
          t.container.empty(),
          t.st.mainClass && (i += t.st.mainClass + " "),
          t._removeClassFromMFP(i),
          t.fixedContentPos)
        ) {
          var s = { marginRight: "" };
          t.isIE7 ? e("body, html").css("overflow", "") : (s.overflow = ""),
            e("html").css(s);
        }
        a.off("keyup" + f + " focusin" + f),
          t.ev.off(f),
          t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
          t.bgOverlay.attr("class", "mfp-bg"),
          t.container.attr("class", "mfp-container"),
          !t.st.showCloseBtn ||
            (t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0) ||
            (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
          t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
          (t.currItem = null),
          (t.content = null),
          (t.currTemplate = null),
          (t.prevHeight = 0),
          C(d);
      },
      updateSize: function (e) {
        if (t.isIOS) {
          var i = document.documentElement.clientWidth / window.innerWidth,
            a = window.innerHeight * i;
          t.wrap.css("height", a), (t.wH = a);
        } else t.wH = e || x.height();
        t.fixedContentPos || t.wrap.css("height", t.wH), C("Resize");
      },
      updateItemHTML: function () {
        var i = t.items[t.index];
        t.contentContainer.detach(),
          t.content && t.content.detach(),
          i.parsed || (i = t.parseEl(t.index));
        var a = i.type;
        if (
          (C("BeforeChange", [t.currItem ? t.currItem.type : "", a]),
          (t.currItem = i),
          !t.currTemplate[a])
        ) {
          var n = t.st[a] ? t.st[a].markup : !1;
          C("FirstMarkupParse", n),
            n ? (t.currTemplate[a] = e(n)) : (t.currTemplate[a] = !0);
        }
        s && s !== i.type && t.container.removeClass("mfp-" + s + "-holder");
        var r = t["get" + a.charAt(0).toUpperCase() + a.slice(1)](
          i,
          t.currTemplate[a]
        );
        t.appendContent(r, a),
          (i.preloaded = !0),
          C(h, i),
          (s = i.type),
          t.container.prepend(t.contentContainer),
          C("AfterChange");
      },
      appendContent: function (e, i) {
        (t.content = e),
          e
            ? t.st.showCloseBtn &&
              t.st.closeBtnInside &&
              t.currTemplate[i] === !0
              ? t.content.find(".mfp-close").length || t.content.append(I())
              : (t.content = e)
            : (t.content = ""),
          C(p),
          t.container.addClass("mfp-" + i + "-holder"),
          t.contentContainer.append(t.content);
      },
      parseEl: function (i) {
        var a,
          s = t.items[i];
        if (
          (s.tagName
            ? (s = { el: e(s) })
            : ((a = s.type), (s = { data: s, src: s.src })),
          s.el)
        ) {
          for (var n = t.types, r = 0; r < n.length; r++)
            if (s.el.hasClass("mfp-" + n[r])) {
              a = n[r];
              break;
            }
          (s.src = s.el.attr("data-mfp-src")),
            s.src || (s.src = s.el.attr("href"));
        }
        return (
          (s.type = a || t.st.type || "inline"),
          (s.index = i),
          (s.parsed = !0),
          (t.items[i] = s),
          C("ElementParse", s),
          t.items[i]
        );
      },
      addGroup: function (e, i) {
        var a = function (a) {
          (a.mfpEl = this), t._openClick(a, e, i);
        };
        i || (i = {});
        var s = "click.magnificPopup";
        (i.mainEl = e),
          i.items
            ? ((i.isObj = !0), e.off(s).on(s, a))
            : ((i.isObj = !1),
              i.delegate
                ? e.off(s).on(s, i.delegate, a)
                : ((i.items = e), e.off(s).on(s, a)));
      },
      _openClick: function (i, a, s) {
        var n =
          void 0 !== s.midClick
            ? s.midClick
            : e.magnificPopup.defaults.midClick;
        if (
          n ||
          !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)
        ) {
          var r =
            void 0 !== s.disableOn
              ? s.disableOn
              : e.magnificPopup.defaults.disableOn;
          if (r)
            if (e.isFunction(r)) {
              if (!r.call(t)) return !0;
            } else if (x.width() < r) return !0;
          i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()),
            (s.el = e(i.mfpEl)),
            s.delegate && (s.items = a.find(s.delegate)),
            t.open(s);
        }
      },
      updateStatus: function (e, a) {
        if (t.preloader) {
          i !== e && t.container.removeClass("mfp-s-" + i),
            a || "loading" !== e || (a = t.st.tLoading);
          var s = { status: e, text: a };
          C("UpdateStatus", s),
            (e = s.status),
            (a = s.text),
            t.preloader.html(a),
            t.preloader.find("a").on("click", function (e) {
              e.stopImmediatePropagation();
            }),
            t.container.addClass("mfp-s-" + e),
            (i = e);
        }
      },
      _checkIfClose: function (i) {
        if (!e(i).hasClass(y)) {
          var a = t.st.closeOnContentClick,
            s = t.st.closeOnBgClick;
          if (a && s) return !0;
          if (
            !t.content ||
            e(i).hasClass("mfp-close") ||
            (t.preloader && i === t.preloader[0])
          )
            return !0;
          if (i === t.content[0] || e.contains(t.content[0], i)) {
            if (a) return !0;
          } else if (s && e.contains(document, i)) return !0;
          return !1;
        }
      },
      _addClassToMFP: function (e) {
        t.bgOverlay.addClass(e), t.wrap.addClass(e);
      },
      _removeClassFromMFP: function (e) {
        this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
      },
      _hasScrollBar: function (e) {
        return (
          (t.isIE7 ? a.height() : document.body.scrollHeight) >
          (e || x.height())
        );
      },
      _setFocus: function () {
        (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
      },
      _onFocusIn: function (i) {
        return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target)
          ? void 0
          : (t._setFocus(), !1);
      },
      _parseMarkup: function (t, i, a) {
        var s;
        a.data && (i = e.extend(a.data, i)),
          C(c, [t, i, a]),
          e.each(i, function (i, a) {
            if (void 0 === a || a === !1) return !0;
            if (((s = i.split("_")), s.length > 1)) {
              var n = t.find(f + "-" + s[0]);
              if (n.length > 0) {
                var r = s[1];
                "replaceWith" === r
                  ? n[0] !== a[0] && n.replaceWith(a)
                  : "img" === r
                  ? n.is("img")
                    ? n.attr("src", a)
                    : n.replaceWith(
                        e("<img>").attr("src", a).attr("class", n.attr("class"))
                      )
                  : n.attr(s[1], a);
              }
            } else t.find(f + "-" + i).html(a);
          });
      },
      _getScrollbarSize: function () {
        if (void 0 === t.scrollbarSize) {
          var e = document.createElement("div");
          (e.style.cssText =
            "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
            document.body.appendChild(e),
            (t.scrollbarSize = e.offsetWidth - e.clientWidth),
            document.body.removeChild(e);
        }
        return t.scrollbarSize;
      },
    }),
      (e.magnificPopup = {
        instance: null,
        proto: w.prototype,
        modules: [],
        open: function (t, i) {
          return (
            $(),
            (t = t ? e.extend(!0, {}, t) : {}),
            (t.isObj = !0),
            (t.index = i || 0),
            this.instance.open(t)
          );
        },
        close: function () {
          return e.magnificPopup.instance && e.magnificPopup.instance.close();
        },
        registerModule: function (t, i) {
          i.options && (e.magnificPopup.defaults[t] = i.options),
            e.extend(this.proto, i.proto),
            this.modules.push(t);
        },
        defaults: {
          disableOn: 0,
          key: null,
          midClick: !1,
          mainClass: "",
          preloader: !0,
          focus: "",
          closeOnContentClick: !1,
          closeOnBgClick: !0,
          closeBtnInside: !0,
          showCloseBtn: !0,
          enableEscapeKey: !0,
          modal: !1,
          alignTop: !1,
          removalDelay: 0,
          prependTo: null,
          fixedContentPos: "auto",
          fixedBgPos: "auto",
          overflowY: "auto",
          closeMarkup:
            '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
          tClose: "Close (Esc)",
          tLoading: "Loading...",
          autoFocusLast: !0,
        },
      }),
      (e.fn.magnificPopup = function (i) {
        $();
        var a = e(this);
        if ("string" == typeof i)
          if ("open" === i) {
            var s,
              n = b ? a.data("magnificPopup") : a[0].magnificPopup,
              r = parseInt(arguments[1], 10) || 0;
            n.items
              ? (s = n.items[r])
              : ((s = a),
                n.delegate && (s = s.find(n.delegate)),
                (s = s.eq(r))),
              t._openClick({ mfpEl: s }, a, n);
          } else
            t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
        else
          (i = e.extend(!0, {}, i)),
            b ? a.data("magnificPopup", i) : (a[0].magnificPopup = i),
            t.addGroup(a, i);
        return a;
      });
    var E,
      z,
      P,
      M = "inline",
      D = function () {
        P && (z.after(P.addClass(E)).detach(), (P = null));
      };
    e.magnificPopup.registerModule(M, {
      options: {
        hiddenClass: "hide",
        markup: "",
        tNotFound: "Content not found",
      },
      proto: {
        initInline: function () {
          t.types.push(M),
            S(o + "." + M, function () {
              D();
            });
        },
        getInline: function (i, a) {
          if ((D(), i.src)) {
            var s = t.st.inline,
              n = e(i.src);
            if (n.length) {
              var r = n[0].parentNode;
              r &&
                r.tagName &&
                (z || ((E = s.hiddenClass), (z = T(E)), (E = "mfp-" + E)),
                (P = n.after(z).detach().removeClass(E))),
                t.updateStatus("ready");
            } else t.updateStatus("error", s.tNotFound), (n = e("<div>"));
            return (i.inlineElement = n), n;
          }
          return t.updateStatus("ready"), t._parseMarkup(a, {}, i), a;
        },
      },
    });
    var O,
      A = "ajax",
      B = function () {
        O && e(document.body).removeClass(O);
      },
      R = function () {
        B(), t.req && t.req.abort();
      };
    e.magnificPopup.registerModule(A, {
      options: {
        settings: null,
        cursor: "mfp-ajax-cur",
        tError: '<a href="%url%">The content</a> could not be loaded.',
      },
      proto: {
        initAjax: function () {
          t.types.push(A),
            (O = t.st.ajax.cursor),
            S(o + "." + A, R),
            S("BeforeChange." + A, R);
        },
        getAjax: function (i) {
          O && e(document.body).addClass(O), t.updateStatus("loading");
          var a = e.extend(
            {
              url: i.src,
              success: function (a, s, n) {
                var r = { data: a, xhr: n };
                C("ParseAjax", r),
                  t.appendContent(e(r.data), A),
                  (i.finished = !0),
                  B(),
                  t._setFocus(),
                  setTimeout(function () {
                    t.wrap.addClass(g);
                  }, 16),
                  t.updateStatus("ready"),
                  C("AjaxContentAdded");
              },
              error: function () {
                B(),
                  (i.finished = i.loadError = !0),
                  t.updateStatus(
                    "error",
                    t.st.ajax.tError.replace("%url%", i.src)
                  );
              },
            },
            t.st.ajax.settings
          );
          return (t.req = e.ajax(a)), "";
        },
      },
    });
    var L,
      N = function (i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var a = t.st.image.titleSrc;
        if (a) {
          if (e.isFunction(a)) return a.call(t, i);
          if (i.el) return i.el.attr(a) || "";
        }
        return "";
      };
    e.magnificPopup.registerModule("image", {
      options: {
        markup:
          '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
        cursor: "mfp-zoom-out-cur",
        titleSrc: "title",
        verticalFit: !0,
        tError: '<a href="%url%">The image</a> could not be loaded.',
      },
      proto: {
        initImage: function () {
          var i = t.st.image,
            a = ".image";
          t.types.push("image"),
            S(u + a, function () {
              "image" === t.currItem.type &&
                i.cursor &&
                e(document.body).addClass(i.cursor);
            }),
            S(o + a, function () {
              i.cursor && e(document.body).removeClass(i.cursor),
                x.off("resize" + f);
            }),
            S("Resize" + a, t.resizeImage),
            t.isLowIE && S("AfterChange", t.resizeImage);
        },
        resizeImage: function () {
          var e = t.currItem;
          if (e && e.img && t.st.image.verticalFit) {
            var i = 0;
            t.isLowIE &&
              (i =
                parseInt(e.img.css("padding-top"), 10) +
                parseInt(e.img.css("padding-bottom"), 10)),
              e.img.css("max-height", t.wH - i);
          }
        },
        _onImageHasSize: function (e) {
          e.img &&
            ((e.hasSize = !0),
            L && clearInterval(L),
            (e.isCheckingImgSize = !1),
            C("ImageHasSize", e),
            e.imgHidden &&
              (t.content && t.content.removeClass("mfp-loading"),
              (e.imgHidden = !1)));
        },
        findImageSize: function (e) {
          var i = 0,
            a = e.img[0],
            s = function (n) {
              L && clearInterval(L),
                (L = setInterval(function () {
                  return a.naturalWidth > 0
                    ? void t._onImageHasSize(e)
                    : (i > 200 && clearInterval(L),
                      i++,
                      void (3 === i
                        ? s(10)
                        : 40 === i
                        ? s(50)
                        : 100 === i && s(500)));
                }, n));
            };
          s(1);
        },
        getImage: function (i, a) {
          var s = 0,
            n = function () {
              i &&
                (i.img[0].complete
                  ? (i.img.off(".mfploader"),
                    i === t.currItem &&
                      (t._onImageHasSize(i), t.updateStatus("ready")),
                    (i.hasSize = !0),
                    (i.loaded = !0),
                    C("ImageLoadComplete"))
                  : (s++, 200 > s ? setTimeout(n, 100) : r()));
            },
            r = function () {
              i &&
                (i.img.off(".mfploader"),
                i === t.currItem &&
                  (t._onImageHasSize(i),
                  t.updateStatus("error", o.tError.replace("%url%", i.src))),
                (i.hasSize = !0),
                (i.loaded = !0),
                (i.loadError = !0));
            },
            o = t.st.image,
            l = a.find(".mfp-img");
          if (l.length) {
            var d = document.createElement("img");
            (d.className = "mfp-img"),
              i.el &&
                i.el.find("img").length &&
                (d.alt = i.el.find("img").attr("alt")),
              (i.img = e(d).on("load.mfploader", n).on("error.mfploader", r)),
              (d.src = i.src),
              l.is("img") && (i.img = i.img.clone()),
              (d = i.img[0]),
              d.naturalWidth > 0
                ? (i.hasSize = !0)
                : d.width || (i.hasSize = !1);
          }
          return (
            t._parseMarkup(a, { title: N(i), img_replaceWith: i.img }, i),
            t.resizeImage(),
            i.hasSize
              ? (L && clearInterval(L),
                i.loadError
                  ? (a.addClass("mfp-loading"),
                    t.updateStatus("error", o.tError.replace("%url%", i.src)))
                  : (a.removeClass("mfp-loading"), t.updateStatus("ready")),
                a)
              : (t.updateStatus("loading"),
                (i.loading = !0),
                i.hasSize ||
                  ((i.imgHidden = !0),
                  a.addClass("mfp-loading"),
                  t.findImageSize(i)),
                a)
          );
        },
      },
    });
    var _,
      H = function () {
        return (
          void 0 === _ &&
            (_ = void 0 !== document.createElement("p").style.MozTransform),
          _
        );
      };
    e.magnificPopup.registerModule("zoom", {
      options: {
        enabled: !1,
        easing: "ease-in-out",
        duration: 300,
        opener: function (e) {
          return e.is("img") ? e : e.find("img");
        },
      },
      proto: {
        initZoom: function () {
          var e,
            i = t.st.zoom,
            a = ".zoom";
          if (i.enabled && t.supportsTransition) {
            var s,
              n,
              r = i.duration,
              d = function (e) {
                var t = e
                    .clone()
                    .removeAttr("style")
                    .removeAttr("class")
                    .addClass("mfp-animated-image"),
                  a = "all " + i.duration / 1e3 + "s " + i.easing,
                  s = {
                    position: "fixed",
                    zIndex: 9999,
                    left: 0,
                    top: 0,
                    "-webkit-backface-visibility": "hidden",
                  },
                  n = "transition";
                return (
                  (s["-webkit-" + n] =
                    s["-moz-" + n] =
                    s["-o-" + n] =
                    s[n] =
                      a),
                  t.css(s),
                  t
                );
              },
              p = function () {
                t.content.css("visibility", "visible");
              };
            S("BuildControls" + a, function () {
              if (t._allowZoom()) {
                if (
                  (clearTimeout(s),
                  t.content.css("visibility", "hidden"),
                  (e = t._getItemToZoom()),
                  !e)
                )
                  return void p();
                (n = d(e)),
                  n.css(t._getOffset()),
                  t.wrap.append(n),
                  (s = setTimeout(function () {
                    n.css(t._getOffset(!0)),
                      (s = setTimeout(function () {
                        p(),
                          setTimeout(function () {
                            n.remove(), (e = n = null), C("ZoomAnimationEnded");
                          }, 16);
                      }, r));
                  }, 16));
              }
            }),
              S(l + a, function () {
                if (t._allowZoom()) {
                  if ((clearTimeout(s), (t.st.removalDelay = r), !e)) {
                    if (((e = t._getItemToZoom()), !e)) return;
                    n = d(e);
                  }
                  n.css(t._getOffset(!0)),
                    t.wrap.append(n),
                    t.content.css("visibility", "hidden"),
                    setTimeout(function () {
                      n.css(t._getOffset());
                    }, 16);
                }
              }),
              S(o + a, function () {
                t._allowZoom() && (p(), n && n.remove(), (e = null));
              });
          }
        },
        _allowZoom: function () {
          return "image" === t.currItem.type;
        },
        _getItemToZoom: function () {
          return t.currItem.hasSize ? t.currItem.img : !1;
        },
        _getOffset: function (i) {
          var a;
          a = i
            ? t.currItem.img
            : t.st.zoom.opener(t.currItem.el || t.currItem);
          var s = a.offset(),
            n = parseInt(a.css("padding-top"), 10),
            r = parseInt(a.css("padding-bottom"), 10);
          s.top -= e(window).scrollTop() - n;
          var o = {
            width: a.width(),
            height: (b ? a.innerHeight() : a[0].offsetHeight) - r - n,
          };
          return (
            H()
              ? (o["-moz-transform"] = o.transform =
                  "translate(" + s.left + "px," + s.top + "px)")
              : ((o.left = s.left), (o.top = s.top)),
            o
          );
        },
      },
    });
    var j = "iframe",
      G = "//about:blank",
      W = function (e) {
        if (t.currTemplate[j]) {
          var i = t.currTemplate[j].find("iframe");
          i.length &&
            (e || (i[0].src = G),
            t.isIE8 && i.css("display", e ? "block" : "none"));
        }
      };
    e.magnificPopup.registerModule(j, {
      options: {
        markup:
          '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
        srcAction: "iframe_src",
        patterns: {
          youtube: {
            index: "youtube.com",
            id: "v=",
            src: "//www.youtube.com/embed/%id%?autoplay=1",
          },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1",
          },
          gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
        },
      },
      proto: {
        initIframe: function () {
          t.types.push(j),
            S("BeforeChange", function (e, t, i) {
              t !== i && (t === j ? W() : i === j && W(!0));
            }),
            S(o + "." + j, function () {
              W();
            });
        },
        getIframe: function (i, a) {
          var s = i.src,
            n = t.st.iframe;
          e.each(n.patterns, function () {
            return s.indexOf(this.index) > -1
              ? (this.id &&
                  (s =
                    "string" == typeof this.id
                      ? s.substr(
                          s.lastIndexOf(this.id) + this.id.length,
                          s.length
                        )
                      : this.id.call(this, s)),
                (s = this.src.replace("%id%", s)),
                !1)
              : void 0;
          });
          var r = {};
          return (
            n.srcAction && (r[n.srcAction] = s),
            t._parseMarkup(a, r, i),
            t.updateStatus("ready"),
            a
          );
        },
      },
    });
    var F = function (e) {
        var i = t.items.length;
        return e > i - 1 ? e - i : 0 > e ? i + e : e;
      },
      U = function (e, t, i) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i);
      };
    e.magnificPopup.registerModule("gallery", {
      options: {
        enabled: !1,
        arrowMarkup:
          '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
        preload: [0, 2],
        navigateByImgClick: !0,
        arrows: !0,
        tPrev: "Previous (Left arrow key)",
        tNext: "Next (Right arrow key)",
        tCounter: "%curr% of %total%",
      },
      proto: {
        initGallery: function () {
          var i = t.st.gallery,
            s = ".mfp-gallery";
          return (
            (t.direction = !0),
            i && i.enabled
              ? ((n += " mfp-gallery"),
                S(u + s, function () {
                  i.navigateByImgClick &&
                    t.wrap.on("click" + s, ".mfp-img", function () {
                      return t.items.length > 1 ? (t.next(), !1) : void 0;
                    }),
                    a.on("keydown" + s, function (e) {
                      37 === e.keyCode
                        ? t.prev()
                        : 39 === e.keyCode && t.next();
                    });
                }),
                S("UpdateStatus" + s, function (e, i) {
                  i.text &&
                    (i.text = U(i.text, t.currItem.index, t.items.length));
                }),
                S(c + s, function (e, a, s, n) {
                  var r = t.items.length;
                  s.counter = r > 1 ? U(i.tCounter, n.index, r) : "";
                }),
                S("BuildControls" + s, function () {
                  if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                    var a = i.arrowMarkup,
                      s = (t.arrowLeft = e(
                        a
                          .replace(/%title%/gi, i.tPrev)
                          .replace(/%dir%/gi, "left")
                      ).addClass(y)),
                      n = (t.arrowRight = e(
                        a
                          .replace(/%title%/gi, i.tNext)
                          .replace(/%dir%/gi, "right")
                      ).addClass(y));
                    s.click(function () {
                      t.prev();
                    }),
                      n.click(function () {
                        t.next();
                      }),
                      t.container.append(s.add(n));
                  }
                }),
                S(h + s, function () {
                  t._preloadTimeout && clearTimeout(t._preloadTimeout),
                    (t._preloadTimeout = setTimeout(function () {
                      t.preloadNearbyImages(), (t._preloadTimeout = null);
                    }, 16));
                }),
                void S(o + s, function () {
                  a.off(s),
                    t.wrap.off("click" + s),
                    (t.arrowRight = t.arrowLeft = null);
                }))
              : !1
          );
        },
        next: function () {
          (t.direction = !0), (t.index = F(t.index + 1)), t.updateItemHTML();
        },
        prev: function () {
          (t.direction = !1), (t.index = F(t.index - 1)), t.updateItemHTML();
        },
        goTo: function (e) {
          (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
        },
        preloadNearbyImages: function () {
          var e,
            i = t.st.gallery.preload,
            a = Math.min(i[0], t.items.length),
            s = Math.min(i[1], t.items.length);
          for (e = 1; e <= (t.direction ? s : a); e++)
            t._preloadItem(t.index + e);
          for (e = 1; e <= (t.direction ? a : s); e++)
            t._preloadItem(t.index - e);
        },
        _preloadItem: function (i) {
          if (((i = F(i)), !t.items[i].preloaded)) {
            var a = t.items[i];
            a.parsed || (a = t.parseEl(i)),
              C("LazyLoad", a),
              "image" === a.type &&
                (a.img = e('<img class="mfp-img" />')
                  .on("load.mfploader", function () {
                    a.hasSize = !0;
                  })
                  .on("error.mfploader", function () {
                    (a.hasSize = !0), (a.loadError = !0), C("LazyLoadError", a);
                  })
                  .attr("src", a.src)),
              (a.preloaded = !0);
          }
        },
      },
    });
    var V = "retina";
    e.magnificPopup.registerModule(V, {
      options: {
        replaceSrc: function (e) {
          return e.src.replace(/\.\w+$/, function (e) {
            return "@2x" + e;
          });
        },
        ratio: 1,
      },
      proto: {
        initRetina: function () {
          if (window.devicePixelRatio > 1) {
            var e = t.st.retina,
              i = e.ratio;
            (i = isNaN(i) ? i() : i),
              i > 1 &&
                (S("ImageHasSize." + V, function (e, t) {
                  t.img.css({
                    "max-width": t.img[0].naturalWidth / i,
                    width: "100%",
                  });
                }),
                S("ElementParse." + V, function (t, a) {
                  a.src = e.replaceSrc(a, i);
                }));
          }
        },
      },
    }),
      $();
  }),
  "undefined" == typeof jQuery)
)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (e) {
  "use strict";
  var t = e.fn.jquery.split(" ")[0].split(".");
  if (
    (t[0] < 2 && t[1] < 9) ||
    (1 == t[0] && 9 == t[1] && t[2] < 1) ||
    t[0] > 2
  )
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3"
    );
})(jQuery),
  +(function (e) {
    "use strict";
    function t() {
      var e = document.createElement("bootstrap"),
        t = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var i in t) if (void 0 !== e.style[i]) return { end: t[i] };
      return !1;
    }
    (e.fn.emulateTransitionEnd = function (t) {
      var i = !1,
        a = this;
      e(this).one("bsTransitionEnd", function () {
        i = !0;
      });
      var s = function () {
        i || e(a).trigger(e.support.transition.end);
      };
      return setTimeout(s, t), this;
    }),
      e(function () {
        (e.support.transition = t()),
          e.support.transition &&
            (e.event.special.bsTransitionEnd = {
              bindType: e.support.transition.end,
              delegateType: e.support.transition.end,
              handle: function (t) {
                return e(t.target).is(this)
                  ? t.handleObj.handler.apply(this, arguments)
                  : void 0;
              },
            });
      });
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var i = e(this),
          s = i.data("bs.alert");
        s || i.data("bs.alert", (s = new a(this))),
          "string" == typeof t && s[t].call(i);
      });
    }
    var i = '[data-dismiss="alert"]',
      a = function (t) {
        e(t).on("click", i, this.close);
      };
    (a.VERSION = "3.3.6"),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.close = function (t) {
        function i() {
          r.detach().trigger("closed.bs.alert").remove();
        }
        var s = e(this),
          n = s.attr("data-target");
        n || ((n = s.attr("href")), (n = n && n.replace(/.*(?=#[^\s]*$)/, "")));
        var r = e(n);
        t && t.preventDefault(),
          r.length || (r = s.closest(".alert")),
          r.trigger((t = e.Event("close.bs.alert"))),
          t.isDefaultPrevented() ||
            (r.removeClass("in"),
            e.support.transition && r.hasClass("fade")
              ? r
                  .one("bsTransitionEnd", i)
                  .emulateTransitionEnd(a.TRANSITION_DURATION)
              : i());
      });
    var s = e.fn.alert;
    (e.fn.alert = t),
      (e.fn.alert.Constructor = a),
      (e.fn.alert.noConflict = function () {
        return (e.fn.alert = s), this;
      }),
      e(document).on("click.bs.alert.data-api", i, a.prototype.close);
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var a = e(this),
          s = a.data("bs.button"),
          n = "object" == typeof t && t;
        s || a.data("bs.button", (s = new i(this, n))),
          "toggle" == t ? s.toggle() : t && s.setState(t);
      });
    }
    var i = function (t, a) {
      (this.$element = e(t)),
        (this.options = e.extend({}, i.DEFAULTS, a)),
        (this.isLoading = !1);
    };
    (i.VERSION = "3.3.6"),
      (i.DEFAULTS = { loadingText: "loading..." }),
      (i.prototype.setState = function (t) {
        var i = "disabled",
          a = this.$element,
          s = a.is("input") ? "val" : "html",
          n = a.data();
        (t += "Text"),
          null == n.resetText && a.data("resetText", a[s]()),
          setTimeout(
            e.proxy(function () {
              a[s](null == n[t] ? this.options[t] : n[t]),
                "loadingText" == t
                  ? ((this.isLoading = !0), a.addClass(i).attr(i, i))
                  : this.isLoading &&
                    ((this.isLoading = !1), a.removeClass(i).removeAttr(i));
            }, this),
            0
          );
      }),
      (i.prototype.toggle = function () {
        var e = !0,
          t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
          var i = this.$element.find("input");
          "radio" == i.prop("type")
            ? (i.prop("checked") && (e = !1),
              t.find(".active").removeClass("active"),
              this.$element.addClass("active"))
            : "checkbox" == i.prop("type") &&
              (i.prop("checked") !== this.$element.hasClass("active") &&
                (e = !1),
              this.$element.toggleClass("active")),
            i.prop("checked", this.$element.hasClass("active")),
            e && i.trigger("change");
        } else
          this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active");
      });
    var a = e.fn.button;
    (e.fn.button = t),
      (e.fn.button.Constructor = i),
      (e.fn.button.noConflict = function () {
        return (e.fn.button = a), this;
      }),
      e(document)
        .on(
          "click.bs.button.data-api",
          '[data-toggle^="button"]',
          function (i) {
            var a = e(i.target);
            a.hasClass("btn") || (a = a.closest(".btn")),
              t.call(a, "toggle"),
              e(i.target).is('input[type="radio"]') ||
                e(i.target).is('input[type="checkbox"]') ||
                i.preventDefault();
          }
        )
        .on(
          "focus.bs.button.data-api blur.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            e(t.target)
              .closest(".btn")
              .toggleClass("focus", /^focus(in)?$/.test(t.type));
          }
        );
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var a = e(this),
          s = a.data("bs.carousel"),
          n = e.extend({}, i.DEFAULTS, a.data(), "object" == typeof t && t),
          r = "string" == typeof t ? t : n.slide;
        s || a.data("bs.carousel", (s = new i(this, n))),
          "number" == typeof t
            ? s.to(t)
            : r
            ? s[r]()
            : n.interval && s.pause().cycle();
      });
    }
    var i = function (t, i) {
      (this.$element = e(t)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = i),
        (this.paused = null),
        (this.sliding = null),
        (this.interval = null),
        (this.$active = null),
        (this.$items = null),
        this.options.keyboard &&
          this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this)),
        "hover" == this.options.pause &&
          !("ontouchstart" in document.documentElement) &&
          this.$element
            .on("mouseenter.bs.carousel", e.proxy(this.pause, this))
            .on("mouseleave.bs.carousel", e.proxy(this.cycle, this));
    };
    (i.VERSION = "3.3.6"),
      (i.TRANSITION_DURATION = 600),
      (i.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
      (i.prototype.keydown = function (e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
          switch (e.which) {
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
              break;
            default:
              return;
          }
          e.preventDefault();
        }
      }),
      (i.prototype.cycle = function (t) {
        return (
          t || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              e.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (i.prototype.getItemIndex = function (e) {
        return (
          (this.$items = e.parent().children(".item")),
          this.$items.index(e || this.$active)
        );
      }),
      (i.prototype.getItemForDirection = function (e, t) {
        var i = this.getItemIndex(t),
          a =
            ("prev" == e && 0 === i) ||
            ("next" == e && i == this.$items.length - 1);
        if (a && !this.options.wrap) return t;
        var s = "prev" == e ? -1 : 1,
          n = (i + s) % this.$items.length;
        return this.$items.eq(n);
      }),
      (i.prototype.to = function (e) {
        var t = this,
          i = this.getItemIndex(
            (this.$active = this.$element.find(".item.active"))
          );
        return e > this.$items.length - 1 || 0 > e
          ? void 0
          : this.sliding
          ? this.$element.one("slid.bs.carousel", function () {
              t.to(e);
            })
          : i == e
          ? this.pause().cycle()
          : this.slide(e > i ? "next" : "prev", this.$items.eq(e));
      }),
      (i.prototype.pause = function (t) {
        return (
          t || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            e.support.transition &&
            (this.$element.trigger(e.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (i.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next");
      }),
      (i.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev");
      }),
      (i.prototype.slide = function (t, a) {
        var s = this.$element.find(".item.active"),
          n = a || this.getItemForDirection(t, s),
          r = this.interval,
          o = "next" == t ? "left" : "right",
          l = this;
        if (n.hasClass("active")) return (this.sliding = !1);
        var d = n[0],
          p = e.Event("slide.bs.carousel", { relatedTarget: d, direction: o });
        if ((this.$element.trigger(p), !p.isDefaultPrevented())) {
          if (
            ((this.sliding = !0), r && this.pause(), this.$indicators.length)
          ) {
            this.$indicators.find(".active").removeClass("active");
            var c = e(this.$indicators.children()[this.getItemIndex(n)]);
            c && c.addClass("active");
          }
          var u = e.Event("slid.bs.carousel", {
            relatedTarget: d,
            direction: o,
          });
          return (
            e.support.transition && this.$element.hasClass("slide")
              ? (n.addClass(t),
                n[0].offsetWidth,
                s.addClass(o),
                n.addClass(o),
                s
                  .one("bsTransitionEnd", function () {
                    n.removeClass([t, o].join(" ")).addClass("active"),
                      s.removeClass(["active", o].join(" ")),
                      (l.sliding = !1),
                      setTimeout(function () {
                        l.$element.trigger(u);
                      }, 0);
                  })
                  .emulateTransitionEnd(i.TRANSITION_DURATION))
              : (s.removeClass("active"),
                n.addClass("active"),
                (this.sliding = !1),
                this.$element.trigger(u)),
            r && this.cycle(),
            this
          );
        }
      });
    var a = e.fn.carousel;
    (e.fn.carousel = t),
      (e.fn.carousel.Constructor = i),
      (e.fn.carousel.noConflict = function () {
        return (e.fn.carousel = a), this;
      });
    var s = function (i) {
      var a,
        s = e(this),
        n = e(
          s.attr("data-target") ||
            ((a = s.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, ""))
        );
      if (n.hasClass("carousel")) {
        var r = e.extend({}, n.data(), s.data()),
          o = s.attr("data-slide-to");
        o && (r.interval = !1),
          t.call(n, r),
          o && n.data("bs.carousel").to(o),
          i.preventDefault();
      }
    };
    e(document)
      .on("click.bs.carousel.data-api", "[data-slide]", s)
      .on("click.bs.carousel.data-api", "[data-slide-to]", s),
      e(window).on("load", function () {
        e('[data-ride="carousel"]').each(function () {
          var i = e(this);
          t.call(i, i.data());
        });
      });
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      var i,
        a =
          t.attr("data-target") ||
          ((i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
      return e(a);
    }
    function i(t) {
      return this.each(function () {
        var i = e(this),
          s = i.data("bs.collapse"),
          n = e.extend({}, a.DEFAULTS, i.data(), "object" == typeof t && t);
        !s && n.toggle && /show|hide/.test(t) && (n.toggle = !1),
          s || i.data("bs.collapse", (s = new a(this, n))),
          "string" == typeof t && s[t]();
      });
    }
    var a = function (t, i) {
      (this.$element = e(t)),
        (this.options = e.extend({}, a.DEFAULTS, i)),
        (this.$trigger = e(
          '[data-toggle="collapse"][href="#' +
            t.id +
            '"],[data-toggle="collapse"][data-target="#' +
            t.id +
            '"]'
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    (a.VERSION = "3.3.6"),
      (a.TRANSITION_DURATION = 350),
      (a.DEFAULTS = { toggle: !0 }),
      (a.prototype.dimension = function () {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height";
      }),
      (a.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var t,
            s =
              this.$parent &&
              this.$parent.children(".panel").children(".in, .collapsing");
          if (
            !(
              s &&
              s.length &&
              ((t = s.data("bs.collapse")), t && t.transitioning)
            )
          ) {
            var n = e.Event("show.bs.collapse");
            if ((this.$element.trigger(n), !n.isDefaultPrevented())) {
              s &&
                s.length &&
                (i.call(s, "hide"), t || s.data("bs.collapse", null));
              var r = this.dimension();
              this.$element
                .removeClass("collapse")
                .addClass("collapsing")
                [r](0)
                .attr("aria-expanded", !0),
                this.$trigger
                  .removeClass("collapsed")
                  .attr("aria-expanded", !0),
                (this.transitioning = 1);
              var o = function () {
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse in")
                  [r](""),
                  (this.transitioning = 0),
                  this.$element.trigger("shown.bs.collapse");
              };
              if (!e.support.transition) return o.call(this);
              var l = e.camelCase(["scroll", r].join("-"));
              this.$element
                .one("bsTransitionEnd", e.proxy(o, this))
                .emulateTransitionEnd(a.TRANSITION_DURATION)
                [r](this.$element[0][l]);
            }
          }
        }
      }),
      (a.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var t = e.Event("hide.bs.collapse");
          if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
            var i = this.dimension();
            this.$element[i](this.$element[i]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse in")
                .attr("aria-expanded", !1),
              this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
              (this.transitioning = 1);
            var s = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
            };
            return e.support.transition
              ? void this.$element[i](0)
                  .one("bsTransitionEnd", e.proxy(s, this))
                  .emulateTransitionEnd(a.TRANSITION_DURATION)
              : s.call(this);
          }
        }
      }),
      (a.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (a.prototype.getParent = function () {
        return e(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]'
          )
          .each(
            e.proxy(function (i, a) {
              var s = e(a);
              this.addAriaAndCollapsedClass(t(s), s);
            }, this)
          )
          .end();
      }),
      (a.prototype.addAriaAndCollapsedClass = function (e, t) {
        var i = e.hasClass("in");
        e.attr("aria-expanded", i),
          t.toggleClass("collapsed", !i).attr("aria-expanded", i);
      });
    var s = e.fn.collapse;
    (e.fn.collapse = i),
      (e.fn.collapse.Constructor = a),
      (e.fn.collapse.noConflict = function () {
        return (e.fn.collapse = s), this;
      }),
      e(document).on(
        "click.bs.collapse.data-api",
        '[data-toggle="collapse"]',
        function (a) {
          var s = e(this);
          s.attr("data-target") || a.preventDefault();
          var n = t(s),
            r = n.data("bs.collapse"),
            o = r ? "toggle" : s.data();
          i.call(n, o);
        }
      );
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      var i = t.attr("data-target");
      i ||
        ((i = t.attr("href")),
        (i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")));
      var a = i && e(i);
      return a && a.length ? a : t.parent();
    }
    function i(i) {
      (i && 3 === i.which) ||
        (e(s).remove(),
        e(n).each(function () {
          var a = e(this),
            s = t(a),
            n = { relatedTarget: this };
          s.hasClass("open") &&
            ((i &&
              "click" == i.type &&
              /input|textarea/i.test(i.target.tagName) &&
              e.contains(s[0], i.target)) ||
              (s.trigger((i = e.Event("hide.bs.dropdown", n))),
              i.isDefaultPrevented() ||
                (a.attr("aria-expanded", "false"),
                s
                  .removeClass("open")
                  .trigger(e.Event("hidden.bs.dropdown", n)))));
        }));
    }
    function a(t) {
      return this.each(function () {
        var i = e(this),
          a = i.data("bs.dropdown");
        a || i.data("bs.dropdown", (a = new r(this))),
          "string" == typeof t && a[t].call(i);
      });
    }
    var s = ".dropdown-backdrop",
      n = '[data-toggle="dropdown"]',
      r = function (t) {
        e(t).on("click.bs.dropdown", this.toggle);
      };
    (r.VERSION = "3.3.6"),
      (r.prototype.toggle = function (a) {
        var s = e(this);
        if (!s.is(".disabled, :disabled")) {
          var n = t(s),
            r = n.hasClass("open");
          if ((i(), !r)) {
            "ontouchstart" in document.documentElement &&
              !n.closest(".navbar-nav").length &&
              e(document.createElement("div"))
                .addClass("dropdown-backdrop")
                .insertAfter(e(this))
                .on("click", i);
            var o = { relatedTarget: this };
            if (
              (n.trigger((a = e.Event("show.bs.dropdown", o))),
              a.isDefaultPrevented())
            )
              return;
            s.trigger("focus").attr("aria-expanded", "true"),
              n.toggleClass("open").trigger(e.Event("shown.bs.dropdown", o));
          }
          return !1;
        }
      }),
      (r.prototype.keydown = function (i) {
        if (
          /(38|40|27|32)/.test(i.which) &&
          !/input|textarea/i.test(i.target.tagName)
        ) {
          var a = e(this);
          if (
            (i.preventDefault(),
            i.stopPropagation(),
            !a.is(".disabled, :disabled"))
          ) {
            var s = t(a),
              r = s.hasClass("open");
            if ((!r && 27 != i.which) || (r && 27 == i.which))
              return (
                27 == i.which && s.find(n).trigger("focus"), a.trigger("click")
              );
            var o = " li:not(.disabled):visible a",
              l = s.find(".dropdown-menu" + o);
            if (l.length) {
              var d = l.index(i.target);
              38 == i.which && d > 0 && d--,
                40 == i.which && d < l.length - 1 && d++,
                ~d || (d = 0),
                l.eq(d).trigger("focus");
            }
          }
        }
      });
    var o = e.fn.dropdown;
    (e.fn.dropdown = a),
      (e.fn.dropdown.Constructor = r),
      (e.fn.dropdown.noConflict = function () {
        return (e.fn.dropdown = o), this;
      }),
      e(document)
        .on("click.bs.dropdown.data-api", i)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
          e.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", n, r.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", n, r.prototype.keydown)
        .on(
          "keydown.bs.dropdown.data-api",
          ".dropdown-menu",
          r.prototype.keydown
        );
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t, a) {
      return this.each(function () {
        var s = e(this),
          n = s.data("bs.modal"),
          r = e.extend({}, i.DEFAULTS, s.data(), "object" == typeof t && t);
        n || s.data("bs.modal", (n = new i(this, r))),
          "string" == typeof t ? n[t](a) : r.show && n.show(a);
      });
    }
    var i = function (t, i) {
      (this.options = i),
        (this.$body = e(document.body)),
        (this.$element = e(t)),
        (this.$dialog = this.$element.find(".modal-dialog")),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            e.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    (i.VERSION = "3.3.6"),
      (i.TRANSITION_DURATION = 300),
      (i.BACKDROP_TRANSITION_DURATION = 150),
      (i.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (i.prototype.toggle = function (e) {
        return this.isShown ? this.hide() : this.show(e);
      }),
      (i.prototype.show = function (t) {
        var a = this,
          s = e.Event("show.bs.modal", { relatedTarget: t });
        this.$element.trigger(s),
          this.isShown ||
            s.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass("modal-open"),
            this.escape(),
            this.resize(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              e.proxy(this.hide, this)
            ),
            this.$dialog.on("mousedown.dismiss.bs.modal", function () {
              a.$element.one("mouseup.dismiss.bs.modal", function (t) {
                e(t.target).is(a.$element) && (a.ignoreBackdropClick = !0);
              });
            }),
            this.backdrop(function () {
              var s = e.support.transition && a.$element.hasClass("fade");
              a.$element.parent().length || a.$element.appendTo(a.$body),
                a.$element.show().scrollTop(0),
                a.adjustDialog(),
                s && a.$element[0].offsetWidth,
                a.$element.addClass("in"),
                a.enforceFocus();
              var n = e.Event("shown.bs.modal", { relatedTarget: t });
              s
                ? a.$dialog
                    .one("bsTransitionEnd", function () {
                      a.$element.trigger("focus").trigger(n);
                    })
                    .emulateTransitionEnd(i.TRANSITION_DURATION)
                : a.$element.trigger("focus").trigger(n);
            }));
      }),
      (i.prototype.hide = function (t) {
        t && t.preventDefault(),
          (t = e.Event("hide.bs.modal")),
          this.$element.trigger(t),
          this.isShown &&
            !t.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            e(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .off("click.dismiss.bs.modal")
              .off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"),
            e.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one("bsTransitionEnd", e.proxy(this.hideModal, this))
                  .emulateTransitionEnd(i.TRANSITION_DURATION)
              : this.hideModal());
      }),
      (i.prototype.enforceFocus = function () {
        e(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            e.proxy(function (e) {
              this.$element[0] === e.target ||
                this.$element.has(e.target).length ||
                this.$element.trigger("focus");
            }, this)
          );
      }),
      (i.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keydown.dismiss.bs.modal",
              e.proxy(function (e) {
                27 == e.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
      }),
      (i.prototype.resize = function () {
        this.isShown
          ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this))
          : e(window).off("resize.bs.modal");
      }),
      (i.prototype.hideModal = function () {
        var e = this;
        this.$element.hide(),
          this.backdrop(function () {
            e.$body.removeClass("modal-open"),
              e.resetAdjustments(),
              e.resetScrollbar(),
              e.$element.trigger("hidden.bs.modal");
          });
      }),
      (i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (i.prototype.backdrop = function (t) {
        var a = this,
          s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var n = e.support.transition && s;
          if (
            ((this.$backdrop = e(document.createElement("div"))
              .addClass("modal-backdrop " + s)
              .appendTo(this.$body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              e.proxy(function (e) {
                return this.ignoreBackdropClick
                  ? void (this.ignoreBackdropClick = !1)
                  : void (
                      e.target === e.currentTarget &&
                      ("static" == this.options.backdrop
                        ? this.$element[0].focus()
                        : this.hide())
                    );
              }, this)
            ),
            n && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !t)
          )
            return;
          n
            ? this.$backdrop
                .one("bsTransitionEnd", t)
                .emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION)
            : t();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass("in");
          var r = function () {
            a.removeBackdrop(), t && t();
          };
          e.support.transition && this.$element.hasClass("fade")
            ? this.$backdrop
                .one("bsTransitionEnd", r)
                .emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION)
            : r();
        } else t && t();
      }),
      (i.prototype.handleUpdate = function () {
        this.adjustDialog();
      }),
      (i.prototype.adjustDialog = function () {
        var e =
          this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
          paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : "",
        });
      }),
      (i.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
      }),
      (i.prototype.checkScrollbar = function () {
        var e = window.innerWidth;
        if (!e) {
          var t = document.documentElement.getBoundingClientRect();
          e = t.right - Math.abs(t.left);
        }
        (this.bodyIsOverflowing = document.body.clientWidth < e),
          (this.scrollbarWidth = this.measureScrollbar());
      }),
      (i.prototype.setScrollbar = function () {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        (this.originalBodyPad = document.body.style.paddingRight || ""),
          this.bodyIsOverflowing &&
            this.$body.css("padding-right", e + this.scrollbarWidth);
      }),
      (i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad);
      }),
      (i.prototype.measureScrollbar = function () {
        var e = document.createElement("div");
        (e.className = "modal-scrollbar-measure"), this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e), t;
      });
    var a = e.fn.modal;
    (e.fn.modal = t),
      (e.fn.modal.Constructor = i),
      (e.fn.modal.noConflict = function () {
        return (e.fn.modal = a), this;
      }),
      e(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (i) {
          var a = e(this),
            s = a.attr("href"),
            n = e(
              a.attr("data-target") || (s && s.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            r = n.data("bs.modal")
              ? "toggle"
              : e.extend({ remote: !/#/.test(s) && s }, n.data(), a.data());
          a.is("a") && i.preventDefault(),
            n.one("show.bs.modal", function (e) {
              e.isDefaultPrevented() ||
                n.one("hidden.bs.modal", function () {
                  a.is(":visible") && a.trigger("focus");
                });
            }),
            t.call(n, r, this);
        }
      );
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var a = e(this),
          s = a.data("bs.tooltip"),
          n = "object" == typeof t && t;
        (s || !/destroy|hide/.test(t)) &&
          (s || a.data("bs.tooltip", (s = new i(this, n))),
          "string" == typeof t && s[t]());
      });
    }
    var i = function (e, t) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        (this.inState = null),
        this.init("tooltip", e, t);
    };
    (i.VERSION = "3.3.6"),
      (i.TRANSITION_DURATION = 150),
      (i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
      }),
      (i.prototype.init = function (t, i, a) {
        if (
          ((this.enabled = !0),
          (this.type = t),
          (this.$element = e(i)),
          (this.options = this.getOptions(a)),
          (this.$viewport =
            this.options.viewport &&
            e(
              e.isFunction(this.options.viewport)
                ? this.options.viewport.call(this, this.$element)
                : this.options.viewport.selector || this.options.viewport
            )),
          (this.inState = { click: !1, hover: !1, focus: !1 }),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            "`selector` option must be specified when initializing " +
              this.type +
              " on the window.document object!"
          );
        for (var s = this.options.trigger.split(" "), n = s.length; n--; ) {
          var r = s[n];
          if ("click" == r)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              e.proxy(this.toggle, this)
            );
          else if ("manual" != r) {
            var o = "hover" == r ? "mouseenter" : "focusin",
              l = "hover" == r ? "mouseleave" : "focusout";
            this.$element.on(
              o + "." + this.type,
              this.options.selector,
              e.proxy(this.enter, this)
            ),
              this.$element.on(
                l + "." + this.type,
                this.options.selector,
                e.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = e.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (i.prototype.getDefaults = function () {
        return i.DEFAULTS;
      }),
      (i.prototype.getOptions = function (t) {
        return (
          (t = e.extend({}, this.getDefaults(), this.$element.data(), t)),
          t.delay &&
            "number" == typeof t.delay &&
            (t.delay = { show: t.delay, hide: t.delay }),
          t
        );
      }),
      (i.prototype.getDelegateOptions = function () {
        var t = {},
          i = this.getDefaults();
        return (
          this._options &&
            e.each(this._options, function (e, a) {
              i[e] != a && (t[e] = a);
            }),
          t
        );
      }),
      (i.prototype.enter = function (t) {
        var i =
          t instanceof this.constructor
            ? t
            : e(t.currentTarget).data("bs." + this.type);
        return (
          i ||
            ((i = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            e(t.currentTarget).data("bs." + this.type, i)),
          t instanceof e.Event &&
            (i.inState["focusin" == t.type ? "focus" : "hover"] = !0),
          i.tip().hasClass("in") || "in" == i.hoverState
            ? void (i.hoverState = "in")
            : (clearTimeout(i.timeout),
              (i.hoverState = "in"),
              i.options.delay && i.options.delay.show
                ? void (i.timeout = setTimeout(function () {
                    "in" == i.hoverState && i.show();
                  }, i.options.delay.show))
                : i.show())
        );
      }),
      (i.prototype.isInStateTrue = function () {
        for (var e in this.inState) if (this.inState[e]) return !0;
        return !1;
      }),
      (i.prototype.leave = function (t) {
        var i =
          t instanceof this.constructor
            ? t
            : e(t.currentTarget).data("bs." + this.type);
        return (
          i ||
            ((i = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            e(t.currentTarget).data("bs." + this.type, i)),
          t instanceof e.Event &&
            (i.inState["focusout" == t.type ? "focus" : "hover"] = !1),
          i.isInStateTrue()
            ? void 0
            : (clearTimeout(i.timeout),
              (i.hoverState = "out"),
              i.options.delay && i.options.delay.hide
                ? void (i.timeout = setTimeout(function () {
                    "out" == i.hoverState && i.hide();
                  }, i.options.delay.hide))
                : i.hide())
        );
      }),
      (i.prototype.show = function () {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(t);
          var a = e.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0]
          );
          if (t.isDefaultPrevented() || !a) return;
          var s = this,
            n = this.tip(),
            r = this.getUID(this.type);
          this.setContent(),
            n.attr("id", r),
            this.$element.attr("aria-describedby", r),
            this.options.animation && n.addClass("fade");
          var o =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, n[0], this.$element[0])
                : this.options.placement,
            l = /\s?auto?\s?/i,
            d = l.test(o);
          d && (o = o.replace(l, "") || "top"),
            n
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(o)
              .data("bs." + this.type, this),
            this.options.container
              ? n.appendTo(this.options.container)
              : n.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
          var p = this.getPosition(),
            c = n[0].offsetWidth,
            u = n[0].offsetHeight;
          if (d) {
            var h = o,
              m = this.getPosition(this.$viewport);
            (o =
              "bottom" == o && p.bottom + u > m.bottom
                ? "top"
                : "top" == o && p.top - u < m.top
                ? "bottom"
                : "right" == o && p.right + c > m.width
                ? "left"
                : "left" == o && p.left - c < m.left
                ? "right"
                : o),
              n.removeClass(h).addClass(o);
          }
          var f = this.getCalculatedOffset(o, p, c, u);
          this.applyPlacement(f, o);
          var g = function () {
            var e = s.hoverState;
            s.$element.trigger("shown.bs." + s.type),
              (s.hoverState = null),
              "out" == e && s.leave(s);
          };
          e.support.transition && this.$tip.hasClass("fade")
            ? n
                .one("bsTransitionEnd", g)
                .emulateTransitionEnd(i.TRANSITION_DURATION)
            : g();
        }
      }),
      (i.prototype.applyPlacement = function (t, i) {
        var a = this.tip(),
          s = a[0].offsetWidth,
          n = a[0].offsetHeight,
          r = parseInt(a.css("margin-top"), 10),
          o = parseInt(a.css("margin-left"), 10);
        isNaN(r) && (r = 0),
          isNaN(o) && (o = 0),
          (t.top += r),
          (t.left += o),
          e.offset.setOffset(
            a[0],
            e.extend(
              {
                using: function (e) {
                  a.css({ top: Math.round(e.top), left: Math.round(e.left) });
                },
              },
              t
            ),
            0
          ),
          a.addClass("in");
        var l = a[0].offsetWidth,
          d = a[0].offsetHeight;
        "top" == i && d != n && (t.top = t.top + n - d);
        var p = this.getViewportAdjustedDelta(i, t, l, d);
        p.left ? (t.left += p.left) : (t.top += p.top);
        var c = /top|bottom/.test(i),
          u = c ? 2 * p.left - s + l : 2 * p.top - n + d,
          h = c ? "offsetWidth" : "offsetHeight";
        a.offset(t), this.replaceArrow(u, a[0][h], c);
      }),
      (i.prototype.replaceArrow = function (e, t, i) {
        this.arrow()
          .css(i ? "left" : "top", 50 * (1 - e / t) + "%")
          .css(i ? "top" : "left", "");
      }),
      (i.prototype.setContent = function () {
        var e = this.tip(),
          t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t),
          e.removeClass("fade in top bottom left right");
      }),
      (i.prototype.hide = function (t) {
        function a() {
          "in" != s.hoverState && n.detach(),
            s.$element
              .removeAttr("aria-describedby")
              .trigger("hidden.bs." + s.type),
            t && t();
        }
        var s = this,
          n = e(this.$tip),
          r = e.Event("hide.bs." + this.type);
        return (
          this.$element.trigger(r),
          r.isDefaultPrevented()
            ? void 0
            : (n.removeClass("in"),
              e.support.transition && n.hasClass("fade")
                ? n
                    .one("bsTransitionEnd", a)
                    .emulateTransitionEnd(i.TRANSITION_DURATION)
                : a(),
              (this.hoverState = null),
              this)
        );
      }),
      (i.prototype.fixTitle = function () {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) &&
          e
            .attr("data-original-title", e.attr("title") || "")
            .attr("title", "");
      }),
      (i.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (i.prototype.getPosition = function (t) {
        t = t || this.$element;
        var i = t[0],
          a = "BODY" == i.tagName,
          s = i.getBoundingClientRect();
        null == s.width &&
          (s = e.extend({}, s, {
            width: s.right - s.left,
            height: s.bottom - s.top,
          }));
        var n = a ? { top: 0, left: 0 } : t.offset(),
          r = {
            scroll: a
              ? document.documentElement.scrollTop || document.body.scrollTop
              : t.scrollTop(),
          },
          o = a
            ? { width: e(window).width(), height: e(window).height() }
            : null;
        return e.extend({}, s, r, o, n);
      }),
      (i.prototype.getCalculatedOffset = function (e, t, i, a) {
        return "bottom" == e
          ? { top: t.top + t.height, left: t.left + t.width / 2 - i / 2 }
          : "top" == e
          ? { top: t.top - a, left: t.left + t.width / 2 - i / 2 }
          : "left" == e
          ? { top: t.top + t.height / 2 - a / 2, left: t.left - i }
          : { top: t.top + t.height / 2 - a / 2, left: t.left + t.width };
      }),
      (i.prototype.getViewportAdjustedDelta = function (e, t, i, a) {
        var s = { top: 0, left: 0 };
        if (!this.$viewport) return s;
        var n = (this.options.viewport && this.options.viewport.padding) || 0,
          r = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
          var o = t.top - n - r.scroll,
            l = t.top + n - r.scroll + a;
          o < r.top
            ? (s.top = r.top - o)
            : l > r.top + r.height && (s.top = r.top + r.height - l);
        } else {
          var d = t.left - n,
            p = t.left + n + i;
          d < r.left
            ? (s.left = r.left - d)
            : p > r.right && (s.left = r.left + r.width - p);
        }
        return s;
      }),
      (i.prototype.getTitle = function () {
        var e,
          t = this.$element,
          i = this.options;
        return (e =
          t.attr("data-original-title") ||
          ("function" == typeof i.title ? i.title.call(t[0]) : i.title));
      }),
      (i.prototype.getUID = function (e) {
        do e += ~~(1e6 * Math.random());
        while (document.getElementById(e));
        return e;
      }),
      (i.prototype.tip = function () {
        if (
          !this.$tip &&
          ((this.$tip = e(this.options.template)), 1 != this.$tip.length)
        )
          throw new Error(
            this.type +
              " `template` option must consist of exactly 1 top-level element!"
          );
        return this.$tip;
      }),
      (i.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (i.prototype.enable = function () {
        this.enabled = !0;
      }),
      (i.prototype.disable = function () {
        this.enabled = !1;
      }),
      (i.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (i.prototype.toggle = function (t) {
        var i = this;
        t &&
          ((i = e(t.currentTarget).data("bs." + this.type)),
          i ||
            ((i = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            e(t.currentTarget).data("bs." + this.type, i))),
          t
            ? ((i.inState.click = !i.inState.click),
              i.isInStateTrue() ? i.enter(i) : i.leave(i))
            : i.tip().hasClass("in")
            ? i.leave(i)
            : i.enter(i);
      }),
      (i.prototype.destroy = function () {
        var e = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            e.$element.off("." + e.type).removeData("bs." + e.type),
              e.$tip && e.$tip.detach(),
              (e.$tip = null),
              (e.$arrow = null),
              (e.$viewport = null);
          });
      });
    var a = e.fn.tooltip;
    (e.fn.tooltip = t),
      (e.fn.tooltip.Constructor = i),
      (e.fn.tooltip.noConflict = function () {
        return (e.fn.tooltip = a), this;
      });
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var a = e(this),
          s = a.data("bs.popover"),
          n = "object" == typeof t && t;
        (s || !/destroy|hide/.test(t)) &&
          (s || a.data("bs.popover", (s = new i(this, n))),
          "string" == typeof t && s[t]());
      });
    }
    var i = function (e, t) {
      this.init("popover", e, t);
    };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (i.VERSION = "3.3.6"),
      (i.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (i.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype)),
      (i.prototype.constructor = i),
      (i.prototype.getDefaults = function () {
        return i.DEFAULTS;
      }),
      (i.prototype.setContent = function () {
        var e = this.tip(),
          t = this.getTitle(),
          i = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t),
          e
            .find(".popover-content")
            .children()
            .detach()
            .end()
            [
              this.options.html
                ? "string" == typeof i
                  ? "html"
                  : "append"
                : "text"
            ](i),
          e.removeClass("fade top bottom left right in"),
          e.find(".popover-title").html() || e.find(".popover-title").hide();
      }),
      (i.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (i.prototype.getContent = function () {
        var e = this.$element,
          t = this.options;
        return (
          e.attr("data-content") ||
          ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
        );
      }),
      (i.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      });
    var a = e.fn.popover;
    (e.fn.popover = t),
      (e.fn.popover.Constructor = i),
      (e.fn.popover.noConflict = function () {
        return (e.fn.popover = a), this;
      });
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(i, a) {
      (this.$body = e(document.body)),
        (this.$scrollElement = e(e(i).is(document.body) ? window : i)),
        (this.options = e.extend({}, t.DEFAULTS, a)),
        (this.selector = (this.options.target || "") + " .nav li > a"),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on(
          "scroll.bs.scrollspy",
          e.proxy(this.process, this)
        ),
        this.refresh(),
        this.process();
    }
    function i(i) {
      return this.each(function () {
        var a = e(this),
          s = a.data("bs.scrollspy"),
          n = "object" == typeof i && i;
        s || a.data("bs.scrollspy", (s = new t(this, n))),
          "string" == typeof i && s[i]();
      });
    }
    (t.VERSION = "3.3.6"),
      (t.DEFAULTS = { offset: 10 }),
      (t.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (t.prototype.refresh = function () {
        var t = this,
          i = "offset",
          a = 0;
        (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight()),
          e.isWindow(this.$scrollElement[0]) ||
            ((i = "position"), (a = this.$scrollElement.scrollTop())),
          this.$body
            .find(this.selector)
            .map(function () {
              var t = e(this),
                s = t.data("target") || t.attr("href"),
                n = /^#./.test(s) && e(s);
              return (
                (n && n.length && n.is(":visible") && [[n[i]().top + a, s]]) ||
                null
              );
            })
            .sort(function (e, t) {
              return e[0] - t[0];
            })
            .each(function () {
              t.offsets.push(this[0]), t.targets.push(this[1]);
            });
      }),
      (t.prototype.process = function () {
        var e,
          t = this.$scrollElement.scrollTop() + this.options.offset,
          i = this.getScrollHeight(),
          a = this.options.offset + i - this.$scrollElement.height(),
          s = this.offsets,
          n = this.targets,
          r = this.activeTarget;
        if ((this.scrollHeight != i && this.refresh(), t >= a))
          return r != (e = n[n.length - 1]) && this.activate(e);
        if (r && t < s[0]) return (this.activeTarget = null), this.clear();
        for (e = s.length; e--; )
          r != n[e] &&
            t >= s[e] &&
            (void 0 === s[e + 1] || t < s[e + 1]) &&
            this.activate(n[e]);
      }),
      (t.prototype.activate = function (t) {
        (this.activeTarget = t), this.clear();
        var i =
            this.selector +
            '[data-target="' +
            t +
            '"],' +
            this.selector +
            '[href="' +
            t +
            '"]',
          a = e(i).parents("li").addClass("active");
        a.parent(".dropdown-menu").length &&
          (a = a.closest("li.dropdown").addClass("active")),
          a.trigger("activate.bs.scrollspy");
      }),
      (t.prototype.clear = function () {
        e(this.selector)
          .parentsUntil(this.options.target, ".active")
          .removeClass("active");
      });
    var a = e.fn.scrollspy;
    (e.fn.scrollspy = i),
      (e.fn.scrollspy.Constructor = t),
      (e.fn.scrollspy.noConflict = function () {
        return (e.fn.scrollspy = a), this;
      }),
      e(window).on("load.bs.scrollspy.data-api", function () {
        e('[data-spy="scroll"]').each(function () {
          var t = e(this);
          i.call(t, t.data());
        });
      });
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var a = e(this),
          s = a.data("bs.tab");
        s || a.data("bs.tab", (s = new i(this))),
          "string" == typeof t && s[t]();
      });
    }
    var i = function (t) {
      this.element = e(t);
    };
    (i.VERSION = "3.3.6"),
      (i.TRANSITION_DURATION = 150),
      (i.prototype.show = function () {
        var t = this.element,
          i = t.closest("ul:not(.dropdown-menu)"),
          a = t.data("target");
        if (
          (a ||
            ((a = t.attr("href")), (a = a && a.replace(/.*(?=#[^\s]*$)/, ""))),
          !t.parent("li").hasClass("active"))
        ) {
          var s = i.find(".active:last a"),
            n = e.Event("hide.bs.tab", { relatedTarget: t[0] }),
            r = e.Event("show.bs.tab", { relatedTarget: s[0] });
          if (
            (s.trigger(n),
            t.trigger(r),
            !r.isDefaultPrevented() && !n.isDefaultPrevented())
          ) {
            var o = e(a);
            this.activate(t.closest("li"), i),
              this.activate(o, o.parent(), function () {
                s.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] }),
                  t.trigger({ type: "shown.bs.tab", relatedTarget: s[0] });
              });
          }
        }
      }),
      (i.prototype.activate = function (t, a, s) {
        function n() {
          r
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active")
            .end()
            .find('[data-toggle="tab"]')
            .attr("aria-expanded", !1),
            t
              .addClass("active")
              .find('[data-toggle="tab"]')
              .attr("aria-expanded", !0),
            o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu").length &&
              t
                .closest("li.dropdown")
                .addClass("active")
                .end()
                .find('[data-toggle="tab"]')
                .attr("aria-expanded", !0),
            s && s();
        }
        var r = a.find("> .active"),
          o =
            s &&
            e.support.transition &&
            ((r.length && r.hasClass("fade")) || !!a.find("> .fade").length);
        r.length && o
          ? r
              .one("bsTransitionEnd", n)
              .emulateTransitionEnd(i.TRANSITION_DURATION)
          : n(),
          r.removeClass("in");
      });
    var a = e.fn.tab;
    (e.fn.tab = t),
      (e.fn.tab.Constructor = i),
      (e.fn.tab.noConflict = function () {
        return (e.fn.tab = a), this;
      });
    var s = function (i) {
      i.preventDefault(), t.call(e(this), "show");
    };
    e(document)
      .on("click.bs.tab.data-api", '[data-toggle="tab"]', s)
      .on("click.bs.tab.data-api", '[data-toggle="pill"]', s);
  })(jQuery),
  +(function (e) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var a = e(this),
          s = a.data("bs.affix"),
          n = "object" == typeof t && t;
        s || a.data("bs.affix", (s = new i(this, n))),
          "string" == typeof t && s[t]();
      });
    }
    var i = function (t, a) {
      (this.options = e.extend({}, i.DEFAULTS, a)),
        (this.$target = e(this.options.target)
          .on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            e.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = e(t)),
        (this.affixed = null),
        (this.unpin = null),
        (this.pinnedOffset = null),
        this.checkPosition();
    };
    (i.VERSION = "3.3.6"),
      (i.RESET = "affix affix-top affix-bottom"),
      (i.DEFAULTS = { offset: 0, target: window }),
      (i.prototype.getState = function (e, t, i, a) {
        var s = this.$target.scrollTop(),
          n = this.$element.offset(),
          r = this.$target.height();
        if (null != i && "top" == this.affixed) return i > s ? "top" : !1;
        if ("bottom" == this.affixed)
          return null != i
            ? s + this.unpin <= n.top
              ? !1
              : "bottom"
            : e - a >= s + r
            ? !1
            : "bottom";
        var o = null == this.affixed,
          l = o ? s : n.top,
          d = o ? r : t;
        return null != i && i >= s
          ? "top"
          : null != a && l + d >= e - a
          ? "bottom"
          : !1;
      }),
      (i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var e = this.$target.scrollTop(),
          t = this.$element.offset();
        return (this.pinnedOffset = t.top - e);
      }),
      (i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(e.proxy(this.checkPosition, this), 1);
      }),
      (i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var t = this.$element.height(),
            a = this.options.offset,
            s = a.top,
            n = a.bottom,
            r = Math.max(e(document).height(), e(document.body).height());
          "object" != typeof a && (n = s = a),
            "function" == typeof s && (s = a.top(this.$element)),
            "function" == typeof n && (n = a.bottom(this.$element));
          var o = this.getState(r, t, s, n);
          if (this.affixed != o) {
            null != this.unpin && this.$element.css("top", "");
            var l = "affix" + (o ? "-" + o : ""),
              d = e.Event(l + ".bs.affix");
            if ((this.$element.trigger(d), d.isDefaultPrevented())) return;
            (this.affixed = o),
              (this.unpin = "bottom" == o ? this.getPinnedOffset() : null),
              this.$element
                .removeClass(i.RESET)
                .addClass(l)
                .trigger(l.replace("affix", "affixed") + ".bs.affix");
          }
          "bottom" == o && this.$element.offset({ top: r - t - n });
        }
      });
    var a = e.fn.affix;
    (e.fn.affix = t),
      (e.fn.affix.Constructor = i),
      (e.fn.affix.noConflict = function () {
        return (e.fn.affix = a), this;
      }),
      e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
          var i = e(this),
            a = i.data();
          (a.offset = a.offset || {}),
            null != a.offsetBottom && (a.offset.bottom = a.offsetBottom),
            null != a.offsetTop && (a.offset.top = a.offsetTop),
            t.call(i, a);
        });
      });
  })(jQuery),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e("object" == typeof exports ? require("jquery") : jQuery);
  })(function (e) {
    function t(e, t) {
      return e.toFixed(t.decimals);
    }
    var i = function (t, a) {
      (this.$element = e(t)),
        (this.options = e.extend({}, i.DEFAULTS, this.dataOptions(), a)),
        this.init();
    };
    (i.DEFAULTS = {
      from: 0,
      to: 0,
      speed: 1e3,
      refreshInterval: 100,
      decimals: 0,
      formatter: t,
      onUpdate: null,
      onComplete: null,
    }),
      (i.prototype.init = function () {
        (this.value = this.options.from),
          (this.loops = Math.ceil(
            this.options.speed / this.options.refreshInterval
          )),
          (this.loopCount = 0),
          (this.increment = (this.options.to - this.options.from) / this.loops);
      }),
      (i.prototype.dataOptions = function () {
        var e = {
            from: this.$element.data("from"),
            to: this.$element.data("to"),
            speed: this.$element.data("speed"),
            refreshInterval: this.$element.data("refresh-interval"),
            decimals: this.$element.data("decimals"),
          },
          t = Object.keys(e);
        for (var i in t) {
          var a = t[i];
          "undefined" == typeof e[a] && delete e[a];
        }
        return e;
      }),
      (i.prototype.update = function () {
        (this.value += this.increment),
          this.loopCount++,
          this.render(),
          "function" == typeof this.options.onUpdate &&
            this.options.onUpdate.call(this.$element, this.value),
          this.loopCount >= this.loops &&
            (clearInterval(this.interval),
            (this.value = this.options.to),
            "function" == typeof this.options.onComplete &&
              this.options.onComplete.call(this.$element, this.value));
      }),
      (i.prototype.render = function () {
        var e = this.options.formatter.call(
          this.$element,
          this.value,
          this.options
        );
        this.$element.text(e);
      }),
      (i.prototype.restart = function () {
        this.stop(), this.init(), this.start();
      }),
      (i.prototype.start = function () {
        this.stop(),
          this.render(),
          (this.interval = setInterval(
            this.update.bind(this),
            this.options.refreshInterval
          ));
      }),
      (i.prototype.stop = function () {
        this.interval && clearInterval(this.interval);
      }),
      (i.prototype.toggle = function () {
        this.interval ? this.stop() : this.start();
      }),
      (e.fn.countTo = function (t) {
        return this.each(function () {
          var a = e(this),
            s = a.data("countTo"),
            n = !s || "object" == typeof t,
            r = "object" == typeof t ? t : {},
            o = "string" == typeof t ? t : "start";
          n && (s && s.stop(), a.data("countTo", (s = new i(this, r)))),
            s[o].call(s);
        });
      });
  }),
  (function (e, t, i, a) {
    function s(e, t, i) {
      "*" === t.charAt(0)
        ? (e[t.substring(1)] = i)
        : ((e["-ms-" + t] = i), (e["-webkit-" + t] = i), (e[t] = i));
    }
    e.fn.precss = function (e) {
      var t = {};
      if (1 === arguments.length)
        for (style in e) e.hasOwnProperty(style) && s(t, style, e[style]);
      else s(t, arguments[0], arguments[1]);
      return this.css(t), this;
    };
  })(jQuery, window, document),
  (function (e, t, i, a) {
    "use strict";
    function s(t, i) {
      (this.element = t),
        (this.$element = e(t)),
        (this.settings = e.extend({}, l, i)),
        (this.currentSlideIndex = 0),
        (this.prevSlideIndex = 0),
        (this.slideTimeoutId = 0),
        (this.slides = []),
        (this.calls = []),
        (this.paused = !1),
        (this.navigating = !1),
        (this.slideStartTime = null),
        (this.slideTimeRemaining = 0),
        this._init();
    }
    var n = function (e) {
        var t = !1,
          s = "Webkit Moz ms O".split(" "),
          n = i.createElement("div"),
          r = null;
        if (((e = e.toLowerCase()), n.style[e] && (t = !0), t === !1)) {
          r = e.charAt(0).toUpperCase() + e.substr(1);
          for (var o = 0; o < s.length; o++)
            if (n.style[s[o] + r] !== a) {
              t = !0;
              break;
            }
        }
        return t;
      },
      r = {};
    (r.animation = n("animation")),
      (r.transition = n("transition")),
      (r.transform = n("transform"));
    var o = "pogoSlider",
      l = {
        autoplayTimeout: 4e3,
        autoplay: !0,
        baseZindex: 1,
        displayProgress: !0,
        onSlideStart: null,
        onSlideEnd: null,
        onSliderPause: null,
        onSliderResume: null,
        slideTransition: "slide",
        slideTransitionDuration: 1e3,
        elementTransitionStart: 500,
        elementTransitionDuration: 1e3,
        elementTransitionIn: "slideUp",
        elementTransitionOut: "slideDown",
        generateButtons: !0,
        buttonPosition: "CenterHorizontal",
        generateNav: !0,
        navPosition: "Bottom",
        preserveTargetSize: !1,
        targetWidth: 1e3,
        targetHeight: 300,
        responsive: !1,
        pauseOnHover: !0,
      };
    (s.prototype = {
      _init: function () {
        var t = this;
        t.$element.find(".pogoSlider-slide").each(function () {
          var i = [],
            s = 0;
          e(this).data("original-styles", e(this).attr("style")),
            e(this)
              .find(".pogoSlider-slide-element")
              .each(function () {
                var n =
                    parseInt(e(this).data("start")) !== a
                      ? e(this).data("start")
                      : t.settings.elementTransitionStart,
                  r =
                    parseInt(e(this).data("duration")) ||
                    t.settings.elementTransitionDuration;
                n + r > s && (s = n + r),
                  i.push({
                    $element: e(this),
                    element: this,
                    startTime: n,
                    duration: r,
                    transitionIn:
                      e(this).data("in") || t.settings.elementTransitionIn,
                    transitionOut:
                      e(this).data("out") || t.settings.elementTransitionOut,
                  }),
                  e(this).css("opacity", 0);
              });
          var n = {
            $element: e(this),
            element: this,
            transition:
              e(this).data("transition") || t.settings.slideTransition,
            duration:
              parseInt(e(this).data("duration")) ||
              t.settings.slideTransitionDuration,
            elementTransitionDuration: s,
            totalSlideDuration: t.settings.autoplayTimeout + s,
            children: i,
          };
          t.slides.push(n);
        }),
          (t.numSlides = t.slides.length),
          t.slides[0].$element.css("opacity", 1),
          t.settings.autoplay &&
            t.settings.displayProgress &&
            t._createProgressBar(),
          t.$element.css(
            "padding-bottom",
            100 / (t.settings.targetWidth / t.settings.targetHeight) + "%"
          );
        var i = t.$element.find("img").length;
        if (i > 0) {
          var s = 0;
          t.$element.prepend(
            '<div class="pogoSlider-loading"><div class="pogoSlider-loading-icon"></div></div>'
          ),
            t.$element
              .find("img")
              .one("load", function () {
                ++s === i &&
                  (e(".pogoSlider-loading").remove(), t._onSliderReady());
              })
              .each(function () {
                this.complete && e(this).trigger("load");
              });
        } else t._onSliderReady();
      },
      _onSliderReady: function () {
        var i = this;
        i.settings.autoplay &&
          ((i.slideStartTime = new Date()),
          (i.slideTimeRemaining = i.slides[0].totalSlideDuration),
          i._slideTimeout(i.slideTimeRemaining)),
          i.settings.generateButtons &&
            i.slides.length > 1 &&
            i._createDirButtons(),
          i.settings.generateNav &&
            i.slides.length > 1 &&
            i._createNavigation(),
          i.settings.preserveTargetSize &&
            (i._preserveTargetSize(),
            i.settings.responsive &&
              e(t).on("resize", function () {
                i._preserveTargetSize();
              })),
          i.settings.pauseOnHover &&
            (i.$element.on("mouseenter", function () {
              i.pause();
            }),
            i.$element.on("mouseleave", function () {
              i.resume();
            })),
          i._onSlideStart(0);
      },
      _createDirButtons: function () {
        var t = this;
        t.$element.addClass("pogoSlider--dir" + t.settings.buttonPosition),
          e(
            '<button class="pogoSlider-dir-btn pogoSlider-dir-btn--prev"></button>'
          )
            .appendTo(t.$element)
            .on("click", function () {
              t.prevSlide();
            }),
          e(
            '<button class="pogoSlider-dir-btn pogoSlider-dir-btn--next"></button>'
          )
            .appendTo(t.$element)
            .on("click", function () {
              t.nextSlide();
            });
      },
      _createNavigation: function () {
        var t = this;
        t.$element.addClass("pogoSlider--nav" + t.settings.navPosition);
        for (
          var i = e('<ul class="pogoSlider-nav"></ul>').appendTo(t.$element),
            a = 0;
          a < t.slides.length;
          a++
        )
          e(
            '<li data-num="' +
              a +
              '"><button class="pogoSlider-nav-btn"></button></li>'
          )
            .appendTo(i)
            .on("click", function () {
              t.toSlide(e(this).data("num"));
            });
      },
      getAppliedProps: function (e) {
        var t = i.styleSheets,
          a = new RegExp("{(.+)}");
        e.matches =
          e.matches ||
          e.webkitMatchesSelector ||
          e.mozMatchesSelector ||
          e.msMatchesSelector ||
          e.oMatchesSelector;
        for (
          var s = e.getAttribute("style").replace(/ /g, "").split(";"),
            n = [],
            r = 0;
          r < s.length;
          r++
        ) {
          var o = s[r].split(":")[0];
          o && -1 === n.indexOf(o) && n.push(o);
        }
        for (var l in t)
          if (t.hasOwnProperty(l)) {
            var d = t[l].rules || t[l].cssRules;
            for (var p in d)
              if (e.matches(d[p].selectorText)) {
                var c = a.exec(d[p].cssText.replace(/ /g, ""));
                if (c)
                  for (var u = c[1].split(";"), h = 0; h < u.length; h++) {
                    var m = u[h].split(":")[0];
                    m && -1 === n.indexOf(m) && n.push(m);
                  }
              }
          }
        return n;
      },
      _preserveTargetSize: function () {
        var i = this,
          a = new RegExp("px|%|em", "i"),
          s = new RegExp("[0-9]*.?[0-9]+"),
          n = new RegExp("px", "i"),
          r = 1;
        (r = this.scaledBy
          ? this.$element.width() / this.settings.targetWidth / this.scaledBy
          : this.$element.width() / this.settings.targetWidth),
          (this.scaledBy = this.$element.width() / this.settings.targetWidth),
          this.$element.find(".pogoSlider-slide-element").each(function () {
            var o = t.getComputedStyle(this),
              l = i.getAppliedProps(this),
              d = {};
            e.data(i, "originalStyles") ||
              e.data(i, "originalStyles", e(this).attr("style"));
            for (var p = 0; p < l.length; p++) {
              var c = o.getPropertyValue(l[p]);
              if (a.test(c) && s.test(c)) {
                var u = s.exec(c),
                  h = a.exec(c);
                n.test(h[0])
                  ? (d[l[p]] = Math.ceil(u[0] * r) + h[0])
                  : (d[l[p]] = u[0] * r + h[0]);
              }
            }
            e(this).css(d);
          });
      },
      _createProgressBar: function () {
        var e = "";
        (e += '<div class="pogoSlider-progressBar">'),
          (e += '<div class="pogoSlider-progressBar-duration"></div>'),
          (e += "</div>");
        for (var t = 0; t < this.slides.length; t++)
          this.slides[t].$element.prepend(e);
      },
      _slideTimeout: function (e) {
        var t,
          i = this;
        t = i.slideTimeoutId = setTimeout(function () {
          i.paused || t !== i.slideTimeoutId || i._changeToNext();
        }, e);
      },
      pause: function () {
        if (this.settings.autoplay) {
          (this.paused = !0),
            clearTimeout(this.slideTimeoutId),
            this.settings.displayProgress &&
              this.$element.find(".pogoSlider-progressBar-duration").stop(!0),
            (this.slidePauseTime = new Date()),
            (this.slideTimeRemaining =
              this.slideTimeRemaining - (new Date() - this.slideStartTime));
          for (
            var e = 0;
            e < this.slides[this.currentSlideIndex].children.length;
            e++
          )
            this.slides[this.currentSlideIndex].children[e].$element.precss(
              "animation-play-state",
              "paused"
            );
          this.settings.onSliderPause &&
            this.settings.onSliderPause.apply(this);
        }
      },
      resume: function () {
        if (this.settings.autoplay) {
          (this.paused = !1), (this.slideStartTime = new Date());
          for (
            var e = 0;
            e < this.slides[this.currentSlideIndex].children.length;
            e++
          )
            this.slides[this.currentSlideIndex].children[e].$element.precss(
              "animation-play-state",
              ""
            );
          this.slideTimeRemaining > 0 &&
            !this.navigating &&
            (this.settings.displayProgress &&
              this.$element
                .find(".pogoSlider-progressBar-duration")
                .animate({ width: "100%" }, this.slideTimeRemaining, "linear"),
            this._slideTimeout(this.slideTimeRemaining)),
            this.settings.onSliderResume &&
              this.settings.onSliderResume.apply(this);
        }
      },
      nextSlide: function () {
        this.navigating ||
          (clearTimeout(this.slideTimeoutId),
          (this.prevSlideIndex = this.currentSlideIndex),
          ++this.currentSlideIndex > this.numSlides - 1 &&
            (this.currentSlideIndex = 0),
          this._changeSlide(this.prevSlideIndex, this.currentSlideIndex));
      },
      prevSlide: function () {
        this.navigating ||
          (clearTimeout(this.slideTimeoutId),
          (this.prevSlideIndex = this.currentSlideIndex),
          --this.currentSlideIndex < 0 &&
            (this.currentSlideIndex = this.numSlides - 1),
          this._changeSlide(this.prevSlideIndex, this.currentSlideIndex));
      },
      toSlide: function (e) {
        if (!this.navigating) {
          if (
            (clearTimeout(this.slideTimeoutId),
            e === this.currentSlideIndex || e > this.slides.length - 1)
          )
            return;
          (this.prevSlideIndex = this.currentSlideIndex),
            (this.currentSlideIndex = e),
            this._changeSlide(this.prevSlideIndex, this.currentSlideIndex);
        }
      },
      destroy: function () {
        (this.paused = !0),
          clearTimeout(this.slideTimeoutId),
          e.removeData(this.element, "plugin_" + o);
      },
      _changeToNext: function () {
        (this.prevSlideIndex = this.currentSlideIndex),
          ++this.currentSlideIndex > this.numSlides - 1 &&
            (this.currentSlideIndex = 0),
          this._changeSlide(this.prevSlideIndex, this.currentSlideIndex);
      },
      _changeSlide: function (e, t) {
        var i,
          a = this;
        a._onSlideEnd(e),
          (a.navigating = !0),
          (i =
            r.animation && r.transition && r.transform
              ? a.slideTransitions
              : a.compatSlideTransitions);
        var s = i[a.slides[t].transition] ? a.slides[t].transition : "slide",
          n = i[s].apply(a, [e, t]);
        setTimeout(function () {
          n && n(),
            (a.navigating = !1),
            a._slideCleanup(e, !1),
            a._slideElementCleanup(e),
            a.settings.autoplay &&
              a._slideTimeout(a.slides[t].totalSlideDuration),
            a._onSlideStart(t);
        }, a.slides[t].duration);
      },
      _onSlideStart: function (e) {
        if (
          (this.slides[e].$element.css("z-index", 1),
          this.settings.autoplay &&
            ((this.slideStartTime = new Date()),
            (this.slideTimeRemaining = this.slides[e].totalSlideDuration),
            this.settings.displayProgress &&
              !this.paused &&
              this.slides[e].$element
                .find(".pogoSlider-progressBar-duration")
                .css("width", "0")
                .animate({ width: "100%" }, this.slideTimeRemaining, "linear")),
          this.slides[e].children.length > 0 &&
            this._slideElementsTransitionIn(e),
          this.paused)
        )
          for (var t = 0; t < this.slides[e].children.length; t++)
            this.slides[e].children[t].$element.precss(
              "animation-play-state",
              "paused"
            );
        this.settings.generateNav &&
          (this.$element
            .find(".pogoSlider-nav-btn")
            .removeClass("pogoSlider-nav-btn--selected"),
          this.$element
            .find(".pogoSlider-nav-btn")
            .eq(e)
            .addClass("pogoSlider-nav-btn--selected")),
          this.settings.onSlideStart && this.settings.onSlideStart.apply(this);
      },
      _onSlideEnd: function (e) {
        var t;
        if (
          (this.settings.autoplay &&
            this.settings.displayProgress &&
            this.slides[e].$element
              .find(".pogoSlider-progressBar-duration")
              .stop(!0)
              .css("width", "0"),
          this.paused)
        ) {
          t = this.slides[e].totalSlideDuration - this.slideTimeRemaining;
          for (var i = 0; i < this.slides[e].children.length; i++)
            this.slides[e].children[i].$element.precss(
              "animation-play-state",
              ""
            );
        } else
          t =
            this.slides[e].totalSlideDuration -
            (this.slideTimeRemaining - (new Date() - this.slideStartTime));
        this.slides[e].children.length > 0 &&
          t > this.slides[e].elementTransitionDuration &&
          this._slideElementsTransitionOut(e),
          this.settings.onSlideEnd && this.settings.onSlideEnd.apply(this);
      },
      _slideElementsTransitionIn: function (e) {
        for (var t = 0; t < this.slides[e].children.length; t++) {
          var i = this.slides[e].children[t];
          i.$element
            .precss({
              "*opacity": 1,
              "animation-duration": i.duration + "ms",
              "animation-delay": i.startTime + "ms",
            })
            .addClass("pogoSlider-animation-" + i.transitionIn + "In");
        }
      },
      _slideElementsTransitionOut: function (e) {
        for (var t = 0; t < this.slides[e].children.length; t++) {
          var i = this.slides[e].children[t];
          i.$element
            .precss("animation-delay", "")
            .removeClass("pogoSlider-animation-" + i.transitionIn + "In")
            .addClass("pogoSlider-animation-" + i.transitionOut + "Out");
        }
      },
      _slideCleanup: function (e, t) {
        this.slides[e].$element.find(".pogoSlider-slide-slice").length > 0 &&
          this._removeSlideSlices(e),
          this.slides[e].$element
            .attr("style", this.slides[e].$element.data("original-styles"))
            .css("opacity", t ? "1" : "0");
      },
      _slideElementCleanup: function (e) {
        var t = function (e, t) {
            return (
              t.match(
                /pogoSlider-(?:(?:transition)|(?:animation))(?:-[a-zA-Z0-9]+)?(?:--[a-z]+)?/gi
              ) || []
            ).join(" ");
          },
          i = function (e, t) {
            return t.replace(
              /(?:-webkit-)?(?:-ms-)?((?:transition)|(?:animation))[^;]+;/g,
              ""
            );
          };
        this.slides[e].$element
          .find(".pogoSlider-progressBar-duration")
          .css("width", "0");
        for (var a = 0; a < this.slides[e].children.length; a++)
          this.slides[e].children[a].$element
            .removeClass(t)
            .attr("style", i)
            .css("opacity", 0);
      },
      _createSlideSlices: function (e, t, i) {
        var a,
          s = i * t,
          n = 100 / i,
          r = 100 / t,
          o = 100 * i,
          l = 100 * t,
          d = this.slides[e].$element,
          p = d.attr("style");
        if (
          ((a = this.paused
            ? this.slides[e].totalSlideDuration - this.slideTimeRemaining
            : this.slides[e].totalSlideDuration -
              (this.slideTimeRemaining - (new Date() - this.slideStartTime))),
          e === this.prevSlideIndex &&
            this.slides[e].children.length > 0 &&
            a < this.slides[e].elementTransitionDuration)
        )
          for (var c = 0; c < this.slides[e].children.length; c++) {
            var u = this.slides[e].children[c].startTime - a + "ms";
            this.slides[e].children[c].$element.precss("animation-delay", u);
          }
        d
          .children()
          .wrapAll(
            '<div class="pogoSlider-slide-slice" style="width:' +
              n +
              "%;height:" +
              r +
              '%;top:0%;left:0%;"/>'
          )
          .wrapAll(
            '<div class="pogoSlider-slide-slice-inner" style="' +
              p +
              "width:" +
              o +
              "%;height:" +
              l +
              '%;top:0%;left:0%;"/>'
          ),
          d.attr("style", function (e, t) {
            return t.replace(/(?:background)[^;]+;/g, "");
          });
        for (var h = 0; s > h; h++) {
          var m = h % t,
            f = Math.floor(h / t),
            g =
              "width:" +
              n +
              "%;height:" +
              r +
              "%;top:" +
              r * m +
              "%;left:" +
              n * f +
              "%;",
            v =
              "width:" +
              o +
              "%;height:" +
              l +
              "%;top:-" +
              100 * m +
              "%;left:-" +
              100 * f +
              "%;",
            y = "";
          this.settings.preserveTargetSize &&
            (y =
              "background-size:" +
              this.$element.width() +
              "px " +
              parseFloat(this.$element.css("padding-bottom")) +
              "px;");
          var w = d.find(".pogoSlider-slide-slice").last();
          0 != h && (w = w.clone(!0, !0).appendTo(this.slides[e].element)),
            w
              .attr("style", g)
              .find(".pogoSlider-slide-slice-inner")
              .attr("style", p + v + y);
        }
      },
      _removeSlideSlices: function (e) {
        var t = this,
          i = t.slides[e].$element;
        i.attr("style", i.data("original-styles")),
          i.find(".pogoSlider-slide-slice").not(":first").remove(),
          i.find(".pogoSlider-slide-slice-inner").children().unwrap(),
          i.find(".pogoSlider-slide-slice").children().unwrap();
      },
      _generateARandomArray: function (e) {
        for (var t = [], i = 0; e > i; i++) t.push(i);
        for (var a = t.length - 1; a > 0; a--) {
          var s = Math.floor(Math.random() * (a + 1)),
            n = t[a];
          (t[a] = t[s]), (t[s] = n);
        }
        return t;
      },
      slideTransitions: {
        fade: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element.precss({
            "*opacity": "0",
            "transition-duration": i.duration + "ms",
          }),
            i.$element.precss({
              "*opacity": "1",
              "transition-duration": i.duration + "ms",
            });
        },
        slide: function (e, t) {
          var i;
          return (
            (i =
              0 === t && e === this.slides.length - 1
                ? "slideLeft"
                : 0 === e && t === this.slides.length - 1
                ? "slideRight"
                : t > e
                ? "slideLeft"
                : "slideRight"),
            this.slideTransitions[i].apply(this, [e, t])
          );
        },
        verticalSlide: function (e, t) {
          var i;
          return (
            (i =
              0 === t && e === this.slides.length - 1
                ? "slideUp"
                : 0 === e && t === this.slides.length - 1
                ? "slideDown"
                : t > e
                ? "slideUp"
                : "slideDown"),
            this.slideTransitions[i].apply(this, [e, t])
          );
        },
        slideLeft: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.slides[e].$element
              .precss("animation-duration", a.duration + "ms")
              .addClass("pogoSlider-animation-leftOut"),
            a.$element
              .precss({
                "*opacity": "1",
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-leftIn"),
            function () {
              i.slides[e].$element.removeClass("pogoSlider-animation-leftOut"),
                a.$element
                  .attr("style", a.$element.data("original-styles"))
                  .css("opacity", "1")
                  .removeClass("pogoSlider-animation-leftIn");
            }
          );
        },
        slideRight: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.slides[e].$element
              .precss("animation-duration", a.duration + "ms")
              .addClass("pogoSlider-animation-rightOut"),
            a.$element
              .precss({
                "*opacity": "1",
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-rightIn"),
            function () {
              i.slides[e].$element.removeClass("pogoSlider-animation-rightOut"),
                a.$element
                  .attr("style", a.$element.data("original-styles"))
                  .css("opacity", "1")
                  .removeClass("pogoSlider-animation-rightIn");
            }
          );
        },
        slideUp: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.slides[e].$element
              .precss("animation-duration", a.duration + "ms")
              .addClass("pogoSlider-animation-upOut"),
            a.$element
              .precss({
                "*opacity": "1",
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-upIn"),
            function () {
              i.slides[e].$element.removeClass("pogoSlider-animation-upOut"),
                a.$element
                  .attr("style", a.$element.data("original-styles"))
                  .css("opacity", "1")
                  .removeClass("pogoSlider-animation-upIn");
            }
          );
        },
        slideDown: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.slides[e].$element
              .precss("animation-duration", a.duration + "ms")
              .addClass("pogoSlider-animation-downOut"),
            a.$element
              .precss({
                "*opacity": "1",
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-downIn"),
            function () {
              i.slides[e].$element.removeClass("pogoSlider-animation-downOut"),
                a.$element
                  .attr("style", a.$element.data("original-styles"))
                  .css("opacity", "1")
                  .removeClass("pogoSlider-animation-downIn");
            }
          );
        },
        slideRevealLeft: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.slides[e].$element
              .precss({
                "*z-index": i.settings.baseZindex + 1,
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-leftOut"),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            function () {
              i.slides[e].$element.removeClass("pogoSlider-animation-leftOut");
            }
          );
        },
        slideRevealRight: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.slides[e].$element
              .precss({
                "*z-index": i.settings.baseZindex + 1,
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-rightOut"),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            function () {
              i.slides[e].$element.removeClass("pogoSlider-animation-rightOut");
            }
          );
        },
        slideOverLeft: function (e, t) {
          var i = this.slides[t];
          return (
            i.$element
              .precss({
                "*opacity": "1",
                "*z-index": this.settings.baseZindex + 1,
                "animation-duration": i.duration + "ms",
              })
              .addClass("pogoSlider-animation-leftIn"),
            function () {
              i.$element
                .attr("style", i.$element.data("original-styles"))
                .css("opacity", "1")
                .removeClass("pogoSlider-animation-leftIn");
            }
          );
        },
        slideOverRight: function (e, t) {
          var i = this.slides[t];
          return (
            i.$element
              .precss({
                "*opacity": "1",
                "*z-index": this.settings.baseZindex + 1,
                "animation-duration": i.duration + "ms",
              })
              .addClass("pogoSlider-animation-rightIn"),
            function () {
              i.$element
                .attr("style", i.$element.data("original-styles"))
                .css("opacity", "1")
                .removeClass("pogoSlider-animation-rightIn");
            }
          );
        },
        expandReveal: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.$element.css("overflow", "visible"),
            i.slides[e].$element
              .precss({
                "*z-index": i.settings.baseZindex + 1,
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-expandReveal"),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            function () {
              i.$element.css("overflow", ""),
                i.slides[e].$element.removeClass(
                  "pogoSlider-animation-expandReveal"
                );
            }
          );
        },
        shrinkReveal: function (e, t) {
          var i = this,
            a = i.slides[t];
          return (
            i.slides[e].$element
              .precss({
                "*z-index": i.settings.baseZindex + 1,
                "animation-duration": a.duration + "ms",
              })
              .addClass("pogoSlider-animation-shrinkReveal"),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            function () {
              i.slides[e].$element.removeClass(
                "pogoSlider-animation-shrinkReveal"
              );
            }
          );
        },
        verticalSplitReveal: function (e, t) {
          var i = this,
            a = i.slides[t];
          i.slides[e].$element.css("z-index", i.settings.baseZindex + 1),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            i._createSlideSlices(e, 1, 2);
          var s = i.slides[e].$element.find(".pogoSlider-slide-slice");
          s.precss("animation-duration", a.duration + "ms"),
            s.eq(0).addClass("pogoSlider-animation-leftOut"),
            s.eq(1).addClass("pogoSlider-animation-rightOut");
        },
        horizontalSplitReveal: function (e, t) {
          var i = this,
            a = i.slides[t];
          i.slides[e].$element.css("z-index", i.settings.baseZindex + 1),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            i._createSlideSlices(e, 2, 1);
          var s = i.slides[e].$element.find(".pogoSlider-slide-slice");
          s.precss("animation-duration", a.duration + "ms"),
            s.eq(0).addClass("pogoSlider-animation-upOut"),
            s.eq(1).addClass("pogoSlider-animation-downOut");
        },
        zipReveal: function (t, i) {
          var a = this,
            s = a.slides[i];
          a.slides[t].$element.css("z-index", a.settings.baseZindex + 1),
            s.$element.css({ opacity: 1, "z-index": a.settings.baseZindex }),
            a._createSlideSlices(t, 1, Math.round(a.$element.width() / 100));
          var n = a.slides[t].$element.find(".pogoSlider-slide-slice");
          n.precss("animation-duration", s.duration + "ms"),
            n.each(function (t) {
              t % 2 === 0
                ? e(this).addClass("pogoSlider-animation-upOut")
                : e(this).addClass("pogoSlider-animation-downOut");
            });
        },
        barRevealDown: function (e, t) {
          return this.slideTransitions.barReveal.apply(this, [e, t, "down"]);
        },
        barRevealUp: function (e, t) {
          return this.slideTransitions.barReveal.apply(this, [e, t, "up"]);
        },
        barReveal: function (t, i, a) {
          var s = this,
            n = s.slides[i];
          s.slides[t].$element.css("z-index", s.settings.baseZindex + 1),
            n.$element.css({ opacity: 1, "z-index": s.settings.baseZindex }),
            s._createSlideSlices(t, 1, Math.round(s.$element.width() / 100));
          var r = s.slides[t].$element.find(".pogoSlider-slide-slice"),
            o = n.duration / (r.length + 1),
            l = 2 * o;
          r.precss("animation-duration", l + "ms"),
            r.each(function (t) {
              "down" === a
                ? e(this)
                    .addClass("pogoSlider-animation-downOut")
                    .precss("animation-delay", o * t + "ms")
                : e(this)
                    .addClass("pogoSlider-animation-upOut")
                    .precss("animation-delay", o * t + "ms");
            });
        },
        blocksReveal: function (e, t) {
          var i = this,
            a = i.slides[t],
            s = 0;
          s = i.settings.preserveTargetSize
            ? parseFloat(i.$element.css("padding-bottom"))
            : i.$element.height();
          var n = Math.round(s / 100),
            r = Math.round(i.$element.width() / 100);
          i.slides[e].$element.css("z-index", i.settings.baseZindex + 1),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex });
          var o = i._generateARandomArray(n * r);
          i._createSlideSlices(e, n, r);
          var l = i.slides[e].$element.find(".pogoSlider-slide-slice"),
            d = a.duration / (l.length + 1),
            p = 2 * d;
          l.precss("animation-duration", p + "ms");
          for (var c = 0; c < l.length; c++)
            l.eq(o.pop())
              .precss("animation-delay", d * c + "ms")
              .addClass("pogoSlider-animation-blocksReveal");
        },
        fold: function (e, t) {
          var i;
          return (
            (i =
              0 === t && e === this.slides.length - 1
                ? "foldLeft"
                : 0 === e && t === this.slides.length - 1
                ? "foldRight"
                : t > e
                ? "foldLeft"
                : "foldRight"),
            this.slideTransitions[i].apply(this, [e, t])
          );
        },
        foldRight: function (e, t) {
          var i = this,
            a = i.slides[t],
            s = i.slides[e];
          i.$element.css("overflow", "visible"),
            s.$element.css({
              overflow: "visible",
              "z-index": i.settings.baseZindex,
            }),
            a.$element.css({
              opacity: 1,
              overflow: "visible",
              "z-index": i.settings.baseZindex + 1,
            }),
            i._createSlideSlices(e, 1, 2);
          var n = s.$element.find(".pogoSlider-slide-slice");
          i._createSlideSlices(t, 1, 2);
          var r = i.slides[t].$element.find(".pogoSlider-slide-slice"),
            o = n.eq(0),
            l = r.eq(0),
            d = r.eq(1);
          return (
            a.$element.prepend(o.detach()),
            s.$element.prepend(l.detach()),
            o
              .addClass("pogoSlider-animation-foldInRight")
              .precss("animation-duration", a.duration + "ms"),
            d
              .addClass("pogoSlider-animation-foldOutRight")
              .precss("animation-duration", a.duration + "ms"),
            function () {
              i.$element.css("overflow", ""),
                a.$element.prepend(l.detach()),
                s.$element.prepend(o.detach()),
                i._slideCleanup(t, !0);
            }
          );
        },
        foldLeft: function (e, t) {
          var i = this,
            a = i.slides[t],
            s = i.slides[e];
          i.$element.css("overflow", "visible"),
            s.$element.css({
              overflow: "visible",
              "z-index": i.settings.baseZindex,
            }),
            a.$element.css({
              opacity: 1,
              overflow: "visible",
              "z-index": i.settings.baseZindex + 1,
            }),
            i._createSlideSlices(e, 1, 2);
          var n = s.$element.find(".pogoSlider-slide-slice");
          i._createSlideSlices(t, 1, 2);
          var r = i.slides[t].$element.find(".pogoSlider-slide-slice"),
            o = n.eq(1),
            l = r.eq(0),
            d = r.eq(1);
          return (
            a.$element.append(o.detach()),
            s.$element.append(d.detach()),
            o
              .addClass("pogoSlider-animation-foldInLeft")
              .precss("animation-duration", a.duration + "ms"),
            l
              .addClass("pogoSlider-animation-foldOutLeft")
              .precss("animation-duration", a.duration + "ms"),
            function () {
              i.$element.css("overflow", ""), i._slideCleanup(t, !0);
            }
          );
        },
      },
      compatSlideTransitions: {
        fade: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element.animate({ opacity: 0 }, i.duration),
            i.$element.animate({ opacity: 1 }, i.duration);
        },
        slide: function (e, t) {
          var i;
          return (
            (i =
              e > t && e === this.slides.length - 1 && 0 === t
                ? "slideLeft"
                : t > e && 0 === e && t === this.slides.length - 1
                ? "slideRight"
                : t > e
                ? "slideLeft"
                : "slideRight"),
            this.slideTransitions[i].apply(this, [e, t])
          );
        },
        verticalSlide: function (e, t) {
          var i;
          return (
            (i =
              e > t && e === this.slides.length - 1 && 0 === t
                ? "slideUp"
                : t > e && 0 === e && t === this.slides.length - 1
                ? "slideDown"
                : t > e
                ? "slideUp"
                : "slideDown"),
            this.slideTransitions[i].apply(this, [e, t])
          );
        },
        slideLeft: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element.animate({ left: "-100%" }, i.duration),
            i.$element
              .css({ left: "100%", opacity: 1 })
              .animate({ left: 0 }, i.duration);
        },
        slideRight: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element.animate({ left: "100%" }, i.duration),
            i.$element
              .css({ left: "-100%", opacity: 1 })
              .animate({ left: 0 }, i.duration);
        },
        slideUp: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element.animate({ top: "-100%" }, i.duration),
            i.$element
              .css({ top: "100%", opacity: 1 })
              .animate({ top: "0" }, i.duration);
        },
        slideDown: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element.animate({ top: "100%" }, i.duration),
            i.$element
              .css({ top: "-100%", opacity: 1 })
              .animate({ top: "0" }, i.duration);
        },
        slideRevealLeft: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element
            .css("z-index", this.settings.baseZindex + 1)
            .animate({ left: "-100%" }, i.duration),
            i.$element.css({ opacity: 1, "z-index": this.settings.baseZindex });
        },
        slideRevealRight: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element
            .css("z-index", this.settings.baseZindex + 1)
            .animate({ left: "100%" }, i.duration),
            i.$element.css({ opacity: 1, "z-index": this.settings.baseZindex });
        },
        slideOverLeft: function (e, t) {
          var i = this.slides[t];
          i.$element
            .css({
              opacity: 1,
              "z-index": this.settings.baseZindex,
              left: "100%",
            })
            .animate({ left: 0 }, i.duration);
        },
        slideOverRight: function (e, t) {
          var i = this.slides[t];
          i.$element
            .css({
              opacity: 1,
              "z-index": this.settings.baseZindex,
              right: "100%",
            })
            .animate({ right: 0 }, i.duration);
        },
        expandReveal: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element
            .css("z-index", this.settings.baseZindex + 1)
            .animate(
              {
                width: "120%",
                height: "120%",
                left: "-10%",
                top: "-10%",
                opacity: 0,
              },
              i.duration
            ),
            i.$element.css({ opacity: 1, "z-index": this.settings.baseZindex });
        },
        shrinkReveal: function (e, t) {
          var i = this.slides[t];
          this.slides[e].$element
            .css("z-index", this.settings.baseZindex + 1)
            .animate(
              {
                width: "50%",
                height: "50%",
                left: "25%",
                top: "25%",
                opacity: 0,
              },
              i.duration
            ),
            i.$element.css({ opacity: 1, "z-index": this.settings.baseZindex });
        },
        verticalSplitReveal: function (e, t) {
          var i = this,
            a = i.slides[t];
          i.slides[e].$element.css("z-index", i.settings.baseZindex + 1),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            i._createSlideSlices(e, 1, 2);
          var s = i.slides[e].$element.find(".pogoSlider-slide-slice");
          s.eq(0).animate({ left: "-50%" }, a.duration),
            s.eq(1).animate({ left: "100%" }, a.duration);
        },
        horizontalSplitReveal: function (e, t) {
          var i = this,
            a = i.slides[t];
          i.slides[e].$element.css("z-index", i.settings.baseZindex + 1),
            a.$element.css({ opacity: 1, "z-index": i.settings.baseZindex }),
            i._createSlideSlices(e, 2, 1);
          var s = i.slides[e].$element.find(".pogoSlider-slide-slice");
          s.eq(0).animate({ top: "-50%" }, a.duration),
            s.eq(1).animate({ top: "100%" }, a.duration);
        },
        zipReveal: function (t, i) {
          var a = this,
            s = a.slides[i];
          a.slides[t].$element.css("z-index", a.settings.baseZindex + 1),
            s.$element.css({ opacity: 1, "z-index": a.settings.baseZindex }),
            a._createSlideSlices(t, 1, Math.round(a.$element.width() / 100));
          var n = a.slides[t].$element.find(".pogoSlider-slide-slice"),
            r = s.duration / (n.length + 1),
            o = 2 * r;
          n.each(function (t) {
            t % 2 === 0
              ? e(this)
                  .delay(r * t)
                  .animate({ top: "100%" }, o)
              : e(this)
                  .delay(r * t)
                  .animate({ top: "-100%" }, o);
          });
        },
        barRevealDown: function (e, t) {
          return this.slideTransitions.barReveal.apply(this, [e, t, "down"]);
        },
        barRevealUp: function (e, t) {
          return this.slideTransitions.barReveal.apply(this, [e, t, "up"]);
        },
        barReveal: function (t, i, a) {
          var s = this,
            n = s.slides[i];
          s.slides[t].$element.css("z-index", s.settings.baseZindex + 1),
            n.$element.css({ opacity: 1, "z-index": s.settings.baseZindex }),
            s._createSlideSlices(t, 1, Math.round(s.$element.width() / 100));
          var r = s.slides[t].$element.find(".pogoSlider-slide-slice"),
            o = n.duration / (r.length + 1),
            l = 2 * o;
          r.each(function (t) {
            "down" === a
              ? e(this)
                  .delay(o * t)
                  .animate({ top: "100%" }, l)
              : e(this)
                  .delay(o * t)
                  .animate({ top: "-100%" }, l);
          });
        },
      },
    }),
      (e.fn[o] = function (t) {
        return (
          this.each(function () {
            e.data(this, "plugin_" + o) ||
              e.data(this, "plugin_" + o, new s(this, t));
          }),
          this
        );
      });
  })(jQuery, window, document),
  !(function (e) {
    "use strict";
    var t = function (t, i) {
      (this.el = e(t)),
        (this.options = e.extend({}, e.fn.typed.defaults, i)),
        (this.isInput = this.el.is("input")),
        (this.attr = this.options.attr),
        (this.showCursor = this.isInput ? !1 : this.options.showCursor),
        (this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()),
        (this.contentType = this.options.contentType),
        (this.typeSpeed = this.options.typeSpeed),
        (this.startDelay = this.options.startDelay),
        (this.backSpeed = this.options.backSpeed),
        (this.backDelay = this.options.backDelay),
        (this.stringsElement = this.options.stringsElement),
        (this.strings = this.options.strings),
        (this.strPos = 0),
        (this.arrayPos = 0),
        (this.stopNum = 0),
        (this.loop = this.options.loop),
        (this.loopCount = this.options.loopCount),
        (this.curLoop = 0),
        (this.stop = !1),
        (this.cursorChar = this.options.cursorChar),
        (this.shuffle = this.options.shuffle),
        (this.sequence = []),
        this.build();
    };
    (t.prototype = {
      constructor: t,
      init: function () {
        var e = this;
        e.timeout = setTimeout(function () {
          for (var t = 0; t < e.strings.length; ++t) e.sequence[t] = t;
          e.shuffle && (e.sequence = e.shuffleArray(e.sequence)),
            e.typewrite(e.strings[e.sequence[e.arrayPos]], e.strPos);
        }, e.startDelay);
      },
      build: function () {
        var t = this;
        if (
          (this.showCursor === !0 &&
            ((this.cursor = e(
              '<span class="typed-cursor">' + this.cursorChar + "</span>"
            )),
            this.el.after(this.cursor)),
          this.stringsElement)
        ) {
          (this.strings = []),
            this.stringsElement.hide(),
            console.log(this.stringsElement.children());
          var i = this.stringsElement.children();
          e.each(i, function (i, a) {
            t.strings.push(e(a).html());
          });
        }
        this.init();
      },
      typewrite: function (e, t) {
        if (this.stop !== !0) {
          var i = Math.round(70 * Math.random()) + this.typeSpeed,
            a = this;
          a.timeout = setTimeout(function () {
            var i = 0,
              s = e.substr(t);
            if ("^" === s.charAt(0)) {
              var n = 1;
              /^\^\d+/.test(s) &&
                ((s = /\d+/.exec(s)[0]), (n += s.length), (i = parseInt(s))),
                (e = e.substring(0, t) + e.substring(t + n));
            }
            if ("html" === a.contentType) {
              var r = e.substr(t).charAt(0);
              if ("<" === r || "&" === r) {
                var o = "",
                  l = "";
                for (
                  l = "<" === r ? ">" : ";";
                  e.substr(t + 1).charAt(0) !== l &&
                  ((o += e.substr(t).charAt(0)), t++, !(t + 1 > e.length));

                );
                t++, (o += l);
              }
            }
            a.timeout = setTimeout(function () {
              if (t === e.length) {
                if (
                  (a.options.onStringTyped(a.arrayPos),
                  a.arrayPos === a.strings.length - 1 &&
                    (a.options.callback(),
                    a.curLoop++,
                    a.loop === !1 || a.curLoop === a.loopCount))
                )
                  return;
                a.timeout = setTimeout(function () {
                  a.backspace(e, t);
                }, a.backDelay);
              } else {
                0 === t && a.options.preStringTyped(a.arrayPos);
                var i = e.substr(0, t + 1);
                a.attr
                  ? a.el.attr(a.attr, i)
                  : a.isInput
                  ? a.el.val(i)
                  : "html" === a.contentType
                  ? a.el.html(i)
                  : a.el.text(i),
                  t++,
                  a.typewrite(e, t);
              }
            }, i);
          }, i);
        }
      },
      backspace: function (e, t) {
        if (this.stop !== !0) {
          var i = Math.round(70 * Math.random()) + this.backSpeed,
            a = this;
          a.timeout = setTimeout(function () {
            if ("html" === a.contentType && ">" === e.substr(t).charAt(0)) {
              for (
                var i = "";
                "<" !== e.substr(t - 1).charAt(0) &&
                ((i -= e.substr(t).charAt(0)), t--, !(0 > t));

              );
              t--, (i += "<");
            }
            var s = e.substr(0, t);
            a.attr
              ? a.el.attr(a.attr, s)
              : a.isInput
              ? a.el.val(s)
              : "html" === a.contentType
              ? a.el.html(s)
              : a.el.text(s),
              t > a.stopNum
                ? (t--, a.backspace(e, t))
                : t <= a.stopNum &&
                  (a.arrayPos++,
                  a.arrayPos === a.strings.length
                    ? ((a.arrayPos = 0),
                      a.shuffle && (a.sequence = a.shuffleArray(a.sequence)),
                      a.init())
                    : a.typewrite(a.strings[a.sequence[a.arrayPos]], t));
          }, i);
        }
      },
      shuffleArray: function (e) {
        var t,
          i,
          a = e.length;
        if (a)
          for (; --a; )
            (i = Math.floor(Math.random() * (a + 1))),
              (t = e[i]),
              (e[i] = e[a]),
              (e[a] = t);
        return e;
      },
      reset: function () {
        var e = this;
        clearInterval(e.timeout),
          this.el.attr("id"),
          this.el.empty(),
          "undefined" != typeof this.cursor && this.cursor.remove(),
          (this.strPos = 0),
          (this.arrayPos = 0),
          (this.curLoop = 0),
          this.options.resetCallback();
      },
    }),
      (e.fn.typed = function (i) {
        return this.each(function () {
          var a = e(this),
            s = a.data("typed"),
            n = "object" == typeof i && i;
          s && s.reset(),
            a.data("typed", (s = new t(this, n))),
            "string" == typeof i && s[i]();
        });
      }),
      (e.fn.typed.defaults = {
        strings: [
          "These are the default values...",
          "You know what you should do?",
          "Use your own!",
          "Have a great day!",
        ],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function () {},
        preStringTyped: function () {},
        onStringTyped: function () {},
        resetCallback: function () {},
      });
  })(window.jQuery);
