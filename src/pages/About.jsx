import { AboutSection, ContactSection, EducationSection, OrganizationSection, VisionSection } from "../components/SectionUi";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import SEOHead from "../components/SEO";

export default function About() {
    const breadcrumbItems = [
        { label: "Beranda", url: "/" },
        { label: "Tentang Kami", url: "/about" }
    ];

    return (
        <>
            <SEOHead
                title="Tentang Kami - Notaris & PPAT Harsoyo, S.IP, SH., MKn | Tegal, Jawa Tengah"
                description="Harsoyo, S.IP, SH., MKn adalah Notaris & PPAT profesional di Tegal, Jawa Tengah dengan pengalaman luas. Spesialis pembuatan akta otentik, pendirian PT/CV, balik nama sertifikat, dan layanan hukum lainnya."
                keywords="tentang notaris tegal, profil harsoyo, notaris ppat tegal, pengalaman notaris, jasa hukum profesional, sejarah kantor notaris, visi misi notaris, notaris jawa tengah"
            />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "Tentang Kami - Notaris & PPAT Harsoyo, S.IP, SH., MKn",
                    "description": "Kantor Notaris & PPAT Harsoyo, S.IP, SH., MKn di Tegal, Jawa Tengah dengan pengalaman luas dalam pelayanan hukum profesional.",
                    "mainEntity": {
                        "@type": "LegalService",
                        "name": "Kantor Notaris & PPAT Harsoyo, S.IP, SH., MKn",
                        "description": "Notaris dan PPAT profesional di Tegal, Jawa Tengah dengan pengalaman melayani pembuatan akta otentik, pendirian PT/CV, balik nama sertifikat, dan konsultasi hukum.",
                        "areaServed": "Tegal, Jawa Tengah",
                        "knowsAbout": [
                            "Hukum Notaris",
                            "Pendirian PT dan CV",
                            "Balik Nama Sertifikat",
                            "Akta Otentik",
                            "Hukum Perdata",
                            "Legal Drafting",
                            "PPAT Tegal"
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "JL. Hasyim Dirjo Subroto Desa Wangandawa",
                            "addressLocality": "Talang",
                            "addressRegion": "Jawa Tengah",
                            "addressCountry": "ID"
                        },
                        "telephone": "+6285742419333",
                        "openingHours": [
                            "Mo-Fr 08:00-16:00"
                        ],
                        "employee": {
                            "@type": "Person",
                            "name": "Harsoyo, S.IP, SH., MKn",
                            "jobTitle": "Notaris & PPAT",
                            "qualifications": [
                                "Sarjana Ilmu Politik (S.IP)",
                                "Sarjana Hukum (S.H.)",
                                "Magister Kenotariatan (M.Kn.)"
                            ]
                        }
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
                            "name": "Tentang Kami",
                            "item": "https://harsoyonotarisppat.com/about"
                        }
                    ]
                })}
            </script>

            <Header />
            <Breadcrumb items={breadcrumbItems} />
            <div className="font-sans bg-gray-50 text-gray-700">
                <AboutSection />
                <EducationSection />
                <OrganizationSection />
                <VisionSection />
                <ContactSection />
            </div>
        </>
    )
}