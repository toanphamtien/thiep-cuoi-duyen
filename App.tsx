
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Calendar, MapPin, Heart, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { WeddingData, DEFAULT_WEDDING_DATA } from './types';
import Envelope from './components/Envelope';
import FallingEffects from './components/FallingEffects';
import ScrollSection from './components/ScrollSection';

function App() {
  const [data] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [guestName, setGuestName] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Parse query params for guest name
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('k') || params.get('guest') || params.get('to');
    if (guest) {
      setGuestName(guest);
    }
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(data.musicUrl);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [data.musicUrl]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Attempt to play music on user interaction
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Autoplay blocked", err));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % data.galleryImages.length : null));
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (lightboxIndex !== null) {
          setLightboxIndex((prev) => (prev !== null ? (prev - 1 + data.galleryImages.length) % data.galleryImages.length : null));
      }
  };

  return (
    <div className="min-h-screen font-body text-wedding-cream selection:bg-wedding-gold selection:text-wedding-red relative">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/oriental-tiles.png")' }}>
      </div>

      <FallingEffects />

      {/* Envelope Overlay - Only unmount after animation completes (handled by isEnvelopeOpen state switch) */}
      {!isEnvelopeOpen && (
        <Envelope onOpen={handleOpenEnvelope} guestName={guestName} />
      )}

      {/* Toolbar */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <button 
          onClick={toggleMusic} 
          className="p-3 rounded-full bg-wedding-gold text-wedding-red shadow-lg hover:scale-110 transition"
        >
          {isPlaying ? <Volume2 /> : <VolumeX />}
        </button>
      </div>

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header Section (The "Card" inside) */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 relative text-center">
           <ScrollSection className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-wedding-gold/30 shadow-2xl max-w-2xl">
              <div className="mb-4">
              <p className="text-xl md:text-2xl font-script uppercase tracking-widest mb-2 text-wedding-gold">Trân Trọng Kính Mời Tới Dự</p>
               <h1 className="text-4xl md:text-6xl font-bold text-wedding-gold drop-shadow-lg mb-2">Lễ Vu Quy</h1>
               {guestName && (
                 <div className="my-4">
                   <span className="text-sm uppercase tracking-widest opacity-80">Khách mời</span>
                   <h2 className="text-2xl font-serif font-bold mt-1 text-white">{guestName}</h2>
                 </div>
               )}
             </div>

             {/* Main Couple Photo Frame */}
             <div className="relative w-full aspect-[4/3] mb-8 p-2 border-4 border-wedding-gold rounded-sm shadow-2xl bg-wedding-red">
                <div className="absolute inset-0 border border-white/30 m-1"></div>
                <img src={data.couplePhoto} alt="Couple" className="w-full h-full object-cover" />
             </div>

             <div className="font-serif text-center">
               <div className="text-3xl md:text-5xl font-bold mb-2">{data.groomName}</div>
               <Heart className="w-6 h-6 mx-auto text-wedding-gold fill-wedding-gold animate-pulse my-2" />
               <div className="text-3xl md:text-5xl font-bold mb-6">{data.brideName}</div>
               
               <p className="text-lg italic opacity-90 max-w-lg mx-auto">
                 "{data.invitationMessage}"
               </p>
             </div>
           </ScrollSection>
        </section>

        {/* Groom & Bride Details */}
        <section className="py-20 px-4 bg-black/20 backdrop-blur-sm my-10">
             <ScrollSection>
             <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                {/* Groom */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-wedding-gold p-1 overflow-hidden shadow-2xl relative mb-6 group">
                    <img src={data.groomPhoto} alt="Groom" className="w-full h-full object-cover object-top rounded-full transition duration-700 group-hover:scale-110" />
                  </div>
                  <h2 className="text-3xl font-script text-wedding-gold">Chú Rể</h2>
                  <h3 className="text-2xl font-bold mt-2 mb-4">{data.groomName}</h3>
                  
                  <div className="relative px-6 py-4 bg-wedding-red/40 rounded-lg border border-wedding-gold/30">
                    <h4 className="text-wedding-gold font-bold uppercase tracking-widest mb-3 text-sm border-b border-wedding-gold/30 pb-2 inline-block">Nhà Trai</h4>
                    <p className="text-lg font-serif">{data.groomFather}</p>
                    <p className="text-lg font-serif">{data.groomMother}</p>
                  </div>
                </div>

                <div className="text-4xl text-wedding-gold animate-pulse-slow hidden md:block">囍</div>

                {/* Bride */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-wedding-gold p-1 overflow-hidden shadow-2xl relative mb-6 group">
                    <img src={data.bridePhoto} alt="Bride" className="w-full h-full object-cover object-top rounded-full transition duration-700 group-hover:scale-110" />
                  </div>
                  <h2 className="text-3xl font-script text-wedding-gold">Cô Dâu</h2>
                  <h3 className="text-2xl font-bold mt-2 mb-4">{data.brideName}</h3>
                  
                  <div className="relative px-6 py-4 bg-wedding-red/40 rounded-lg border border-wedding-gold/30">
                    <h4 className="text-wedding-gold font-bold uppercase tracking-widest mb-3 text-sm border-b border-wedding-gold/30 pb-2 inline-block">Nhà Gái</h4>
                    <p className="text-lg font-serif">{data.brideFather}</p>
                    <p className="text-lg font-serif">{data.brideMother}</p>
                  </div>
                </div>
             </div>
             </ScrollSection>
        </section>

        {/* Date & Location & Schedule */}
        <section className="py-20 px-4">
           <ScrollSection className="bg-wedding-cream text-wedding-red rounded-lg shadow-2xl border-4 border-wedding-gold p-6 md:p-10 relative overflow-hidden">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-wedding-red/50 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-wedding-red/50 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-wedding-red/50 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-wedding-red/50 rounded-br-3xl"></div>

              <h3 className="text-4xl font-script text-center mb-10">Thời Gian & Địa Điểm</h3>
              
              <div className="flex flex-col md:flex-row justify-center items-start gap-10 mb-12">
                
                {/* Calendar Visual */}
                <div className="flex flex-col items-center flex-1 w-full">
                  <Calendar className="w-12 h-12 mb-4 text-wedding-red" />
                  <div className="text-2xl font-serif font-bold mb-2">{data.weddingDate}</div>
                  <div className="text-5xl font-bold text-wedding-gold drop-shadow-sm mb-2">{data.weddingTime}</div>
                  <p className="italic text-sm opacity-70">Hân hạnh đón tiếp</p>
                </div>

                <div className="hidden md:block w-px h-32 bg-wedding-red/20 self-center"></div>

                {/* Map Visual */}
                <div className="flex flex-col items-center text-center flex-1 w-full">
                   <MapPin className="w-12 h-12 mb-4 text-wedding-red" />
                   <h4 className="text-2xl font-serif font-bold mb-2">{data.locationName}</h4>
                   <p className="max-w-xs mx-auto opacity-80 mb-4">{data.locationAddress}</p>
                   <a 
                     href={data.locationLink}
                     target="_blank" 
                     rel="noreferrer"
                     className="px-6 py-2 bg-wedding-red text-wedding-cream rounded-full hover:bg-red-900 transition text-sm font-bold shadow-lg"
                   >
                     Xem Bản Đồ
                   </a>
                </div>
              </div>

              <div className="mx-auto opacity-80 mb-4 text-center">
                <p>"Chúng mình vô cùng hạnh phúc khi sắp bước sang một chương mới của cuộc đời.</p>
                <p>Để khoảnh khắc ý nghĩa này thêm trọn vẹn, chúng mình rất mong muốn bạn có thể dành thời gian đến chung vui và cùng nhau tạo nên một buổi tiệc thật đáng nhớ.</p>
                <p>Sự có mặt của bạn không chỉ là lời chúc phúc mà còn là niềm vui lớn nhất đối với cô dâu chú rể.</p>
                <p>Cảm ơn bạn rất nhiều vì đã luôn đồng hành cùng chúng mình. Hẹn gặp bạn tại tiệc cưới!"</p>
              </div>
              
              {/* Schedule Timeline */}
              <div className="border-t border-wedding-red/10 pt-10">
                  <h4 className="text-2xl font-serif text-center mb-8 font-bold flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5" /> Lịch Trình
                  </h4>
                  <div className="max-w-md mx-auto relative">
                      {/* Vertical Line */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-wedding-red/30"></div>
                      
                      {data.weddingSchedule.map((item, idx) => (
                          <div key={idx} className={`flex items-center mb-6 relative ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                              {/* Activity (Left or Right) */}
                              <div className="w-1/2 px-4 text-center md:text-right">
                                  {idx % 2 === 0 ? (
                                      <span className="font-bold text-lg block md:text-left">{item.activity}</span>
                                  ) : (
                                      <span className="font-serif text-wedding-gold text-xl font-bold block md:text-right">{item.time}</span>
                                  )}
                              </div>
                              
                              {/* Dot */}
                              <div className="w-4 h-4 bg-wedding-gold rounded-full border-2 border-wedding-cream z-10 shadow-md mx-auto"></div>
                              
                              {/* Time (Right or Left) */}
                              <div className="w-1/2 px-4 text-center md:text-left">
                                  {idx % 2 === 0 ? (
                                      <span className="font-serif text-wedding-gold text-xl font-bold block md:text-right">{item.time}</span>
                                  ) : (
                                      <span className="font-bold text-lg block md:text-left">{item.activity}</span>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

           </ScrollSection>
        </section>

        {/* Gallery */}
        <section className="py-20 px-4 bg-black/20">
          <ScrollSection>
            <h3 className="text-4xl font-script text-center text-wedding-gold mb-12">Khoảnh Khắc Hạnh Phúc</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {data.galleryImages.map((img, idx) => (
                 <div 
                    key={idx} 
                    onClick={() => setLightboxIndex(idx)}
                    className={`group relative overflow-hidden rounded-lg shadow-lg border-2 border-wedding-gold/30 cursor-pointer ${idx % 3 === 1 ? 'md:row-span-2' : ''}`}
                 >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-bold px-4 py-2 border border-white rounded-full backdrop-blur-sm">Xem ảnh</span>
                    </div>
                    {/* Subtle Zoom Effect: scale-105 */}
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                 </div>
               ))}
            </div>
          </ScrollSection>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center opacity-60 text-sm">
           <p className="font-script text-xl text-wedding-gold mb-2">{data.groomName} & {data.brideName}</p>
           <p>Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi.</p>
        </footer>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setLightboxIndex(null)}>
            <button 
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition" 
                onClick={() => setLightboxIndex(null)}
            >
                <X size={32} />
            </button>
            
            <button 
                className="absolute left-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full hidden md:block transition" 
                onClick={prevImage}
            >
                <ChevronLeft size={48} />
            </button>

            <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={data.galleryImages[lightboxIndex]} 
                alt="Full size" 
                className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl border-2 border-wedding-gold"
                onClick={(e) => e.stopPropagation()} 
            />

            <button 
                className="absolute right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full hidden md:block transition" 
                onClick={nextImage}
            >
                <ChevronRight size={48} />
            </button>
            
            {/* Mobile nav controls */}
            <div className="absolute bottom-8 flex gap-12 md:hidden" onClick={(e) => e.stopPropagation()}>
                <button className="text-white/70 hover:text-white p-4 bg-white/10 rounded-full backdrop-blur-md" onClick={prevImage}><ChevronLeft size={24} /></button>
                <button className="text-white/70 hover:text-white p-4 bg-white/10 rounded-full backdrop-blur-md" onClick={nextImage}><ChevronRight size={24} /></button>
            </div>
        </div>
      )}

    </div>
  );
}

export default App;
