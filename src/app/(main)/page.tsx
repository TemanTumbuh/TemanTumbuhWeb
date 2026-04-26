"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Sparkles, Quote, Calendar, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Helper animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-24 pb-16 md:pt-40 md:pb-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="flex-1 max-w-2xl z-10 w-full flex flex-col text-center md:text-left"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[76px] font-bold text-[#142018] leading-[1.1] mb-6 tracking-tight"
          >
            Lingkungan yang tepat <br className="hidden lg:block"/>bisa mengubah segalanya
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-[#657668] text-[16px] xl:text-[18px] max-w-[460px] mx-auto md:mx-0 mb-10 leading-relaxed font-medium"
          >
            Temukan komunitas yang mendukung pertumbuhan karaktermu. Kami percaya adalah benih, dan komunitas adalah tanah yang subur.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3a5a40] text-white px-8 py-3.5 rounded-full font-semibold inline-flex items-center gap-2 shadow-[0_10px_30px_-10px_rgba(58,90,64,0.5)] text-lg"
              >
                Gabung Komunitas <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative w-full flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[48px] overflow-visible">
            <Image 
              src="/images/hero.png" 
              alt="Ilustrasi Teman Tumbuh" 
              fill 
              className="object-contain lg:object-cover rounded-[48px] z-0"
              priority
            />
            {/* 12k Member Badge with continuous float */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [-12, -8, -12] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 md:bottom-12 md:-left-12 lg:bottom-16 lg:-left-16 bg-[#fcdab6] rounded-full w-[130px] h-[130px] flex flex-col justify-center items-center shadow-2xl z-20"
            >
              <span className="text-2xl font-extrabold text-[#523824] -rotate-[10deg]">12k+</span>
              <span className="text-[11px] font-bold tracking-wider text-[#7a5940] mt-1 -rotate-[10deg]">MEMBER</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tentang Kami Section */}
      <section id="tentang-kami" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 lg:py-28">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-center text-[#142018] mb-16 lg:mb-20 tracking-tight"
        >
          Tentang Kami
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center overflow-hidden">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}
            className="flex-1 text-[#556658] text-[15px] lg:text-[17px] leading-relaxed font-medium"
          >
            <p>
              Komunitas Teman tumbuh adalah komunitas yang menjadi wadah pertemuan antar individu yang memiliki warna yang sama. baik itu dari tujuan dan arah, background dan kesamaan hobi. komunitas ini akan menciptakan lingkungan yang positif yang saling menguatkan dan bertumbuh berkembang bersama.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}
            className="flex-1 w-full relative"
          >
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[#3a4d3e] rounded-[32px] p-10 lg:p-14 relative flex flex-col items-center justify-center text-center shadow-2xl min-h-[300px]"
            >
              <div className="absolute top-8 right-10 text-white/20">
                <Quote size={80} className="transform rotate-180" />
              </div>
              <p className="text-[#d8ebd] text-white text-[18px] lg:text-[20px] font-medium leading-relaxed max-w-[400px] z-10 mx-auto">
                &quot;Kami percaya bahwa setiap benih memiliki potensi luar biasa, hanya jika diberikan tanah yang subur dan sinar matahari yang cukup.&quot;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section id="visi-misi" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-10 lg:py-20">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-center text-[#3a5a40] mb-16 xl:mb-24 tracking-tight"
        >
          Visi & Misi
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start overflow-hidden">
          
          {/* Left Column: Visi and Misi List */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex-1 w-full flex flex-col gap-12 lg:gap-14"
          >
            {/* Visi */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-[#142018] mb-6 tracking-tight">Visi :</h3>
              <div className="flex items-start gap-5 lg:gap-6 group">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="bg-[#c2e4c9] text-[#3a5a40] w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(194,228,201,0.8)]"
                >
                  <Users size={24} />
                </motion.div>
                <p className="text-[#556658] text-[15px] lg:text-[16px] leading-relaxed font-medium mt-1">
                  Menjadi ekosistem pembelajaran yang inklusif dan berkelanjutan dalam mengembangkan potensi individu melalui pendidikan non-formal, pembentukan mindset produktif, serta kolaborasi yang luas untuk menciptakan masa depan yang lebih baik.
                </p>
              </div>
            </motion.div>

            {/* Misi */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-[#142018] mb-6 tracking-tight">Misi :</h3>
              <ul className="flex flex-col gap-6 lg:gap-8">
                {[
                  "Menyediakan ruang belajar non-formal yang inklusif, aman, dan menyenangkan.",
                  "Mendorong pengembangan skill, pola pikir, dan potensi diri anggota secara berkelanjutan.",
                  "Membangun komunitas yang suportif melalui interaksi, diskusi, dan kolaborasi positif.",
                  "Mempersiapkan anggota menjadi individu yang produktif, mandiri, dan siap menghadapi dunia kerja.",
                  "Menghadirkan program dan kegiatan yang relevan serta berdampak nyata bagi perkembangan anggota.",
                  "Memperluas jaringan dan kemitraan untuk mendukung pertumbuhan komunitas"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    variants={fadeInUp}
                    className="flex items-start gap-4 lg:gap-5 group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      className="bg-[#815c44] text-[#ffd6a5] w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#a37659] transition-colors"
                    >
                      <Sparkles size={18} />
                    </motion.div>
                    <p className="text-[#556658] text-[14px] lg:text-[15px] leading-relaxed font-medium mt-0.5 group-hover:text-[#2c382f] transition-colors">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Quote Highlight */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInRight}
            className="lg:w-[480px] w-full shrink-0"
          >
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(250,220,108,0.4)" }}
              className="bg-[#fadc6c] rounded-[32px] p-10 lg:p-14 min-h-[460px] flex flex-col items-center justify-center text-center shadow-md relative"
            >
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="mb-8 bg-[#8e6041] p-4 rounded-full text-[#ffd6a5] shadow-lg"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </motion.div>
              <p className="text-[#6d4d38] text-[20px] lg:text-[23px] font-bold leading-snug tracking-tight">
                &quot;Tumbuh bukan tentang seberapa cepat, tapi seberapa dalam akar kita menghujam.&quot;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Agenda Mendatang Section */}
      <section className="bg-[#f6f9f5] w-full py-20 lg:py-28 mt-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl lg:text-[44px] font-bold italic text-[#34513a] mb-4 tracking-tight">Agenda Mendatang</h2>
              <p className="text-[#657668] text-[15px] lg:text-[16px] max-w-lg font-medium leading-relaxed">
                Ruang-ruang aman yang telah kami siapkan untuk perjalananmu minggu ini. Mari bertemu dan bertukar energi.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/jadwal-aktivitas" className="inline-flex items-center gap-2 text-[#465a4c] font-bold text-[14px] hover:text-[#2d4632] group overflow-hidden">
                Lihat Semua Jadwal 
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring" }}>
                  <ArrowRight size={18} />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Card 1 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white rounded-[24px] p-7 flex flex-col relative overflow-hidden transition shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(52,81,58,0.2)] border border-[#e8efe9]"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#486a4e] text-white px-5 py-2 rounded-full text-[14px] font-bold shadow-sm">Rabu</span>
                <Calendar size={22} className="text-[#a1afa4]" />
              </div>
              <h4 className="text-[22px] font-semibold text-[#25362a] mb-3">English with V</h4>
              <p className="text-[#6c7d70] text-[13px] leading-relaxed mb-6 flex-1">
                Merawat ambisi karir dan mimpi menjelajah dunia lewat obrolan bahasa asing yang seru di bawah bimbingan fasilitator kami.
              </p>
              <div className="flex flex-col gap-2 mb-8 text-[12px] font-semibold text-[#546859]">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  20.00-22.00 WIB
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.2.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  discord
                </div>
              </div>
              <Link href="/jadwal-aktivitas" className="w-full relative z-10 block">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#f1f4ef] hover:bg-[#e4ebf0] hover:text-[#233326] text-[#304635] py-3.5 rounded-full font-bold text-[14px] shadow-sm transition"
                >
                  Join Sesi
                </motion.button>
              </Link>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white rounded-[24px] p-7 flex flex-col relative overflow-hidden transition shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(251,229,126,0.3)] border border-[#e1ebd]"
            >
              <div className="flex justify-between items-start mb-6 w-full">
                <span className="bg-[#fbe57e] text-[#554016] px-5 py-2 rounded-full text-[14px] font-bold shadow-sm">Jumat</span>
                <motion.span 
                  animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="bg-[#754f30] text-[#f2e6db] px-3 py-1 rounded-[6px] text-[10px] font-extrabold tracking-wider mt-1 mr-[-5px]"
                >
                  TERPOPULER
                </motion.span>
              </div>
              <h4 className="text-[22px] font-semibold text-[#25362a] mb-3">Panggung Sastra</h4>
              <p className="text-[#6c7d70] text-[13px] leading-relaxed mb-6 flex-1">
                Hadirkan puisi yang merangkum keresahanmu dan suarakan emosi yang selama ini tertahan di hadapan puluhan telinga yang peduli.
              </p>
              <div className="flex flex-col gap-2 mb-8 text-[12px] font-semibold text-[#546859]">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  20.00-21.00 WIB
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.2.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  discord
                </div>
              </div>
              <Link href="/jadwal-aktivitas" className="w-full relative z-10 block">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#fde272] hover:bg-[#f6d75c] text-[#554016] py-3.5 rounded-full font-bold text-[14px] shadow-sm transition"
                >
                  Ambil Kursi
                </motion.button>
              </Link>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white rounded-[24px] p-7 flex flex-col relative overflow-hidden transition hover:shadow-md border border-[#e8efe9]"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#c2e4c9] text-[#2b4c34] px-5 py-2 rounded-full text-[14px] font-bold shadow-sm">Sabtu</span>
                <Calendar size={22} className="text-[#a1afa4]" />
              </div>
              <h4 className="text-[22px] font-semibold text-[#25362a] mb-3">Diskusi Umum</h4>
              <p className="text-[#6c7d70] text-[13px] leading-relaxed mb-6 flex-1">
                Adu argumen lewat ragam obrolan tanpa batas dan temukan sudut pandang baru yang mencerahkan dalam lingkar diskusi yang hangat dan terbuka.
              </p>
              <div className="flex flex-col gap-2 mb-8 text-[12px] font-semibold text-[#546859]">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  22.00 WIB
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.2.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  discord
                </div>
              </div>
              <Link href="/jadwal-aktivitas" className="w-full relative z-10 block">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#f1f4ef] hover:bg-[#e4ebf0] hover:text-[#233326] text-[#304635] py-3.5 rounded-full font-bold text-[14px] shadow-sm transition"
                >
                  Join Sesi
                </motion.button>
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 md:px-12 py-24 mb-16 relative">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="max-w-[1100px] mx-auto rounded-[40px] bg-gradient-to-br from-[#405c45] to-[#283e2c] px-8 py-20 lg:py-24 text-center text-white relative shadow-2xl overflow-hidden flex flex-col justify-center items-center"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl lg:text-[54px] font-medium leading-[1.2] mb-10 tracking-tight z-10 max-w-[800px] text-[#e0e8e2]">
            Siap untuk tumbuh <br/>
            <span className="font-bold italic text-white flex items-center justify-center gap-3 mt-1">
              bersama kami?
            </span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="z-10 w-full max-w-[420px]">
            <Link href="/register" className="w-full block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-[#2a4030] py-4 lg:py-4 rounded-full font-bold text-lg lg:text-[20px] shadow-[0_15px_30px_-10px_rgba(255,255,255,0.4)]"
              >
                Gabung Sekarang!
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Avatar Icon continuously bobbing & spinning slightly */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [-5, 5, -5] 
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute right-8 md:right-32 bottom-20 md:bottom-28 bg-[#526487] text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl font-semibold shadow-2xl border-4 border-[#3a5240]"
          >
            M
          </motion.div>
          
          {/* Decorative blur elements for the background */}
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-[#537c59] blur-[120px] opacity-40 rounded-full z-0"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[100%] bg-[#213525] blur-[100px] opacity-60 rounded-full z-0"></div>
        </motion.div>
      </section>
    </div>
  );
}
