import Header from '../components/Header'
import { HeroSection, NotarisSection, OfficeGallery, PPATSection, ServiceSection } from '../components/SectionUi'
import SEOHead from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'

export default function Home() {
    const breadcrumbItems = [
        { label: "Beranda", url: "/" }
    ];

    return (
        <>
            <SEOHead
                title="Notaris dan PPAT Tegal, Jawa Tengah - Harsoyo, S.IP, SH., MKn | Layanan Hukum Terpercaya"
                description="Kantor Notaris dan PPAT Harsoyo di Tegal, Jawa Tengah. Melayani jasa notaris, pembuatan akta notaris, sertifikat tanah, legalisasi dokumen, dan konsultasi hukum profesional."
                keywords="notaris dan ppat, notaris tegal, notaris jawa tengah, ppat tegal, ppat jawa tengah, harsoyo notaris tegal, harsoyo notaris jawa tengah, pengurusan sertifikat tanah, legalisasi dokumen, kantor notaris tegal, biaya notaris tegal"
            />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LegalService",
                    "name": "Kantor Notaris dan PPAT Harsoyo",
                    "description": "Kantor Notaris dan PPAT di Tegal, Jawa Tengah yang melayani jasa notaris dan PPAT profesional",
                    "url": "https://harsoyonotarisppat.com",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "JL. Hasyim Dirjo Subroto Desa Wangandawa",
                        "addressLocality": "Talang",
                        "addressRegion": "Jawa Tengah",
                        "addressCountry": "ID"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "-6.866667",
                        "longitude": "109.133333"
                    },
                    "openingHours": "Mo-Fr 08:00-16:00",
                    "telephone": "+6285742419333",
                    "priceRange": "Rp500.000 - Rp5.000.000",
                    "serviceType": [
                        "Jasa Notaris",
                        "Jasa PPAT",
                        "Pembuatan Akta Notaris",
                        "Pengurusan Sertifikat Tanah",
                        "Legalisasi Dokumen",
                        "Konsultasi Hukum"
                    ]
                })}
            </script>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Harsoyo Notaris dan PPAT",
                    "description": "Kantor Notaris dan PPAT profesional di Tegal, Jawa Tengah",
                    "url": "https://harsoyonotarisppat.com",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://harsoyonotarisppat.com/articles?search={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [{
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Beranda",
                        "item": "https://harsoyonotarisppat.com/"
                    }]
                })}
            </script>

            <Header />
            <Breadcrumb items={breadcrumbItems} />
            <div className="bg-gray-900 text-white">
                <HeroSection />
                <NotarisSection />
                <PPATSection />
                <ServiceSection />
                <OfficeGallery />
            </div>
        </>
    )
}