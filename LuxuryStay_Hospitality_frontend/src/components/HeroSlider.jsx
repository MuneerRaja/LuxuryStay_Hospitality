import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderData } from '../constants/data';
import { EffectFade, Autoplay, Pagination } from 'swiper';
import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChevronDown } from 'lucide-react';

const HeroSlider = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect={'fade'}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !bg-white/50 !opacity-100',
          bulletActiveClass: '!bg-accent !w-8 !rounded-full',
        }}
        className='heroSlider h-[70vh] sm:h-[75vh] lg:h-[85vh] min-h-[500px]'
      >
        {sliderData.map(({ id, title, bg, btnNext }) => (
          <SwiperSlide className='h-full relative flex justify-center items-center' key={id}>
            {/* Background Image */}
            <div className='absolute inset-0'>
              <img 
                className='object-cover h-full w-full' 
                src={bg} 
                alt={title}
                loading={id === 1 ? "eager" : "lazy"}
              />
            </div>

            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70' />
            
            {/* Decorative Elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl' />
              <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl' />
            </div>

            {/* Content */}
            <div className='relative z-10 text-white text-center px-4 max-w-5xl mx-auto'>
              {/* Subtitle */}
              <div className='font-tertiary uppercase tracking-[4px] sm:tracking-[6px] text-xs sm:text-sm md:text-base mb-4 sm:mb-6 text-white/80 animate-fade-in-down'>
                Just Enjoy & Relax
              </div>
              
              {/* Title */}
              <h1 className='font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[1px] sm:tracking-[2px] leading-tight mb-6 sm:mb-8 animate-fade-in-up text-balance'>
                {title}
              </h1>
              
              {/* Decorative Line */}
              <div className='w-16 sm:w-20 h-0.5 bg-accent mx-auto mb-6 sm:mb-8' />
              
              {/* CTA Button */}
              <button className='btn btn-lg btn-primary mx-auto rounded-sm animate-fade-in'>
                {btnNext}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float hidden sm:block'>
        <div className='flex flex-col items-center gap-2 text-white/60'>
          <span className='text-xs tracking-[3px] uppercase font-tertiary'>Scroll</span>
          <ChevronDown className='w-5 h-5' />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;