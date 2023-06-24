const { default: Swiper } = require("swiper");

/// search 아이콘눌러도 focus되게하는 로직입니다.
const searchEl = document.querySelector('.search');
// searchEl에서 input 요소를 찾아라
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
// focus가 끝나면 (사용자가 다른 곳을 클릭하면) '통합검색' 텍스트가 사라지게 하기.
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 스크롤하면 뱃지 사라지게 만들기
const badgeEl = document.querySelector('header .badges');

/// lodash 패키지
// _.throttle(함수, 시간) : 0.3초마다 실행되게 해주기. 이거 안하면 스크롤할때마다 수백번씩 실행됨.
window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 뱃지 숨기기
    // gsap.to(요소, 지속시간(s), 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
  } else {
    //뱃지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
  } 
}, 300));

/// gsap 패키지 - fade in 함수
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  // gsap.to(요소, 지속시간(s), 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7s, 1.4s, 2.1s ...
    opacity: 1
  });
});

/// swiper 패키지 - 메뉴 슬라이드
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  // 자동으로 공지사항 슬라이드
  autoplay: true,
  // 마지막 슬라이드 루프되서 반복재생
  loop: true,
});

new Swiper('.promotion .swiper-container',{
  // direction: 'horizontal', // 기본값이라 입력안해도됨.
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  // autoplay: {
  //   delay: 3000
  // },
  pagination : {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true // 사용자가 페이지 번호요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion')
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  // 클릭할때마다 참,거짓 반전시켜서 토글 열었다 닫았다하는거임.
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
};

/// gsap 패키지 - 둥둥 떠있는 애니메이션
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, 
    random(1.5, 2.5), 
    {
    y: size, // y축으로 내려옴
    repeat: -1, // 반복횟수. -1은 무한반복
    yoyo: true, // 되감기
    ease: Power1.easeInOut,
    delay: random(0, delay),
    }
  )
};
floatingObject('.floating1', 1, 25);
floatingObject('.floating2', .5, 25);
floatingObject('.floating3', 1.5, 30);

// ScrollMagic : 스크롤 됬을때 애니메이션 실행하기
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});