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

// fade in 함수
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  // gsap.to(요소, 지속시간(s), 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7s, 1.4s, 2.1s ...
    opacity: 1
  });
});

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