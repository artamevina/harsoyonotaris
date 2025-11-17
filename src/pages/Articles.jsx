import { useState, useEffect } from 'react'
import ArticleCard from '../components/ArticleCard'
import ArticleForm from '../components/ArticleForm'
import { supabase } from '../services/supabase'
import { Loading, SectionHeader } from '../components/Template'
import Header from '../components/Header'
import { useAuth } from '../components/AuthContext'
import Breadcrumb from '../components/Breadcrumb'
import SEOHead from '../components/SEO'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Articles() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const { user } = useAuth()

    const breadcrumbItems = [
        { label: "Beranda", url: "/" },
        { label: "Artikel", url: "/articles" }
    ];

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('artikel')
                .select('*')
                .order('tanggal_update', { ascending: false, nullsFirst: false })
                .order('tanggal_upload', { ascending: false })

            if (error) throw error

            setArticles(data || [])
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddArticle = (newArticle) => {
        setArticles(prev => [newArticle, ...prev])
        setShowForm(false)
    }

    const generateFAQSchema = () => {
        if (articles.length === 0) return null;

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": articles.slice(0, 5).map(article => ({
                "@type": "Question",
                "name": article.judul,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": article.konten?.substring(0, 250) + '...' || `Artikel tentang ${article.judul} oleh Notaris dan PPAT Harsoyo di Tegal, Jawa Tengah.`
                }
            }))
        };
    }

    return (
        <>
            <SEOHead
                title="Artikel Hukum & Notaris Tegal - Harsoyo, S.IP, SH., MKn | Informasi Legal Terbaru"
                description="Kumpulan artikel informatif tentang hukum, notaris, dan PPAT dari Notaris Harsoyo di Tegal, Jawa Tengah. Informasi terbaru tentang jasa notaris, ppat, pengurusan sertifikat tanah, dan layanan hukum profesional."
                keywords="artikel notaris tegal, artikel hukum jawa tengah, informasi ppat, blog notaris, artikel legal, konsultasi hukum tegal, jasa notaris, layanan ppat, sertifikat tanah, hukum properti"
            />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Artikel Hukum & Notaris - Harsoyo, S.IP, SH., MKn",
                    "description": "Kumpulan artikel informatif tentang hukum, notaris, dan PPAT dari Notaris dan PPAT Harsoyo di Tegal, Jawa Tengah",
                    "url": "https://harsoyonotarisppat.com/articles",
                    "publisher": {
                        "@type": "LegalService",
                        "name": "Kantor Notaris dan PPAT Harsoyo",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "JL. Hasyim Dirjo Subroto Desa Wangandawa",
                            "addressLocality": "Talang",
                            "addressRegion": "Jawa Tengah",
                            "addressCountry": "ID"
                        }
                    }
                })}
            </script>

            {articles.length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(generateFAQSchema())}
                </script>
            )}

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
                            "name": "Artikel",
                            "item": "https://harsoyonotarisppat.com/articles"
                        }
                    ]
                })}
            </script>

            <Header />
            <Breadcrumb items={breadcrumbItems} />

            <div className="min-h-screen bg-gray-900">
                <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title={"Artikel Hukum & Notaris Tegal, Jawa Tengah"}
                            description={"Kumpulan artikel informatif tentang hukum, notaris, dan PPAT untuk membantu Anda memahami berbagai aspek legal di wilayah Tegal dan Jawa Tengah. Dapatkan informasi terbaru tentang jasa notaris, ppat, pengurusan sertifikat tanah, dan layanan hukum lainnya dari Notaris dan PPAT Harsoyo."}
                            darkMode={true}
                        />
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2" data-aos="fade-up">
                                Artikel Notaris & PPAT Tegal
                            </h1>
                            <p className="text-gray-400 text-lg" data-aos="fade-up" data-aos-delay="100">
                                Informasi hukum terkini dari Notaris dan PPAT Harsoyo di Tegal, Jawa Tengah
                            </p>
                        </div>

                        {user && (
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-gray-900 rounded-lg hover:bg-gold-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold whitespace-nowrap"
                                data-aos="fade-up"
                                aria-label={showForm ? 'Batal tambah artikel' : 'Tambah artikel baru'}
                            >
                                {showForm ? (
                                    <>
                                        <span>Tutup Form</span>
                                        <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                                    </>
                                ) : (
                                    <>
                                        <span>Tambah Artikel</span>
                                        <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {showForm && (
                        <div className="mb-8 md:mb-12" data-aos="fade-up">
                            <ArticleForm onArticleAdded={handleAddArticle} darkMode={true} />
                        </div>
                    )}

                    {loading ? (
                        <Loading />
                    ) : articles.length === 0 ? (
                        <div className="text-center py-16 bg-gray-800 rounded-lg" data-aos="fade-up">
                            <div className="max-w-md mx-auto">
                                <div className="text-gold-500 text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Artikel</h3>
                                <p className="text-gray-400 mb-6">
                                    Notaris dan PPAT Harsoyo di Tegal akan segera menambahkan artikel informatif
                                    tentang layanan notaris, ppat, dan berbagai aspek hukum.
                                </p>
                                {user && (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="bg-gold-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gold-600 transition duration-300"
                                    >
                                        Buat Artikel Pertama
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                                {articles.map((article, index) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        darkMode={true}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    />
                                ))}
                            </div>

                            <div className="text-center mb-12">
                                <p className="text-gray-400">
                                    Menampilkan {articles.length} artikel hukum dan notaris dari Notaris dan PPAT Harsoyo di Tegal
                                </p>
                            </div>
                        </>
                    )}

                    <div className="mt-16 p-8 bg-gray-800 rounded-lg" data-aos="fade-up">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                            Notaris dan PPAT Profesional di Tegal, Jawa Tengah
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gold-500 mb-4">Tentang Harsoyo Notaris & PPAT</h3>
                                <p className="text-gray-300 mb-4">
                                    <strong>Harsoyo, S.IP, SH., MKn</strong> adalah Notaris dan PPAT berlisensi yang melayani
                                    wilayah Tegal dan Jawa Tengah. Dengan dedikasi dan profesionalisme, kami menyediakan
                                    berbagai layanan hukum untuk masyarakat dan pelaku usaha di Tegal.
                                </p>
                                <p className="text-gray-300">
                                    Melalui artikel-artikel ini, kami berbagi pengetahuan hukum untuk membantu Anda
                                    memahami berbagai aspek legal yang berkaitan dengan notaris, PPAT, dan layanan hukum lainnya.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gold-500 mb-4">Layanan Unggulan</h3>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    <li>Jasa Notaris Tegal untuk pembuatan akta otentik</li>
                                    <li>Layanan PPAT Tegal untuk pengurusan sertifikat tanah</li>
                                    <li>Konsultasi hukum profesional untuk masyarakat Jawa Tengah</li>
                                    <li>Legalisasi dokumen dan surat-surat penting</li>
                                    <li>Pendirian badan usaha (PT, CV, Firma)</li>
                                    <li>Pengurusan perizinan usaha dan legalitas perusahaan</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <h3 className="text-xl font-semibold text-gold-500 mb-4">Butuh Konsultasi Hukum?</h3>
                            <p className="text-gray-300 mb-4">
                                Hubungi kantor Notaris dan PPAT Harsoyo di Tegal untuk konsultasi lebih lanjut
                                mengenai layanan notaris, ppat, atau pertanyaan hukum lainnya.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/6285742419333"
                                    className="bg-gold-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gold-600 transition duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Konsultasi via WhatsApp
                                </a>
                                <a
                                    href="tel:+6285742419333"
                                    className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-600 transition duration-300"
                                >
                                    Telepon Sekarang
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}