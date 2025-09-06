import { Link } from "react-router-dom"
import { 
    sectionDataNotaris as sectionData, 
    sectionDataPPAT, 
    servicesData, 
    aboutData, 
    educationData, 
    sectionDataVision,
    galleryItems,
    organizationData
} 
from "../data";
import { 
    SectionHeader, 
    LegalSection, 
    AuthoritySection, 
    ServiceCard, 
    ProfileImage,
    ProfileDescription,
    SkillsSection,
    ExperienceSection,
    EducationCard,
    OrganizationCard,
    TrainingCard,
    BankCooperation,
    VisionCard,
    MissionCard,
    GalleryCard,
} 
from "./Template";
import { useState } from "react";

export const HeroSection = () => {
    return (
        <section className="bg-black pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            Notaris & PPAT Tegal <span className="text-gold-500 block md:inline mt-2">Harsoyo, S.IP, SH., MKn</span>
                        </h1>
                        <h2 className="text-lg md:text-xl text-gray-300 mb-6 font-medium">
                            Layanan Notaris dan PPAT Profesional di Tegal, Jawa Tengah
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-lg text-sm md:text-base">
                            Sebagai Notaris dan PPAT berlisensi di Tegal, Jawa Tengah, kami menyediakan layanan hukum profesional termasuk pembuatan akta notaris, pengurusan sertifikat tanah, legalisasi dokumen, dan konsultasi hukum dengan pendekatan personal untuk setiap klien.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to={"/about"}
                                className="bg-gold-600 hover:bg-gold-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all text-sm md:text-base"
                            >
                                Tentang Notaris
                            </Link>
                            <Link
                                to={"/about"}
                                className="border border-gold-500 text-gold-500 hover:bg-gray-900 px-6 py-3 rounded-lg transition-all text-sm md:text-base"
                            >
                                Layanan PPAT
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
                        <div className="relative">
                            <img
                                src="https://res.cloudinary.com/du4wegspv/image/upload/f_auto,q_auto,w_800/v1756899416/IMG_20250903_183535_wqydjs.jpg"
                                alt="Harsoyo Notaris dan PPAT Tegal, Jawa Tengah - Melayani jasa notaris dan ppat profesional"
                                className="rounded-lg shadow-2xl w-full max-w-xs md:max-w-sm h-[400px] border-4 border-gold-500 object-cover"
                            />
                            <div className="absolute -bottom-4 -right-4 bg-gray-900 p-3 rounded-lg shadow-md border border-gold-500">
                                <div className="flex items-center">
                                    <div>
                                        <p className="text-xs text-gray-400">Sejak 2023</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const NotarisSection = () => {
    return (
        <section id="notaris" className="py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Layanan Notaris Tegal"
                    description="Pelayanan profesional untuk pembuatan akta otentik dan legalitas dokumen di wilayah Tegal dan sekitarnya"
                    darkMode={true}
                />

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {sectionData.sections.map((section, index) => (
                        <LegalSection
                            key={section.title}
                            title={section.title}
                            icon={section.icon}
                            items={section.items}
                            iconColor="text-gold-500"
                            animation={index === 0 ? "fade-right" : "fade-left"}
                            darkMode={true}
                        />
                    ))}
                </div>

                <AuthoritySection
                    title="Kewenangan Notaris"
                    icon="fa-scale-balanced"
                    categories={sectionData.authority.categories}
                    darkMode={true}
                />
            </div>
        </section>
    );
};

export const PPATSection = () => {
    return (
        <section id="ppat" className="py-16 bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Layanan PPAT Tegal"
                    description="Pengurusan dokumen pertanahan dan peralihan hak atas tanah di wilayah Tegal"
                    darkMode={true}
                />

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {sectionDataPPAT.sections.map((section, index) => (
                        <LegalSection
                            key={section.title}
                            title={section.title}
                            icon={section.icon}
                            description={section.description}
                            items={section.items}
                            iconColor="text-gold-500"
                            animation={index === 0 ? "fade-right" : "fade-left"}
                            darkMode={true}
                        />
                    ))}
                </div>

                <AuthoritySection
                    title="Kewenangan PPAT"
                    icon="fa-house-chimney"
                    categories={sectionDataPPAT.authority.categories}
                    darkMode={true}
                />
            </div>
        </section>
    );
};

export const ServiceSection = () => {
    return (
        <section id="services" className="py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Layanan Notaris & PPAT Tegal"
                    description="Berbagai layanan profesional untuk kebutuhan hukum dan pertanahan Anda"
                    darkMode={true}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.services.map((service) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            icon={service.icon}
                            color="bg-gold-500"
                            description={service.description}
                            items={service.items}
                            animationDelay={service.animationDelay}
                            darkMode={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const OfficeGallery = () => {
    return (
        <section className="py-16 bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={"Galeri Kantor Notaris Tegal"}
                    description={"Kantor notaris profesional di Tegal yang nyaman untuk melayani kebutuhan hukum dan pertanahan Anda."}
                    darkMode={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems.map((item) => (
                        <GalleryCard
                            key={item.id}
                            imageUrl={item.imageUrl}
                            title={item.title}
                            description={item.description}
                            darkMode={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const AboutSection = () => {
    return (
        <section className="py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <SectionHeader
                    title="Notaris dan PPAT Tegal, Jawa Tengah - Harsoyo, S.IP, SH., MKn"
                    description="Profil lengkap Harsoyo, Notaris dan PPAT profesional yang melayani wilayah Tegal dan Jawa Tengah dengan pengalaman sejak tahun 2023 dalam bidang jasa notaris dan PPAT."
                    darkMode={true}
                />

                <div className="md:flex items-center">
                    <ProfileImage
                        imageUrl={aboutData.profile.imageUrl}
                        altText="Harsoyo Notaris dan PPAT Tegal, Jawa Tengah"
                        darkMode={true}
                    />

                    <div className="md:w-2/3 md:pl-12" data-aos="fade-left">
                        <ProfileDescription
                            title="Tentang Notaris Harsoyo di Tegal"
                            description="Harsoyo, S.IP, SH., MKn adalah Notaris dan PPAT berlisensi yang berkantor di Tegal, Jawa Tengah. Dengan pengalaman sejak tahun 2023, beliau melayani berbagai kebutuhan hukum termasuk pembuatan akta notaris, pengurusan sertifikat tanah, legalisasi dokumen, dan konsultasi hukum untuk masyarakat Tegal dan sekitarnya."
                            darkMode={true}
                        />

                        <SkillsSection skills={aboutData.skills} darkMode={true} />

                        <ExperienceSection
                            title="Pengalaman Notaris di Tegal"
                            items={aboutData.experience.items}
                            darkMode={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export const EducationSection = () => {
    return (
        <section className="py-16 bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={educationData.header.title}
                    description={educationData.header.description}
                    darkMode={true}
                />

                <div className="relative pl-12 timeline">
                    <div className="mb-12 relative timeline-item" data-aos="fade-up">
                        <h3 className="text-xl font-semibold text-white mb-6">{educationData.formalEducation.title}</h3>

                        {educationData.formalEducation.items.map((item, index) => (
                            <EducationCard
                                key={index}
                                degree={item.degree}
                                institution={item.institution}
                                thesis={item.thesis}
                                darkMode={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const VisionSection = () => {
    return (
        <section id="vision" className="py-16 bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={sectionDataVision.title}
                    description={sectionDataVision.description}
                    darkMode={true}
                />

                <div className="grid md:grid-cols-2 gap-8">
                    <VisionCard
                        title={sectionDataVision.vision.title}
                        icon={sectionDataVision.vision.icon}
                        content={sectionDataVision.vision.content}
                        quote={sectionDataVision.vision.quote}
                        color={sectionDataVision.vision.color}
                        animation="fade-right"
                        darkMode={true}
                    />

                    <MissionCard
                        title={sectionDataVision.mission.title}
                        icon={sectionDataVision.mission.icon}
                        items={sectionDataVision.mission.items}
                        color={sectionDataVision.mission.color}
                        animation="fade-left"
                        darkMode={true}
                    />
                </div>
            </div>
        </section>
    );
};

export const ContactSection = () => {
    return (
        <section id="contact" className="py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-white mb-4">Hubungi Notaris dan PPAT Harsoyo di Tegal</h2>
                    <div className="w-20 h-1 bg-gold-500 mx-auto mb-6"></div>
                    <p className="text-gray-300 max-w-2xl mx-auto">Kantor Notaris & PPAT Harsoyo siap melayani kebutuhan legal Anda dengan profesionalisme dan keahlian di wilayah Tegal, Jawa Tengah.</p>
                </div>

                <div className="grid md:grid-cols-1 gap-12">
                    <div data-aos="fade-right">
                        <h3 className="text-xl font-semibold text-white mb-6">Informasi Kontak Notaris Tegal</h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-gray-700 p-3 rounded-full mr-4 border border-gold-500">
                                    <i className="fas fa-map-marker-alt text-gold-500"></i>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Alamat Kantor Notaris Tegal</h4>
                                    <p className="text-gray-300">
                                        JL. Hasyim Dirjo Subroto Desa Wangandawa, Kecamatan Talang, Kabupaten Tegal, Jawa Tengah
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">Lokasi strategis untuk layanan notaris dan ppat di Tegal</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-gray-700 p-3 rounded-full mr-4 border border-gold-500">
                                    <i className="fas fa-phone-alt text-gold-500"></i>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Telepon Notaris Tegal</h4>
                                    <p className="text-gray-300">085712269000</p>
                                    <p className="text-gray-300">085742419333</p>
                                    <p className="text-gray-400 text-sm mt-1">Hubungi untuk konsultasi notaris dan ppat</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-gray-700 p-3 rounded-full mr-4 border border-gold-500">
                                    <i className="fas fa-envelope text-gold-500"></i>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Email</h4>
                                    <p className="text-gray-300">
                                        yudhistirayudhistira20@gmail.com
                                    </p>
                                    <p className="text-gray-300">
                                        harsoyo.notaris18@gmail.com
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">Hubungi untuk konsultasi notaris dan ppat</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-gray-700 p-3 rounded-full mr-4 border border-gold-500">
                                    <i className="fas fa-clock text-gold-500"></i>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Jam Kerja Notaris Tegal</h4>
                                    <p className="text-gray-300">Senin-Kamis: 09.00 - 17.00 WIB</p>
                                    <p className="text-gray-400 text-sm mt-1">Melayani jasa notaris dan ppat selama jam kerja</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-medium text-white mb-4">
                                Lokasi Kantor Notaris di Wangandawa, Talang, Tegal, Jawa Tengah
                            </h4>
                            <div className="bg-gray-700 rounded-lg overflow-hidden h-64 border border-gray-600">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31519.0!2d109.16789!3d-6.8924183!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnMDk uICJbIjEwOScgNzknNTAuMCJd!5e0!3m2!1sid!2sid!4v1693700000000`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Lokasi Kantor Notaris dan PPAT Harsoyo di Tegal, Jawa Tengah"
                                ></iframe>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                                Kantor Notaris dan PPAT Harsoyo mudah diakses dari berbagai wilayah di Tegal dan Jawa Tengah
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const OrganizationSection = () => {
    return (
        <section className="py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={organizationData.header.title}
                    description={organizationData.header.description}
                    darkMode={true}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {organizationData.organizations.map((org, index) => (
                        <OrganizationCard
                            key={index}
                            name={org.name}
                            icon={org.icon}
                            color={org.color}
                            description={org.description}
                            period={org.period}
                            role={org.role}
                            animationDelay={(index % 3 + 1) * 100}
                            darkMode={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const WhattsappButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purpose, setPurpose] = useState('');
    const [showOtherPurpose, setShowOtherPurpose] = useState(false);
    const [timeError, setTimeError] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setTimeError('');
    };

    const handlePurposeChange = (e) => {
        const selectedPurpose = e.target.value;
        setPurpose(selectedPurpose);
        setShowOtherPurpose(selectedPurpose === 'Lainnya');
    };

    const validateTime = (time) => {
        if (!time) return false;
        const [hours, minutes] = time.split(':').map(Number);
        return hours >= 8 && hours < 16;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const timeInput = e.target.elements['visit-time'];
        const timeValue = timeInput.value;

        if (!validateTime(timeValue)) {
            setTimeError('Waktu kunjungan harus antara jam 08:00 - 16:00');
            return;
        }

        const formData = new FormData(e.target);
        const name = formData.get('visit-name');
        const phone = formData.get('visit-phone');
        const date = formData.get('visit-date');
        const time = formData.get('visit-time');
        const purpose = formData.get('visit-purpose');
        const otherPurpose = formData.get('other-purpose');

        const formattedDate = new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let message = `Halo, saya ${name} ingin menjadwalkan kunjungan dengan detail sebagai berikut:\n\n`;
        message += `📅 Tanggal: ${formattedDate}\n`;
        message += `⏰ Waktu: ${time}\n`;
        message += `🎯 Tujuan: ${purpose}`;

        if (purpose === 'Lainnya' && otherPurpose) {
            message += ` - ${otherPurpose}`;
        }

        message += `\n\nSaya dapat dihubungi di nomor ini: ${phone}. Terima kasih.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '6285712269000';
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const url = isMobile
            ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

        window.open(url, '_blank');
        hideModal();
    };

    return (
        <>
            <button
                onClick={showModal}
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
            >
                <i className="fab fa-whatsapp text-2xl"></i>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gold-500">
                        <h2 className="text-xl font-bold text-white mb-4">Hubungi Kami via WhatsApp</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2" htmlFor="visit-name">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="visit-name"
                                    name="visit-name"
                                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2" htmlFor="visit-phone">
                                    Nomor WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    id="visit-phone"
                                    name="visit-phone"
                                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2" htmlFor="visit-date">
                                    Tanggal Kunjungan
                                </label>
                                <input
                                    type="date"
                                    id="visit-date"
                                    name="visit-date"
                                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2" htmlFor="visit-time">
                                    Waktu Kunjungan (08:00 - 17:00)
                                </label>
                                <input
                                    type="time"
                                    id="visit-time"
                                    name="visit-time"
                                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                                    min="08:00"
                                    max="16:00"
                                    required
                                />
                                {timeError && <p className="text-red-400 text-sm mt-1">{timeError}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2" htmlFor="visit-purpose">
                                    Tujuan Kunjungan
                                </label>
                                <select
                                    id="visit-purpose"
                                    name="visit-purpose"
                                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                                    onChange={handlePurposeChange}
                                    value={purpose}
                                    required
                                >
                                    <option value="">Pilih Tujuan</option>
                                    <option value="Konsultasi">Konsultasi</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            {showOtherPurpose && (
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2" htmlFor="other-purpose">
                                        Tujuan Lainnya
                                    </label>
                                    <input
                                        type="text"
                                        id="other-purpose"
                                        name="other-purpose"
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                                    />
                                </div>
                            )}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={hideModal}
                                    className="px-4 py-2 text-gray-300 hover:text-white"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Kirim
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};