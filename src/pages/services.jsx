import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import SEOHead from '../components/SEO'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faShieldAlt,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

export default function Services() {
    const breadcrumbItems = [
        { label: "Beranda", url: "/" },
        { label: "Layanan", url: "/services" }
    ];

    return (
        <>
            <SEOHead
                title="Layanan Notaris dan PPAT di Tegal - Harsoyo, S.IP, SH., MKn | Jasa Hukum Profesional"
                description="Layanan lengkap Notaris dan PPAT di Tegal, Jawa Tengah. Pembuatan akta notaris, pengurusan sertifikat tanah, legalisasi dokumen, pendirian PT/CV, dan konsultasi hukum profesional."
                keywords="layanan notaris tegal, jasa ppat tegal, pembuatan akta notaris, pengurusan sertifikat tanah, legalisasi dokumen, pendirian pt, akta jual beli, hak tanggungan, notaris profesional tegal"
            />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "Layanan Notaris dan PPAT",
                    "description": "Layanan profesional Notaris dan PPAT di Tegal, Jawa Tengah meliputi pembuatan akta notaris, pengurusan sertifikat tanah, dan berbagai jasa hukum lainnya",
                    "provider": {
                        "@type": "LegalService",
                        "name": "Kantor Notaris dan PPAT Harsoyo",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "JL. Hasyim Dirjo Subroto Desa Wangandawa",
                            "addressLocality": "Talang",
                            "addressRegion": "Jawa Tengah",
                            "addressCountry": "ID"
                        }
                    },
                    "areaServed": "Tegal, Jawa Tengah",
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Layanan Notaris dan PPAT",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Layanan Notaris",
                                    "description": "Pembuatan akta notaris, legalisasi dokumen, pendirian PT, surat wasiat, dan perjanjian kontrak"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Layanan PPAT",
                                    "description": "Pengurusan sertifikat tanah, peralihan hak atas tanah, pendaftaran hak tanggungan, akta jual beli"
                                }
                            }
                        ]
                    }
                })}
            </script>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Beranda",
                            "item": "https://harsoyonotarisppat.com"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Layanan",
                            "item": "https://harsoyonotarisppat.com/services"
                        }
                    ]
                })}
            </script>

            <Header />
            <Breadcrumb items={breadcrumbItems} />
            <div className="bg-gray-900 text-white pt-24 pb-16" data-aos="fade-right">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Layanan Notaris dan PPAT di Tegal, Jawa Tengah</h1>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            Kantor Notaris dan PPAT Harsoyo menyediakan berbagai layanan hukum profesional
                            untuk masyarakat Tegal dan Jawa Tengah dengan pengalaman dan keahlian yang terpercaya.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-750 transition duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-8 bg-gold-500 rounded-full mr-4"></div>
                                <h2 className="text-2xl font-semibold text-gold-500">Layanan Notaris</h2>
                            </div>
                            <ul className="text-gray-300 space-y-3">
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pembuatan Akta Notaris (Akta Otentik)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Legalisasi Dokumen dan Surat Menyurat</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pendirian PT, CV, dan Badan Usaha Lainnya</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pembuatan Surat Wasiat (Testamen)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Perjanjian Kontrak dan Kesepakatan Bisnis</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Akta Perkumpulan dan Yayasan</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-750 transition duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-8 bg-gold-500 rounded-full mr-4"></div>
                                <h2 className="text-2xl font-semibold text-gold-500">Layanan PPAT</h2>
                            </div>
                            <ul className="text-gray-300 space-y-3">
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pengurusan Sertifikat Tanah dan Properti</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Peralihan Hak atas Tanah (Jual Beli, Hibah, Waris)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pendaftaran Hak Tanggungan (HT)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pembuatan Akta Jual Beli (AJB) Tanah dan Bangunan</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pembebanan Hak Tanggungan dan Pencoretan HT</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gold-500 mr-2">•</span>
                                    <span>Pendaftaran Peralihan Hak Milik Apartemen</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Notaris dan PPAT Harsoyo di Tegal?</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Sebagai notaris dan PPAT profesional di Tegal, kami berkomitmen memberikan
                                layanan hukum terbaik dengan standar profesionalisme tinggi.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition duration-300">
                                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faClock} className="text-gray-900 text-2xl" />
                                </div>
                                <h3 className="font-semibold text-xl mb-3">Proses Cepat dan Tepat</h3>
                                <p className="text-gray-300">
                                    Layanan notaris dan PPAT yang efisien dengan proses yang cepat
                                    tanpa mengesampingkan ketelitian dan akurasi hukum.
                                </p>
                            </div>

                            <div className="text-center bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition duration-300">
                                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-gray-900 text-2xl" />
                                </div>
                                <h3 className="font-semibold text-xl mb-3">Terpercaya dan Berpengalaman</h3>
                                <p className="text-gray-300">
                                    Sebagai notaris dan PPAT Tegal terpercaya dengan pengalaman
                                    luas dalam menangani berbagai kasus hukum properti dan bisnis.
                                </p>
                            </div>

                            <div className="text-center bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition duration-300">
                                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-900 text-2xl" />
                                </div>
                                <h3 className="font-semibold text-xl mb-3">Lokasi Strategis di Tegal</h3>
                                <p className="text-gray-300">
                                    Kantor notaris dan PPAT yang mudah diakses di Tegal, Jawa Tengah,
                                    melayani klien dari berbagai wilayah di Jawa Tengah.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center bg-gold-500 text-gray-900 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Konsultasi Layanan Notaris dan PPAT</h3>
                        <p className="mb-6 text-lg">
                            Hubungi kami untuk konsultasi layanan notaris dan PPAT di Tegal, Jawa Tengah
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/6285742419333"
                                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Konsultasi via WhatsApp
                            </a>
                            <a
                                href="tel:+6285742419333"
                                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
                            >
                                Telepon Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}