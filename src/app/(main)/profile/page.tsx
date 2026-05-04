"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Share2, Heart, Award, ArrowRight, FileText, Image as ImageIcon, MessageSquare, Aperture, Newspaper, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Postingan");

  return (
    <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10 pt-28 lg:pt-40">
      
      {/* Left Sidebar */}
      <div className="w-full lg:w-[320px] flex flex-col shrink-0">
        <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden mb-8 border-4 border-[#e8efe9]">
          <Image 
            src="/images/profile_saraswati.png" 
            alt="Saraswati Putri" 
            fill 
            className="object-cover"
          />
        </div>
        
        <h1 className="text-4xl sm:text-[46px] font-serif font-bold text-[#2d4632] leading-[1.1] mb-3">
          Saraswati<br/>Putri
        </h1>
        <p className="text-[#657668] text-[16px] font-medium mb-6">Penyair & Pegiat Literasi Alam</p>
        
        <div className="flex flex-wrap gap-2.5 mb-8">
          <span className="bg-[#d1ecd2] text-[#2d4632] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider">PUISI</span>
          <span className="bg-[#d1ecd2] text-[#2d4632] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider">BOTANI</span>
          <span className="bg-[#e8efe9] text-[#657668] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider">JURNAL</span>
        </div>
        
        <div className="flex gap-4 mb-10">
          <button className="bg-[#3a5a40] text-white px-8 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#2d4632] transition text-[15px]">
            Ikuti
          </button>
          <button className="bg-transparent text-[#2d4632] px-8 py-2.5 rounded-full font-semibold border-2 border-[#2d4632] hover:bg-[#2d4632] hover:text-white transition text-[15px]">
            Pesan
          </button>
        </div>
        
        {/* Quote Card Left */}
        <div className="bg-[#486a4e] rounded-[24px] p-8 text-center relative shadow-lg">
           <div className="text-[#8eab93] text-5xl font-serif font-bold mb-0 leading-none">"</div>
           <p className="text-[#e2ece4] text-[18px] font-serif italic leading-relaxed mt-2">
             "Sastra adalah tanah, dan imajinasi adalah benihnya."
           </p>
           <div className="w-16 h-0.5 bg-[#8eab93] mx-auto mt-6 opacity-40"></div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col gap-8">
        
        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6">
          {/* Stats Card */}
          <div className="bg-[#f2f4ef] rounded-[24px] p-8 relative overflow-hidden flex flex-col justify-center border border-[#e8efe9] min-h-[220px]">
            <h3 className="text-[#2d4632] text-[22px] font-semibold mb-3 relative z-10">Kontribusi Pertumbuhan</h3>
            <p className="text-[#657668] text-[14px] leading-relaxed mb-8 max-w-[280px] relative z-10">
              Menyemai ide melalui 142 karya dan mendampingi 1.2k teman dalam perjalanan intelektual.
            </p>
            <div className="flex gap-8 relative z-10">
              <div>
                <div className="text-[#2d4632] text-3xl font-bold mb-1">142</div>
                <div className="text-[#8e9e92] text-[10px] font-bold tracking-wider uppercase">Karya</div>
              </div>
              <div>
                <div className="text-[#2d4632] text-3xl font-bold mb-1">89</div>
                <div className="text-[#8e9e92] text-[10px] font-bold tracking-wider uppercase">Perjalanan</div>
              </div>
              <div>
                <div className="text-[#2d4632] text-3xl font-bold mb-1">1.2k</div>
                <div className="text-[#8e9e92] text-[10px] font-bold tracking-wider uppercase">Pengikut</div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-4 right-4 text-[#e2e8e4] opacity-50 z-0 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
          </div>
          
          {/* Quote Card Right */}
          <div className="bg-[#8a6341] rounded-[24px] p-8 text-center flex flex-col items-center justify-center shadow-lg min-h-[220px]">
            <div className="bg-[#a87f5d] p-3 rounded-full mb-5">
               <Award size={20} className="text-[#fce4c8]" />
            </div>
            <p className="text-[#fce4c8] text-[19px] font-serif italic leading-relaxed px-2">
              "Tumbuh bukan tentang seberapa cepat, tapi seberapa dalam akar kita menghujam."
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-2 mb-2">
          <div className="bg-[#e8ece9] p-1.5 rounded-full inline-flex">
            {["Postingan", "Life Stories", "Karya"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-full text-[14px] font-bold transition-all ${activeTab === tab ? 'bg-white text-[#2d4632] shadow-sm' : 'text-[#657668] hover:text-[#2d4632]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area - Masonry/Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          
          {/* Post 1: Catatan Singkat */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#e8efe9] flex flex-col min-h-[280px]">
            <div className="flex items-center gap-2 text-[#8e9e92] text-[10px] font-bold tracking-wider uppercase mb-5">
              <MessageSquare size={14} />
              <span>Catatan Singkat • 2 jam lalu</span>
            </div>
            <p className="text-[#465a4c] text-[15px] leading-relaxed mb-6">
              Pagi ini menemukan embun yang sempurna di atas daun talas. Mengingatkan saya pada ketenangan yang rapuh namun indah. Sedang menyiapkan puisi baru tentang ini.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#c2e4c9] border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-[#aed1b5] border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-[#fce4c8] border-2 border-white"></div>
              </div>
              <div className="flex items-center gap-1.5 text-[#657668]">
                <Heart size={16} />
                <span className="text-[13px] font-bold">24</span>
              </div>
            </div>
          </div>

          {/* Post 2: Sketsa Visual */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-[#e8efe9] flex flex-col min-h-[280px]">
            <div className="relative h-[200px] w-full shrink-0">
              <Image 
                src="/images/purple_flowers.png" 
                alt="Bunga Ungu" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-[#8e9e92] text-[10px] font-bold tracking-wider uppercase mb-3">
                <Aperture size={14} />
                <span>Sketsa Visual • Kemarin</span>
              </div>
              <p className="text-[#465a4c] text-[14px] leading-relaxed">
                Warna yang tak pernah bohong. Alam punya caranya sendiri untuk bercerita tanpa suara.
              </p>
            </div>
          </div>

          {/* Post 3: Rekomendasi */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#e8efe9] flex flex-col min-h-[280px]">
            <div className="flex items-center gap-2 text-[#8e9e92] text-[10px] font-bold tracking-wider uppercase mb-5">
              <Newspaper size={14} />
              <span>Rekomendasi • 3 hari lalu</span>
            </div>
            <p className="text-[#465a4c] text-[15px] leading-relaxed mb-6">
              Baru saja menyelesaikan 'The Hidden Life of Trees'. Benar-benar mengubah perspektif saya tentang bagaimana hutan berkomunikasi.
            </p>
            <div className="flex items-center justify-between mt-auto text-[#657668]">
              <div className="flex items-center gap-4">
                <MessageSquare size={18} className="cursor-pointer hover:text-[#2d4632]" />
                <Share2 size={18} className="cursor-pointer hover:text-[#2d4632]" />
              </div>
              <div className="flex items-center gap-1.5">
                <Heart size={16} />
                <span className="text-[13px] font-bold">56</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner Card */}
        <div className="bg-[#f2f4ef] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden mt-6 shadow-sm border border-[#e8efe9]">
           <div className="flex-1 z-10">
             <h3 className="text-[#3a5a40] text-[28px] font-bold mb-4">Perjalanan Terbaru</h3>
             <h4 className="text-[#2d4632] text-[22px] font-bold mb-3">Menemukan Kembali Akar di Lereng Merbabu</h4>
             <p className="text-[#657668] text-[15px] leading-relaxed mb-8 max-w-[480px]">
               Sebuah jurnal naratif tentang pencarian jati diri melalui pengamatan ekosistem lumut dan kabut abadi. Bagaimana hal-hal terkecil di alam justru memberikan jawaban terbesar bagi hidup kita.
             </p>
             <button className="text-[#2d4632] font-bold text-[15px] flex items-center gap-2 group bg-[#e2e8e4] hover:bg-[#d0dbd3] px-6 py-2.5 rounded-full transition-colors w-max">
               Baca Selengkapnya
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
           </div>
           
           <div className="flex gap-4 shrink-0 z-10 w-full md:w-auto relative">
             <div className="relative w-[180px] h-[130px] rounded-[16px] overflow-hidden shadow-md transform -rotate-1 z-10">
               <Image src="/images/forest_sunlight.png" alt="Hutan" fill className="object-cover" />
             </div>
             <div className="relative w-[180px] h-[130px] rounded-[16px] overflow-hidden shadow-md transform translate-y-6 rotate-2">
               <Image src="/images/mountain_valley.png" alt="Lembah" fill className="object-cover" />
             </div>
           </div>
           
           {/* Decorative background shape */}
           <div className="absolute right-0 bottom-0 text-[#e8efe9] opacity-70 transform translate-x-1/4 translate-y-1/4 pointer-events-none z-0">
             <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
               <path fill="#e2e8e4" d="M42.7,-73.4C55.9,-67.2,67.6,-57.3,76.5,-45.3C85.4,-33.3,91.5,-19.1,91.7,-4.8C91.9,9.5,86.2,23.8,77.5,35.8C68.8,47.8,57.1,57.5,43.9,64.2C30.7,70.9,16,74.5,1.2,72.6C-13.6,70.7,-28.4,63.3,-41.8,56.1C-55.2,48.9,-67.2,41.9,-75.6,31.2C-84,20.5,-88.8,6.1,-86.6,-7.3C-84.4,-20.7,-75.2,-33.1,-64.5,-42.6C-53.8,-52.1,-41.6,-58.7,-29.4,-65.4C-17.2,-72.1,-5,-78.9,4.4,-86.2C13.8,-93.5,29.5,-79.6,42.7,-73.4Z" transform="translate(100 100)" />
             </svg>
           </div>
        </div>

      </div>
    </div>
  );
}
