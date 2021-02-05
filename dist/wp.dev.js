"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

gsap.registerPlugin(ScrollTrigger);
var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");
var sections = document.querySelectorAll(".page-content__section");
var marquees = document.querySelectorAll(".marquee div");
var marqueeText = "";

var updateMarqueeText = function updateMarqueeText() {
  _toConsumableArray(marquees).forEach(function (marquee) {
    marquee.classList.add("active");
    marquee.addEventListener("transitionend", function () {
      marquee.classList.remove("active");
      marquee.innerText = "".concat(marqueeText, " \u26A1 ").repeat(20);
    });
  });
};

var updateBgColor = function updateBgColor(color) {
  return document.documentElement.style.setProperty("--color-background", color);
};

var setActiveSection = function setActiveSection(section) {
  marqueeText = section.querySelector("h2").textContent;

  _toConsumableArray(sections).forEach(function (section) {
    return section.classList.remove("active");
  });

  section.classList.add("active");
  !prefersReducedMotion.matches && updateBgColor(section.dataset.bgColor);
  updateMarqueeText();
};

if (!prefersReducedMotion.matches) {
  gsap.to(".marquee div", {
    scrollTrigger: {
      trigger: ".page-content",
      scrub: 0.25,
      start: "top bottom",
      end: "bottom top",
      ease: "power2"
    },
    xPercent: -50
  });
}

gsap.utils.toArray(".page-content__section h2").forEach(function (heading) {
  ScrollTrigger.create({
    trigger: heading,
    start: "top center",
    end: "bottom 200px",
    toggleActions: "play reset play reset",
    ease: "power2",
    onEnter: function onEnter() {
      return marqueeText !== heading.textContent && setActiveSection(heading.parentElement);
    },
    onEnterBack: function onEnterBack() {
      return marqueeText !== heading.textContent && setActiveSection(heading.parentElement);
    }
  });
});